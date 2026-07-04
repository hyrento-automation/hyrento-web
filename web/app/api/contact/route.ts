import { NextResponse } from "next/server";
import { createHubSpotContact } from "@/lib/hubspot";
import { sendWelcomeEmail, sendContactNotificationEmail } from "@/lib/smtp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, fleetSize, planInterest, message } = body;

    // Simple backend validations
    if (!name || !email || !company || !fleetSize) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // 1. Create HubSpot CRM contact (mocked if API Key missing)
    const crmSuccess = await createHubSpotContact({
      email,
      name,
      company,
      fleetSize,
      planInterest,
      message
    });

    // 2. Trigger Resend welcome email (mocked if API Key missing)
    const emailSuccess = await sendWelcomeEmail(email, name);

    // 3. Trigger SMTP notification email to admin/sales
    const smtpSuccess = await sendContactNotificationEmail({
      name,
      email,
      company,
      fleetSize,
      planInterest,
      message
    });

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
      crmSync: crmSuccess,
      emailSent: emailSuccess,
      smtpSent: smtpSuccess,
      submittedMessage: message
    });
  } catch (error: unknown) {
    console.error("API Contact Route Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
