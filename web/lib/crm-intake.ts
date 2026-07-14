import "server-only";
import { createHash } from "node:crypto";

type AnswerValue = string | string[];

type TrialSubmission = {
  answers: Record<string, AnswerValue>;
  sourceUrl?: string | null;
  userAgent?: string | null;
};

export async function syncTrialSubmission({ answers, sourceUrl, userAgent }: TrialSubmission) {
  const url = process.env.CRM_SUPABASE_URL;
  const serviceRoleKey = process.env.CRM_SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    console.info("[CRM intake skipped] Dedicated CRM credentials are not configured.");
    return false;
  }

  const idempotencyKey = createHash("sha256")
    .update(JSON.stringify({ email: answers.contactEmail, answers }))
    .digest("hex");

  try {
    const response = await fetch(`${url}/rest/v1/rpc/upsert_trial_submission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
      body: JSON.stringify({
        p_idempotency_key: idempotencyKey,
        p_answers: answers,
        p_source_url: sourceUrl || null,
        p_user_agent: userAgent || null,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("CRM intake response error:", response.status, await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("CRM intake failed:", error);
    return false;
  }
}
