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
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "HyRento <hello@hyrento.com>",
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend API response error:", response.status, errorText);
      return false;
    }

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
    <h1>Welcome to HyRento, ${sanitizedName}!</h1>
    <p>We are excited to help you automate your car rental operations.</p>
    <p>An onboarding specialist will contact you shortly to schedule your initial setup session.</p>
    <br/>
    <p>Best regards,</p>
    <p><strong>The HyRento Team</strong></p>
  `;

  return sendEmail({
    to: email,
    subject: "Welcome to HyRento — Let's Setup Your Fleet!",
    html: htmlContent
  });
};
