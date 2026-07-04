import { NextRequest, NextResponse } from "next/server";
import { sendBrochureEmail } from "@/lib/smtp";

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

    // 2. Send confirmation email via SMTP
    await sendBrochureEmail(email, brochureTitle);

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
