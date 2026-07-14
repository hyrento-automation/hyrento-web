type OnboardingWelcomeEmailProps = {
  contactName: string;
  businessName: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function renderOnboardingWelcomeEmail({
  contactName,
  businessName,
}: OnboardingWelcomeEmailProps) {
  const safeName = escapeHtml(contactName);
  const safeBusinessName = escapeHtml(businessName);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Welcome to HyRento</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f2f5f4;font-family:Arial,Helvetica,sans-serif;color:#24324a">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0">We received your HyRento onboarding details. Your 14-day trial starts when your workspace is ready.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f5f4;padding:32px 12px">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 12px 36px rgba(27,42,74,.08)">
            <tr>
              <td style="background:#1b2a4a;padding:28px 40px">
                <div style="font-size:25px;font-weight:700;color:#ffffff;letter-spacing:.4px">HyRento</div>
                <div style="margin-top:5px;font-size:11px;font-weight:700;color:#7ed6bf;letter-spacing:1.8px;text-transform:uppercase">Car rental, beautifully managed</div>
              </td>
            </tr>
            <tr>
              <td style="padding:38px 40px 10px">
                <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#2e6f5e;text-transform:uppercase;letter-spacing:1.5px">Welcome to HyRento</p>
                <h1 style="margin:0 0 14px;font-size:26px;line-height:1.25;color:#1b2a4a">You're in, ${safeName} — let's get ${safeBusinessName} ready.</h1>
                <p style="margin:0;font-size:15px;line-height:1.7;color:#4b5563">Thanks for sharing your onboarding details. Our setup team will now prepare your branded booking site, fleet workspace, contracts, payments, and operating settings.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 40px">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#edf8f4;border:1px solid #d5eee6;border-radius:12px">
                  <tr>
                    <td style="padding:19px 20px;text-align:center">
                      <div style="font-size:12px;color:#5b6472">Your workspace will usually be ready within</div>
                      <div style="margin:5px 0;font-size:21px;font-weight:700;color:#2e6f5e">48 hours</div>
                      <div style="font-size:12px;line-height:1.5;color:#5b6472">Your 14-day trial starts when the workspace goes live — not before.</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:4px 40px 10px">
                <h2 style="margin:0 0 18px;font-size:17px;color:#1b2a4a">What happens next</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="34" valign="top" style="padding-bottom:17px"><div style="width:24px;height:24px;border-radius:50%;background:#2e6f5e;color:#fff;font-size:12px;font-weight:700;line-height:24px;text-align:center">1</div></td>
                    <td valign="top" style="padding:1px 0 17px 8px;font-size:14px;line-height:1.55;color:#4b5563"><strong style="color:#1b2a4a">We review your setup</strong><br />Our team checks your fleet, locations, pricing, domain, and brand preferences.</td>
                  </tr>
                  <tr>
                    <td width="34" valign="top" style="padding-bottom:17px"><div style="width:24px;height:24px;border-radius:50%;background:#2e6f5e;color:#fff;font-size:12px;font-weight:700;line-height:24px;text-align:center">2</div></td>
                    <td valign="top" style="padding:1px 0 17px 8px;font-size:14px;line-height:1.55;color:#4b5563"><strong style="color:#1b2a4a">We build your workspace</strong><br />Optional items such as a logo, fleet photos, or contract can be supplied later and will not hold up your setup.</td>
                  </tr>
                  <tr>
                    <td width="34" valign="top"><div style="width:24px;height:24px;border-radius:50%;background:#2e6f5e;color:#fff;font-size:12px;font-weight:700;line-height:24px;text-align:center">3</div></td>
                    <td valign="top" style="padding:1px 0 0 8px;font-size:14px;line-height:1.55;color:#4b5563"><strong style="color:#1b2a4a">Your trial goes live</strong><br />We email your access details the moment everything is ready. That is when your 14 days officially begin.</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:30px 40px 34px">
                <a href="https://hyrento.com/demo" style="display:inline-block;padding:14px 30px;border-radius:8px;background:#2e6f5e;color:#fff;text-decoration:none;font-size:14px;font-weight:700">Explore HyRento demos</a>
                <p style="margin:14px 0 0;font-size:12px;line-height:1.5;color:#6b7280">Need to add something? Reply to this email and our team will update your setup.</p>
              </td>
            </tr>
            <tr>
              <td style="background:#1b2a4a;padding:24px 40px">
                <p style="margin:0 0 8px;font-size:13px;color:#d7dde8">Questions? Reply to this email or contact <a href="mailto:info@hyrento.com" style="color:#ffffff">info@hyrento.com</a>.</p>
                <p style="margin:0;font-size:12px;color:#93a0b7">HyRento · hyrento.com · You're receiving this because you requested a 14-day trial.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
