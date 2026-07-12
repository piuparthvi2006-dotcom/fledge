import { getRequiredEnv } from "./env.js";

function getSupabaseUrl(tableName) {
  const baseUrl = getRequiredEnv("SUPABASE_URL").replace(/\/$/, "");
  return `${baseUrl}/rest/v1/${tableName}`;
}

export async function insertRows(tableName, rows) {
  if (!rows.length) return [];

  const serviceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  const response = await fetch(getSupabaseUrl(tableName), {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(rows),
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(`Supabase insert failed: ${response.status} ${JSON.stringify(body)}`);
  }

  return body;
}
