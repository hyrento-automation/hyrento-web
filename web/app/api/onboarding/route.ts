import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";
import { renderOnboardingWelcomeEmail } from "@/emails/onboarding-welcome";
import { syncTrialSubmission } from "@/lib/crm-intake";

type AnswerValue = string | string[];
type Answers = Record<string, AnswerValue>;

const fieldLabels: Record<string, string> = {
  legalBusinessName: "Legal business name",
  tradingName: "Trading / brand name",
  businessAddress: "Business address",
  country: "Country of registration",
  taxId: "VAT / Tax ID",
  contactName: "Primary contact",
  contactEmail: "Contact email",
  contactPhone: "Phone / WhatsApp",
  languages: "Customer site languages",
  totalVehicles: "Vehicles today",
  expectedGrowth: "Expected 12-month growth",
  vehicleCategories: "Vehicle categories",
  vehicleList: "Vehicle list / spreadsheet note",
  outOfService: "Vehicles out of service",
  mileagePolicy: "Mileage policy",
  mileageLimit: "Mileage limit",
  locationCount: "Pickup / drop-off locations",
  deliveryOffered: "Airport / hotel delivery",
  deliveryRules: "Delivery fee rules",
  operatingHours: "Operating hours",
  logoStatus: "Logo",
  brandColors: "Brand colours",
  existingWebsite: "Existing website",
  fleetPhotosStatus: "Fleet photos",
  ownsDomain: "Already owns a domain",
  domainName: "Domain name",
  registrar: "Domain registrar",
  registrarAccess: "Registrar login access",
  requestedEmails: "Requested email addresses",
  currentDomainEmail: "Existing domain email",
  currentEmailSetup: "Current email setup",
  rates: "Rates per category",
  securityDeposit: "Security deposit policy",
  cancellationPolicy: "Cancellation policy",
  customCancellation: "Custom cancellation policy",
  minimumAge: "Minimum driver age",
  customMinimumAge: "Custom minimum age",
  youngDriverSurcharge: "Young-driver surcharge",
  addonPricing: "Add-on pricing",
  longStayDiscount: "Long-stay discount",
  discountRule: "Long-stay discount rule",
  hasAgreement: "Existing rental agreement",
  agreementStatus: "Rental agreement file",
  renterDocuments: "Required renter documents",
  insuranceDetails: "Insurance disclosure",
  paymentMethods: "Payment methods",
  chargeMethod: "Pre-authorisation or full charge",
  preAuthAmount: "Pre-authorisation amount",
  currency: "Pricing and invoice currency",
  adminName: "Main system administrator",
  staffLogins: "Staff logins required",
  staffPermissions: "Roles and permissions",
  supportLanguage: "Preferred support language",
};

const requiredFields = [
  "legalBusinessName",
  "country",
  "contactName",
  "contactEmail",
  "contactPhone",
  "totalVehicles",
  "locationCount",
  "adminName",
  "supportLanguage",
];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function valueToText(value: AnswerValue) {
  return Array.isArray(value) ? value.join(", ") : value;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (JSON.stringify(body).length > 100_000) {
      return NextResponse.json(
        { error: "Submission is too large." },
        { status: 413 }
      );
    }

    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const answers = body.answers as Answers | undefined;
    if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Invalid onboarding submission." },
        { status: 400 }
      );
    }

    const missing = requiredFields.filter((key) => {
      const value = answers[key];
      return !value || (Array.isArray(value) && value.length === 0);
    });

    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Please complete the required onboarding fields." },
        { status: 400 }
      );
    }

    const contactEmail = valueToText(answers.contactEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid contact email." },
        { status: 400 }
      );
    }

    const rows = Object.entries(answers)
      .filter(([, value]) => {
        if (Array.isArray(value)) return value.length > 0;
        return Boolean(value && value.trim());
      })
      .map(([key, value]) => {
        const label = escapeHtml(fieldLabels[key] || key);
        const answer = escapeHtml(valueToText(value)).replace(/\n/g, "<br/>");
        return (
          '<tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#475569;font-size:13px;width:35%;vertical-align:top">' +
          label +
          '</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:13px;font-weight:600;vertical-align:top">' +
          answer +
          "</td></tr>"
        );
      })
      .join("");

    const adminHtml =
      '<div style="font-family:Arial,sans-serif;max-width:760px;margin:0 auto;color:#0f172a">' +
      '<div style="background:#0a1628;color:white;padding:24px;border-radius:14px 14px 0 0">' +
      '<p style="margin:0 0 6px;color:#60a5fa;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px">New client onboarding</p>' +
      '<h1 style="margin:0;font-size:24px">Get Started with HyRento</h1>' +
      "</div>" +
      '<div style="border:1px solid #e2e8f0;border-top:0;border-radius:0 0 14px 14px;overflow:hidden">' +
      '<table style="border-collapse:collapse;width:100%">' +
      rows +
      "</table></div></div>";

    const confirmationHtml = renderOnboardingWelcomeEmail({
      contactName: valueToText(answers.contactName),
      businessName: valueToText(answers.legalBusinessName),
    });

    const [adminSent, confirmationSent, crmSynced] = await Promise.all([
      sendEmail({
        to: process.env.ONBOARDING_TO_EMAIL || "info@hyrento.com",
        replyTo: contactEmail,
        subject:
          "New 14-day trial onboarding: " +
          valueToText(answers.legalBusinessName),
        html: adminHtml,
      }),
      sendEmail({
        to: contactEmail,
        replyTo: "info@hyrento.com",
        subject: "Welcome to HyRento — your setup starts now",
        html: confirmationHtml,
      }),
      syncTrialSubmission({
        answers,
        sourceUrl: request.headers.get("origin"),
        userAgent: request.headers.get("user-agent"),
      }),
    ]);

    if (!adminSent) {
      return NextResponse.json(
        { error: "We could not send your onboarding details. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      confirmationSent,
      crmSynced,
    });
  } catch (error) {
    console.error("Onboarding submission error:", error);
    return NextResponse.json(
      { error: "We could not process your submission. Please try again." },
      { status: 500 }
    );
  }
}
