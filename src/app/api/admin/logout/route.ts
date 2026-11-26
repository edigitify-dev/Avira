import { signOut } from "@/lib/cms/auth";
import { apiError, json, requireSameOrigin } from "@/lib/cms/http";

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    await signOut();
    return json({ ok: true });
  } catch (error) { return apiError(error); }
}
