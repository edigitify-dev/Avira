import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { database, databaseConfigured, ensureSchema } from "./db";
import { ApiError } from "./http";
import { verifyPassword } from "./password";

const COOKIE = "avira_admin_session";
const SESSION_SECONDS = 8 * 60 * 60;
const digest = (token: string) => createHash("sha256").update(token).digest("hex");

export async function signIn(username: string, password: string) {
  const expected = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!expected || !passwordHash || !databaseConfigured()) {
    throw new ApiError(503, "The admin inbox is not connected yet. Please contact the website administrator.");
  }
  const validPassword = await verifyPassword(password, passwordHash);
  if (username !== expected || !validPassword) throw new ApiError(401, "Incorrect username or password.");
  await ensureSchema();
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000);
  const sql = database();
  await sql.transaction([
    sql`DELETE FROM cms_admin_sessions WHERE expires_at < now()`,
    sql`INSERT INTO cms_admin_sessions (token_hash, username, credential_fingerprint, expires_at)
      VALUES (${digest(token)}, ${expected}, ${digest(passwordHash)}, ${expiresAt.toISOString()})`,
  ]);
  (await cookies()).set(COOKIE, token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "strict", path: "/", maxAge: SESSION_SECONDS,
  });
}

export async function getAdmin() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token) || !databaseConfigured() || !process.env.ADMIN_PASSWORD_HASH) return null;
  await ensureSchema();
  const rows = await database()`SELECT username FROM cms_admin_sessions
    WHERE token_hash = ${digest(token)} AND expires_at > now() AND username = ${process.env.ADMIN_USERNAME ?? ""}
      AND credential_fingerprint = ${digest(process.env.ADMIN_PASSWORD_HASH)}`;
  return rows[0] ? { username: String(rows[0].username) } : null;
}

export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) throw new ApiError(401, "Your session has ended. Please sign in again.");
  return admin;
}

export async function signOut() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token && databaseConfigured()) {
    await ensureSchema();
    await database()`DELETE FROM cms_admin_sessions WHERE token_hash = ${digest(token)}`;
  }
  jar.delete(COOKIE);
}
