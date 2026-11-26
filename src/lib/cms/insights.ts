import "server-only";
import { randomUUID } from "node:crypto";
import { unstable_cache } from "next/cache";
import { insights as originalInsights, type Insight } from "../insights";
import { database, databaseConfigured, ensureSchema } from "./db";
import { ApiError } from "./http";
import { type InsightRecord } from "./insight-model";
import { uuidPattern } from "./validation";

let ready: Promise<void> | undefined;
export async function ensureInsights() {
  if (!ready) ready = (async () => {
    await ensureSchema();
    const sql = database();
    // The migration marker prevents deleted sample articles from reappearing.
    await sql.transaction([
      sql`SELECT pg_advisory_xact_lock(hashtext('avira-insights-initial-import-v1'))`,
      ...originalInsights.map(item => {
        const content = JSON.stringify({ ...item, author: "Avira Editorial", sample: true });
        return sql`INSERT INTO cms_insights (id, slug, draft, published, published_at)
          SELECT ${randomUUID()}, ${item.slug}, ${content}::jsonb, ${content}::jsonb, now()
          WHERE NOT EXISTS (SELECT 1 FROM cms_content_migrations WHERE key = 'insights-v1')
          ON CONFLICT (slug) DO NOTHING`;
      }),
      sql`INSERT INTO cms_content_migrations (key) VALUES ('insights-v1') ON CONFLICT DO NOTHING`,
    ]);
  })().catch(error => { ready = undefined; throw error; });
  await ready;
}
function mapRecord(row: Record<string, unknown>): InsightRecord {
  return { id: String(row.id), draft: row.draft as Insight, published: row.published as Insight | null, revision: Number(row.revision), updatedAt: new Date(String(row.updated_at)).toISOString(), publishedAt: row.published_at ? new Date(String(row.published_at)).toISOString() : null };
}
export async function listInsightRecords(): Promise<InsightRecord[]> {
  await ensureInsights();
  return (await database()`SELECT * FROM cms_insights ORDER BY updated_at DESC, id`).map(mapRecord);
}
export async function createInsight(insight: Insight, publish = false): Promise<InsightRecord> {
  await ensureInsights();
  const rows = await database()`INSERT INTO cms_insights (id, slug, draft, published, published_at) VALUES (${randomUUID()}, ${insight.slug}, ${JSON.stringify(insight)}::jsonb, ${publish ? JSON.stringify(insight) : null}::jsonb, CASE WHEN ${publish} THEN now() ELSE NULL END)
    ON CONFLICT (slug) DO NOTHING RETURNING *`;
  if (!rows[0]) throw new ApiError(409, "An article already uses this URL. Please choose another URL.");
  return mapRecord(rows[0]);
}
export async function updateInsight(id: string, revision: number, insight: Insight | null, action: "draft" | "publish" | "unpublish"): Promise<InsightRecord> {
  if (!uuidPattern.test(id)) throw new ApiError(404, "This article could not be found.");
  await ensureInsights();
  const [existing] = await database()`SELECT * FROM cms_insights WHERE id = ${id}`;
  if (!existing) throw new ApiError(404, "This article could not be found.");
  if (insight && insight.slug !== existing.slug) throw new ApiError(400, "An existing article's URL cannot be changed. This keeps saved links working.");
  const sql = database();
  const rows = action === "unpublish"
    ? await sql`UPDATE cms_insights SET published = NULL, published_at = NULL, updated_at = now(), revision = revision + 1 WHERE id = ${id} AND revision = ${revision} RETURNING *`
    : await sql`UPDATE cms_insights SET draft = ${JSON.stringify(insight)}::jsonb,
      published = CASE WHEN ${action === "publish"} THEN ${JSON.stringify(insight)}::jsonb ELSE published END,
      published_at = CASE WHEN ${action === "publish"} THEN now() ELSE published_at END,
      updated_at = now(), revision = revision + 1 WHERE id = ${id} AND revision = ${revision} RETURNING *`;
  if (!rows[0]) throw new ApiError(409, "Another editor changed this article. Reload the latest version before saving. Your edits remain on this screen.");
  return mapRecord(rows[0]);
}
export async function deleteInsight(id: string, revision: number) {
  if (!uuidPattern.test(id)) throw new ApiError(404, "This article could not be found.");
  await ensureInsights();
  const rows = await database()`DELETE FROM cms_insights WHERE id = ${id} AND revision = ${revision} RETURNING id`;
  if (!rows.length) throw new ApiError(409, "This article has changed or was already deleted. Reload the list before trying again.");
}
const cachedInsights = unstable_cache(async () => {
  await ensureInsights();
  const rows = await database()`SELECT published FROM cms_insights WHERE published IS NOT NULL ORDER BY published->>'date' DESC, published->>'title', id`;
  return rows.map(row => row.published as Insight);
}, ["avira-insights-v1"], { tags: ["avira-insights"], revalidate: 60 });
export async function getPublishedInsights(): Promise<Insight[]> {
  if (!databaseConfigured()) return originalInsights;
  // With a configured database, failures must not resurrect deleted/unpublished articles.
  return cachedInsights();
}
export async function getDraftInsight(slug: string): Promise<Insight | undefined> {
  await ensureInsights();
  const [row] = await database()`SELECT draft FROM cms_insights WHERE slug = ${slug}`;
  return row?.draft as Insight | undefined;
}
