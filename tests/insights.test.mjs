import test from "node:test";
import assert from "node:assert/strict";
import { registerHooks } from "node:module";
// Match the app bundler's extensionless TypeScript imports in Node's test runner.
registerHooks({ resolve(specifier, context, nextResolve) {
  try { return nextResolve(specifier, context); }
  catch (error) { if (specifier.startsWith(".") && !/\.[a-z]+$/i.test(specifier)) return nextResolve(`${specifier}.ts`, context); throw error; }
} });
const { validateInsight, articleSlug } = await import("../src/lib/cms/insight-model.ts");
const valid = () => ({ title: "A considered perspective", slug: "a-considered-perspective", date: "2026-11-26", category: "Merger Control", summary: "An introduction to the topic.", introduction: "The article begins here.", quote: "Clarity matters.", author: "Avira Editorial", image: "", imageAlt: "", sample: false, takeaways: ["A useful takeaway."], sections: [{ id: "first-section", heading: "A closer look", paragraphs: ["First paragraph.", "Second paragraph."] }] });

test("article drafts may be incomplete, while publication requires summary, introduction and body", () => {
  const draft = { ...valid(), summary: "", introduction: "", sections: [] };
  assert.equal(validateInsight(draft).title, draft.title);
  assert.throws(() => validateInsight(draft, true));
  for (const field of [{ summary: "" }, { introduction: "" }, { sections: [] }, { sections: [{ id: "empty", heading: "", paragraphs: [] }] }]) assert.throws(() => validateInsight({ ...valid(), ...field }, true));
  assert.deepEqual(validateInsight(valid(), true), valid());
});
test("article dates and URL identifiers reject malformed or impossible values", () => {
  for (const value of ["2026-02-30", "2026-13-01", "26-11-2026", "not-a-date"]) assert.throws(() => validateInsight({ ...valid(), date: value }));
  assert.equal(validateInsight({ ...valid(), date: "2028-02-29" }).date, "2028-02-29");
  for (const slug of ["", "UPPERCASE", "two--hyphens", "../admin", "contains space", "a".repeat(121)]) assert.throws(() => validateInsight({ ...valid(), slug }));
  assert.equal(articleSlug("  Clarity, Commerce & Change.  "), "clarity-commerce-change");
  assert.equal(articleSlug("Café strategy"), "cafe-strategy");
});
test("article validation rejects unsafe image URLs and overlong or malformed content", () => {
  for (const input of [null, [], { ...valid(), title: "x".repeat(241) }, { ...valid(), category: "Unknown" }, { ...valid(), image: "javascript:alert(1)" }, { ...valid(), image: "//example.com/a.png" }, { ...valid(), takeaways: [""] }, { ...valid(), sections: [valid().sections[0], valid().sections[0]] }, { ...valid(), sample: "yes" }]) assert.throws(() => validateInsight(input));
  assert.equal(validateInsight({ ...valid(), image: "https://images.example.com/cover.jpg" }).image, "https://images.example.com/cover.jpg");
  assert.equal(validateInsight({ ...valid(), introduction: "<script>alert(1)</script>" }).introduction, "<script>alert(1)</script>");
});
