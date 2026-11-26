export type ContentValues = Record<string, string>;
export type ContentField = { key: string; label: string; kind: "text" | "link" | "image"; value: string; original: string; altKey?: string; alt?: string };
export type ContentDocument = { draft: ContentValues; published: ContentValues; revision: number; updatedAt: string | null; publishedAt: string | null };
export const emptyDocument: ContentDocument = { draft: {}, published: {}, revision: 0, updatedAt: null, publishedAt: null };

export function contentHash(text: string) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
  return (hash >>> 0).toString(36);
}

export function safeContentUrl(value: string, image = false) {
  if (!value || /[\u0000-\u0020\u007f\\]/.test(value)) return false;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  if (!image && value.startsWith("#")) return true;
  try {
    const url = new URL(value);
    return image ? url.protocol === "https:" : ["https:", "http:", "mailto:", "tel:"].includes(url.protocol);
  } catch { return false; }
}

export function validateContentValues(input: unknown): ContentValues {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Please provide valid page content.");
  const entries = Object.entries(input);
  if (entries.length > 3000) throw new Error("There are too many content fields.");
  const result: ContentValues = {};
  for (const [key, value] of entries) {
    if (!/^(site|\/[a-z0-9\-/]*)::[a-zA-Z0-9_.:-]{1,180}:(text|href|src|alt)$/.test(key) || typeof value !== "string" || value.length > 20000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) {
      throw new Error("One or more content fields are invalid or too long.");
    }
    if ((key.endsWith(":href") || key.endsWith(":src")) && !safeContentUrl(value, key.endsWith(":src"))) {
      throw new Error("Use a valid website path, web address, email or telephone link. Images need a local path or HTTPS address.");
    }
    result[key] = value;
  }
  if (JSON.stringify(result).length > 750000) throw new Error("The content document is too large.");
  return result;
}
