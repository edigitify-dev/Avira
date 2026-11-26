import { insightCategories, type Insight } from "../insights";
import { safeContentUrl } from "./content-model";

export type InsightRecord = { id: string; draft: Insight; published: Insight | null; revision: number; updatedAt: string; publishedAt: string | null };
export function articleSlug(title: string) {
  return title.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 120).replace(/-$/, "");
}
export function validateInsight(input: unknown, publish = false): Insight {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Please provide an article.");
  const data = input as Record<string, unknown>;
  function text(key: string, max: number, required = false) {
    const value = data[key];
    if (typeof value !== "string" || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value) || (required && !value.trim())) throw new Error(`Please provide a valid ${key} (${max.toLocaleString()} characters maximum).`);
    return value.trim();
  }
  const title = text("title", 240, true);
  const slug = text("slug", 120, true);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("The URL must use lowercase letters, numbers and single hyphens.");
  const date = text("date", 10, true);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) throw new Error("Please choose a valid article date.");
  if (typeof data.category !== "string" || !(insightCategories as readonly string[]).slice(1).includes(data.category)) throw new Error("Please choose an article category.");
  const summary = text("summary", 1200, publish);
  const introduction = text("introduction", 12000, publish);
  const quote = text("quote", 2000);
  const author = data.author === undefined ? "Avira Editorial" : text("author", 120, true);
  const image = data.image === undefined ? "" : text("image", 2000);
  const imageAlt = data.imageAlt === undefined ? "" : text("imageAlt", 300);
  if (image && !safeContentUrl(image, true)) throw new Error("Use a local path or HTTPS URL for the article image.");
  if (data.sample !== undefined && typeof data.sample !== "boolean") throw new Error("Please choose a valid article type.");
  if (!Array.isArray(data.takeaways) || data.takeaways.length > 12 || data.takeaways.some(item => typeof item !== "string" || !item.trim() || item.length > 2000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(item))) throw new Error("Use up to 12 non-empty takeaways, with no more than 2,000 characters each.");
  if (!Array.isArray(data.sections) || data.sections.length > 30 || (publish && !data.sections.length)) throw new Error("Add at least one article section before publishing (30 maximum).");
  const ids = new Set<string>();
  const sections = data.sections.map((raw, index) => {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Please check the article sections.");
    const section = raw as Record<string, unknown>;
    if (typeof section.id !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(section.id) || section.id.length > 120 || ids.has(section.id)) throw new Error("Article section identifiers must be valid and unique.");
    ids.add(section.id);
    if (typeof section.heading !== "string" || section.heading.length > 240 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(section.heading) || (publish && !section.heading.trim())) throw new Error(`Add a heading for section ${index + 1}.`);
    if (!Array.isArray(section.paragraphs) || section.paragraphs.length > 40 || (publish && !section.paragraphs.length) || section.paragraphs.some(p => typeof p !== "string" || !p.trim() || p.length > 20000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(p))) throw new Error(`Add valid paragraphs for section ${index + 1} (20,000 characters per paragraph maximum).`);
    return { id: section.id, heading: section.heading.trim(), paragraphs: (section.paragraphs as string[]).map(p => p.trim()) };
  });
  const result: Insight = { slug, title, date, category: data.category as Insight["category"], summary, introduction, quote, author, image, imageAlt, sample: data.sample ?? false, takeaways: (data.takeaways as string[]).map(item => item.trim()), sections };
  if (JSON.stringify(result).length > 250000) throw new Error("The article is too long. Keep its content under 250,000 characters.");
  return result;
}
