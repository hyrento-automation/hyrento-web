import { NextRequest, NextResponse } from "next/server";

const escapeHtml = (str: string) =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, brochureTitle, language = "EN" } = body;

    if (!email || !brochureTitle) {
      return NextResponse.json(
        { error: "Email and brochure title are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const sanitizedTitle = escapeHtml(brochureTitle);

    // 1. Add to HubSpot (or your CRM) — scaffolded, wire up HUBSPOT_API_KEY
    if (process.env.HUBSPOT_API_KEY) {
      const hubspotRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
        body: JSON.stringify({
          properties: {
            email,
            hs_lead_status: "NEW",
            lead_source: `Brochure Download — ${sanitizedTitle}`,
          },
        }),
      });
      if (!hubspotRes.ok) {
        console.error("[download-gate] HubSpot error:", hubspotRes.status);
      }
    }

    // 2. Send confirmation email via Resend — scaffolded, wire up RESEND_API_KEY
    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "CarRental.digital <hello@carrental.digital>",
          to: email,
          subject: `Your download: ${sanitizedTitle}`,
          html: `<p>Thanks for downloading <strong>${sanitizedTitle}</strong> from CarRental.digital.</p>
                 <p>If you have any questions, reply to this email or visit <a href="https://carrental.digital/contact">our contact page</a>.</p>`,
        }),
      });
      if (!resendRes.ok) {
        console.error("[download-gate] Resend error:", resendRes.status);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Download access granted.",
      language,
    });
  } catch (error) {
    console.error("[download-gate]", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
