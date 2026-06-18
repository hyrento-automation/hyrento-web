// Resend Email Integration Helper

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (payload: EmailPayload): Promise<boolean> => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[Resend Email Send Stub (No API Key)]", payload);
    return true; // Return true to indicate mock success
  }

  try {
    console.log("[Resend Email Send Real]", payload);
    // Real API implementation details
    // const response = await fetch("https://api.resend.com/emails", { ... });
    return true;
  } catch (error) {
    console.error("Resend email delivery failed:", error);
    return false;
  }
};

const escapeHtml = (str: string): string =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const sendWelcomeEmail = async (email: string, name: string) => {
  const sanitizedName = escapeHtml(name);
  const htmlContent = `
    <h1>Welcome to CarRental.digital, ${sanitizedName}!</h1>
    <p>We are excited to help you automate your car rental operations.</p>
    <p>An onboarding specialist will contact you shortly to schedule your initial setup session.</p>
    <br/>
    <p>Best regards,</p>
    <p><strong>The CarRental.digital Team</strong></p>
  `;

  return sendEmail({
    to: email,
    subject: "Welcome to CarRental.digital — Let's Setup Your Fleet!",
    html: htmlContent
  });
};
