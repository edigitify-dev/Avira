import { signIn } from "@/lib/cms/auth";
import { apiError, ApiError, json, readJson, requireSameOrigin } from "@/lib/cms/http";
import { rateLimit, requestAddress } from "@/lib/cms/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    const body = await readJson(request);
    if (typeof body.username !== "string" || !body.username.trim() || body.username.length > 64
      || typeof body.password !== "string" || !body.password || body.password.length > 256) {
      throw new ApiError(400, "Please enter your username and password.");
    }
    await rateLimit("login-ip", requestAddress(request), 10);
    await rateLimit("login-account", body.username.trim(), 30);
    await signIn(body.username.trim(), body.password);
    return json({ ok: true });
  } catch (error) { return apiError(error); }
}
