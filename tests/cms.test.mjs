import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes, randomUUID, scryptSync } from "node:crypto";
import { validateContact } from "../src/lib/cms/validation.ts";
import { verifyPassword } from "../src/lib/cms/password.ts";
import { ApiError, readJson, requireSameOrigin } from "../src/lib/cms/http.ts";
import { emailLink } from "../src/lib/cms/links.ts";

const valid = () => ({ name: " Test Person ", email: "Test@Example.com", organisation: "Example", phone: "+91 98765 43210", message: "A test enquiry.", requestId: randomUUID() });

test("contact validation normalizes fields and preserves message text", () => {
  const result = validateContact({ ...valid(), message: "First line\nSecond line" });
  assert.equal(result.error, undefined);
  assert.equal(result.data.name, "Test Person");
  assert.equal(result.data.email, "test@example.com");
  assert.equal(result.data.message, "First line\nSecond line");
});

test("required fields, invalid types and overlong content are rejected", () => {
  for (const fields of [
    { name: "  " }, { name: "x".repeat(121) }, { email: "not-an-email" }, { email: [] },
    { message: " " }, { message: "x".repeat(501) }, { organisation: "x".repeat(161) },
    { phone: "javascript:alert(1)" }, { requestId: "not-a-uuid" }, { name: "Bad\u0000name" },
  ]) assert.ok(validateContact({ ...valid(), ...fields }).error, JSON.stringify(fields));
});

test("phone and organisation are optional, and message boundaries are enforced", () => {
  assert.equal(validateContact({ ...valid(), phone: "", organisation: "", message: "x".repeat(500) }).error, undefined);
});

test("submitted email addresses cannot add hidden recipients or mailto parameters", () => {
  for (const address of ["name+tag@example.com", "name?bcc=other%40example.com@example.com", "name#fragment@example.com"]) {
    const link = new URL(emailLink(address));
    assert.equal(link.protocol, "mailto:");
    assert.equal(link.search, "");
    assert.equal(link.hash, "");
    assert.equal(decodeURIComponent(link.pathname), address);
  }
});

test("scrypt credentials accept the correct password and reject wrong or malformed credentials", async () => {
  const salt = randomBytes(16).toString("hex");
  const hash = `scrypt:${salt}:${scryptSync("test-password-123", salt, 64).toString("hex")}`;
  assert.equal(await verifyPassword("test-password-123", hash), true);
  assert.equal(await verifyPassword("different-password", hash), false);
  assert.equal(await verifyPassword("test-password-123", "scrypt:broken:hash"), false);
});

test("write requests reject missing and foreign origins", () => {
  const previous = process.env.APP_URL;
  delete process.env.APP_URL;
  try {
    assert.doesNotThrow(() => requireSameOrigin(new Request("https://avira.example/api/contact", { headers: { origin: "https://avira.example" } })));
    for (const origin of [undefined, "https://other.example"]) {
      assert.throws(() => requireSameOrigin(new Request("https://avira.example/api/contact", { headers: origin ? { origin } : {} })), error => error instanceof ApiError && error.status === 403);
    }
  } finally { if (previous === undefined) delete process.env.APP_URL; else process.env.APP_URL = previous; }
});

test("JSON parsing rejects malformed, non-object, unsupported and oversized payloads", async () => {
  const request = (body, type = "application/json") => new Request("http://localhost/api/contact", { method: "POST", headers: { "content-type": type }, body });
  assert.deepEqual(await readJson(request('{"name":"Test"}')), { name: "Test" });
  for (const [body, type, status] of [["invalid", "application/json", 400], ["[]", "application/json", 400], ["{}", "text/plain", 415], [JSON.stringify({ message: "x".repeat(9000) }), "application/json", 413]]) {
    await assert.rejects(readJson(request(body, type)), error => error instanceof ApiError && error.status === status);
  }
});
