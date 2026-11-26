import "server-only";
import { randomUUID } from "node:crypto";
import { database, ensureSchema } from "./db";
import { requireAdmin } from "./auth";
import { ApiError } from "./http";
import { enquiryStatuses, type ContactInput, type Enquiry, type EnquiryStatus, type InboxData } from "./types";
import { uuidPattern } from "./validation";

function mapEnquiry(row: Record<string, unknown>): Enquiry {
  return {
    id: String(row.id), name: String(row.name), email: String(row.email),
    organisation: String(row.organisation), phone: String(row.phone), message: String(row.message),
    status: row.status as EnquiryStatus,
    createdAt: new Date(String(row.created_at)).toISOString(),
    updatedAt: new Date(String(row.updated_at)).toISOString(),
  };
}

export async function saveEnquiry(data: ContactInput) {
  await ensureSchema();
  const rows = await database()`INSERT INTO cms_enquiries (id, request_id, name, email, organisation, phone, message)
    VALUES (${randomUUID()}, ${data.requestId}, ${data.name}, ${data.email}, ${data.organisation}, ${data.phone}, ${data.message})
    ON CONFLICT (request_id) DO UPDATE SET request_id = EXCLUDED.request_id RETURNING id`;
  return String(rows[0].id);
}

export async function listEnquiries(params: URLSearchParams): Promise<InboxData> {
  await requireAdmin();
  const query = (params.get("q") ?? "").trim().slice(0, 160);
  const requestedStatus = params.get("status") ?? "";
  const status = enquiryStatuses.includes(requestedStatus as EnquiryStatus) ? requestedStatus : "";
  const page = Math.min(100_000, Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1));
  const pageSize = 20;
  const search = `%${query.replace(/[\\%_]/g, "\\$&")}%`;
  const sql = database();
  const [items, totals, counts] = await sql.transaction([
    sql`SELECT * FROM cms_enquiries
      WHERE (${status} = '' OR status = ${status}) AND
        (${query} = '' OR name ILIKE ${search} OR email ILIKE ${search}
          OR organisation ILIKE ${search} OR phone ILIKE ${search} OR message ILIKE ${search})
      ORDER BY created_at DESC, id DESC LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`,
    sql`SELECT count(*)::int AS total FROM cms_enquiries
      WHERE (${status} = '' OR status = ${status}) AND
        (${query} = '' OR name ILIKE ${search} OR email ILIKE ${search}
          OR organisation ILIKE ${search} OR phone ILIKE ${search} OR message ILIKE ${search})`,
    sql`SELECT count(*)::int AS total, count(*) FILTER (WHERE status = 'new')::int AS new,
      count(*) FILTER (WHERE status = 'replied')::int AS replied FROM cms_enquiries`,
  ], { isolationLevel: "RepeatableRead", readOnly: true });
  return {
    items: items.map(mapEnquiry), total: Number(totals[0].total), page, pageSize,
    counts: { total: Number(counts[0].total), new: Number(counts[0].new), replied: Number(counts[0].replied) },
  };
}

export async function updateEnquiry(id: string, status: unknown) {
  await requireAdmin();
  if (!uuidPattern.test(id) || !enquiryStatuses.includes(status as EnquiryStatus)) {
    throw new ApiError(400, "Please choose a valid enquiry and status.");
  }
  const rows = await database()`UPDATE cms_enquiries SET status = ${status as string}, updated_at = now()
    WHERE id = ${id} RETURNING *`;
  if (!rows[0]) throw new ApiError(404, "This enquiry could not be found.");
  return mapEnquiry(rows[0]);
}

export async function deleteEnquiry(id: string) {
  await requireAdmin();
  if (!uuidPattern.test(id)) throw new ApiError(404, "This enquiry could not be found.");
  const rows = await database()`DELETE FROM cms_enquiries WHERE id = ${id} RETURNING id`;
  if (!rows.length) throw new ApiError(404, "This enquiry was already deleted or could not be found.");
}
