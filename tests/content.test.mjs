import test from "node:test";
import assert from "node:assert/strict";
import { validateContentValues, safeContentUrl, contentHash } from "../src/lib/cms/content-model.ts";

test("content values support page copy, shared content, image alt text and safe destinations", () => {
  const values = { "/::hero:text": "A considered approach.\nA clearer outcome.", "site::navigation:href": "/about", "/about::photo:src": "https://images.example.com/team.jpg", "/about::photo:alt": "Our team", "/contact::email:href": "mailto:info@aviralaw.com", "/contact::phone:href": "tel:+919818893922" };
  assert.deepEqual(validateContentValues(values), values);
  assert.equal(contentHash("same text"), contentHash("same text"));
  assert.notEqual(contentHash("a"), contentHash("b"));
});
test("dangerous destinations, malformed keys, scripts and oversized documents are rejected", () => {
  for (const url of ["javascript:alert(1)", "data:text/html,bad", "//evil.example", "/\\evil.example", "https:\n//evil.example", " javascript:alert(1)"]) {
    assert.equal(safeContentUrl(url), false, url);
    assert.throws(() => validateContentValues({ "site::navigation:href": url }));
  }
  for (const input of [[], null, { "__proto__": null, unexpected: "text" }, { "/::copy:text": {} }, { "/::copy:text": "x".repeat(20001) }, { "/::copy:text": "bad\u0000copy" }, { "/::image:src": "mailto:a@example.com" }]) assert.throws(() => validateContentValues(input));
});
test("plain text is preserved, including angle brackets, with no HTML execution contract", () => {
  const value = '<img src=x onerror="alert(1)">';
  assert.equal(validateContentValues({ "/::copy:text": value })["/::copy:text"], value);
  assert.equal(safeContentUrl("/logo/image%20name.png", true), true);
  assert.equal(safeContentUrl("#practice-areas"), true);
  assert.deepEqual(validateContentValues({}), {});
});
