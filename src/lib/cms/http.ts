import "server-only";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

export function apiError(error: unknown) {
  if (error instanceof ApiError) return json({ error: error.message }, error.status);
  // Database errors can contain credentials or submitted text; do not expose them.
  console.error("[Avira CMS] Request failed. Check the database connection and server configuration.");
  return json({ error: "We couldn't complete your request. Please try again shortly." }, 503);
}

export function requireSameOrigin(request: Request) {
  const expected = process.env.APP_URL
    ? new URL(process.env.APP_URL).origin
    : new URL(request.url).origin;
  if (request.headers.get("origin") !== expected) {
    throw new ApiError(403, "This request is not allowed.");
  }
}

export async function readJson(request: Request, maxBytes = 8192): Promise<Record<string, unknown>> {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    throw new ApiError(415, "Please send a JSON request.");
  }
  const reader = request.body?.getReader();
  if (!reader) throw new ApiError(400, "Please complete the required fields.");
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new ApiError(413, "Your request is too long.");
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  try {
    const body: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
    return body as Record<string, unknown>;
  } catch { throw new ApiError(400, "Please check the information and try again."); }
}
