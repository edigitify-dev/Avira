import { randomBytes, scryptSync } from "node:crypto";
import { existsSync, readFileSync, writeFileSync, chmodSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { Writable } from "node:stream";

let muted = false;
const output = new Writable({ write(chunk, encoding, done) {
  if (!muted) process.stdout.write(chunk, encoding);
  done();
} });
const prompt = createInterface({ input: process.stdin, output, terminal: Boolean(process.stdin.isTTY) });

try {
  const username = (await prompt.question("Admin username: ")).trim();
  if (!/^[a-zA-Z0-9._-]{1,64}$/.test(username)) throw new Error("Use 1–64 letters, numbers, dots, underscores or hyphens.");
  process.stdout.write("Admin password (hidden): ");
  muted = true;
  const password = await prompt.question("");
  muted = false;
  process.stdout.write("\nConfirm password (hidden): ");
  muted = true;
  const confirmation = await prompt.question("");
  muted = false;
  process.stdout.write("\n");
  if (password.length < 8 || password.length > 256) throw new Error("Use a password between 8 and 256 characters.");
  if (password !== confirmation) throw new Error("The passwords did not match. No changes were made.");
  const salt = randomBytes(16).toString("hex");
  const hash = `scrypt:${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
  let content = existsSync(".env.local") ? readFileSync(".env.local", "utf8") : "DATABASE_URL=\n";
  for (const [key, value] of Object.entries({ ADMIN_USERNAME: username, ADMIN_PASSWORD_HASH: hash })) {
    const pattern = new RegExp(`^${key}=.*$`, "m");
    content = pattern.test(content) ? content.replace(pattern, `${key}=${value}`) : `${content.trimEnd()}\n${key}=${value}\n`;
  }
  writeFileSync(".env.local", content, { mode: 0o600 });
  chmodSync(".env.local", 0o600);
  console.log("Admin credentials saved to .env.local. Restart the server to apply them. Existing sessions will expire.");
} catch (error) {
  muted = false;
  console.error(error instanceof Error ? error.message : "Credentials could not be saved.");
  process.exitCode = 1;
} finally { prompt.close(); }
