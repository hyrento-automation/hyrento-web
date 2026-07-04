import nodemailer from "nodemailer";

interface SmtpEmailPayload {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendSmtpEmail(payload: SmtpEmailPayload): Promise<boolean> {
  const host = process.env.SMTP_HOST || "smtp.hostinger.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER || "info@hyrento.com";
  const pass = process.env.SMTP_PASS;

  if (!pass) {
    console.warn("SMTP_PASS environment variable is missing. SMTP email sending skipped.");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from: `"HyRento" <${user}>`,
    to: payload.to,
    replyTo: payload.replyTo,
    subject: payload.subject,
    html: payload.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully via SMTP:", info.messageId);
    return true;
  } catch (error) {
    console.error("Failed to send email via SMTP:", error);
    return false;
  }
}

export async function sendContactNotificationEmail(data: {
  name: string;
  email: string;
  company: string;
  fleetSize: string;
  planInterest: string;
  message?: string;
}) {
  const to = process.env.SMTP_TO || "sales@hyrento.com";
  
  return sendSmtpEmail({
    to,
    replyTo: data.email,
    subject: `New Lead: ${data.name} (${data.company})`,
    html: `
      <h2>New Lead Submission from HyRento</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company}</p>
      <p><strong>Fleet Size:</strong> ${data.fleetSize}</p>
      <p><strong>Plan Interest:</strong> ${data.planInterest || "Not specified"}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message ? data.message.replace(/\n/g, "<br/>") : "No message provided."}</p>
    `,
  });
}

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

  return sendSmtpEmail({
    to: email,
    subject: "Welcome to HyRento — Let's Setup Your Fleet!",
    html: htmlContent
  });
};

export const sendBrochureEmail = async (email: string, brochureTitle: string) => {
  const sanitizedTitle = escapeHtml(brochureTitle);
  const htmlContent = `
    <p>Thanks for downloading <strong>${sanitizedTitle}</strong> from HyRento.</p>
    <p>If you have any questions, reply to this email or visit <a href="https://hyrento.com/contact">our contact page</a>.</p>
  `;

  return sendSmtpEmail({
    to: email,
    subject: `Your download: ${sanitizedTitle}`,
    html: htmlContent
  });
};

