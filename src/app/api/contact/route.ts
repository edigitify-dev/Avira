import { apiError, ApiError, json, readJson, requireSameOrigin } from "@/lib/cms/http";
import { validateContact } from "@/lib/cms/validation";
import { saveEnquiry } from "@/lib/cms/enquiries";
import { rateLimit, requestAddress } from "@/lib/cms/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    const body = await readJson(request);
    if (typeof body.website === "string" && body.website.trim()) return json({ ok: true }, 201);
    const result = validateContact(body);
    if (!result.data) throw new ApiError(400, result.error);
    await rateLimit("contact-ip", requestAddress(request), 10);
    await rateLimit("contact-email", result.data.email, 5);
    const id = await saveEnquiry(result.data);
    return json({ ok: true, id }, 201);
  } catch (error) { return apiError(error); }
}
