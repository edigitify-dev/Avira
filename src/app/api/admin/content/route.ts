import { revalidatePath, revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/cms/auth";
import { getContentDocument, saveContent } from "@/lib/cms/content";
import { validateContentValues } from "@/lib/cms/content-model";
import { apiError, ApiError, json, readJson, requireSameOrigin } from "@/lib/cms/http";

export const runtime = "nodejs";
export async function GET() {
  try { await requireAdmin(); return json(await getContentDocument()); }
  catch (error) { return apiError(error); }
}
export async function PUT(request: Request) {
  try {
    requireSameOrigin(request);
    const admin = await requireAdmin();
    const body = await readJson(request, 1000000);
    if (!Number.isSafeInteger(body.revision) || Number(body.revision) < 0 || !["draft", "publish"].includes(String(body.action))) throw new ApiError(400, "Please provide a valid revision and action.");
    let values;
    try { values = validateContentValues(body.values); }
    catch (error) { throw new ApiError(400, error instanceof Error ? error.message : "Invalid content."); }
    const result = await saveContent(values, Number(body.revision), body.action === "publish", admin.username);
    if (body.action === "publish") {
      revalidateTag("avira-content", { expire: 0 });
      revalidatePath("/", "layout");
    }
    return json(result);
  } catch (error) { return apiError(error); }
}
