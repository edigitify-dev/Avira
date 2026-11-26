import "server-only";
import { createHash } from "node:crypto";
import { database, ensureSchema } from "./db";
import { ApiError } from "./http";

export function requestAddress(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip") || "unknown";
}

export async function rateLimit(scope: string, identity: string, limit: number, minutes = 15) {
  await ensureSchema();
  const interval = minutes * 60_000;
  const window = Math.floor(Date.now() / interval);
  const key = `${scope}:${createHash("sha256").update(identity).digest("hex")}:${window}`;
  const expires = new Date((window + 1) * interval).toISOString();
  const sql = database();
  const [rows] = await sql.transaction([
    sql`INSERT INTO cms_rate_limits (key, attempts, expires_at) VALUES (${key}, 1, ${expires})
      ON CONFLICT (key) DO UPDATE SET attempts = cms_rate_limits.attempts + 1 RETURNING attempts`,
    sql`DELETE FROM cms_rate_limits WHERE expires_at < now()`,
  ]);
  if (Number(rows[0].attempts) > limit) {
    throw new ApiError(429, "Too many attempts. Please try again in 15 minutes.");
  }
}
