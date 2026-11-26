import "server-only";
import { unstable_cache } from "next/cache";
import { database, databaseConfigured, ensureSchema } from "./db";
import { ApiError } from "./http";
import { emptyDocument, type ContentDocument, type ContentValues } from "./content-model";

export async function getContentDocument(): Promise<ContentDocument> {
  await ensureSchema();
  const [row] = await database()`SELECT * FROM cms_website_content WHERE id = 'website'`;
  if (!row) return emptyDocument;
  return { draft: row.draft as ContentValues, published: row.published as ContentValues, revision: Number(row.revision), updatedAt: row.updated_at ? new Date(String(row.updated_at)).toISOString() : null, publishedAt: row.published_at ? new Date(String(row.published_at)).toISOString() : null };
}

export async function saveContent(values: ContentValues, revision: number, publish: boolean, username: string) {
  await ensureSchema();
  const rows = await database()`UPDATE cms_website_content SET draft = ${JSON.stringify(values)}::jsonb,
    published = CASE WHEN ${publish} THEN ${JSON.stringify(values)}::jsonb ELSE published END,
    published_at = CASE WHEN ${publish} THEN now() ELSE published_at END,
    updated_at = now(), updated_by = ${username}, revision = revision + 1
    WHERE id = 'website' AND revision = ${revision} RETURNING revision`;
  if (!rows.length) throw new ApiError(409, "Another editor saved changes. Reload the latest version before saving; your edits are still on this screen.");
  return getContentDocument();
}

const cachedPublishedContent = unstable_cache(async () => (await getContentDocument()).published, ["avira-published-content-v1"], { tags: ["avira-content"], revalidate: 60 });

export async function getPublishedContent(): Promise<ContentValues> {
  if (!databaseConfigured()) return {};
  try { return await cachedPublishedContent(); }
  catch {
    console.error("[Avira CMS] Published content unavailable; displaying website defaults.");
    return {};
  }
}
