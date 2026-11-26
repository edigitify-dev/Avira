import { revalidatePath, revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/cms/auth";
import { deleteInsight, updateInsight } from "@/lib/cms/insights";
import { validateInsight } from "@/lib/cms/insight-model";
import { apiError, ApiError, json, readJson, requireSameOrigin } from "@/lib/cms/http";
function refreshInsights() { revalidateTag("avira-insights", { expire: 0 }); revalidatePath("/", "layout"); }
export const runtime = "nodejs";
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireSameOrigin(request); await requireAdmin();
    const { id } = await params;
    const body = await readJson(request, 300000);
    if (!Number.isSafeInteger(body.revision) || Number(body.revision) < 1 || !["draft", "publish", "unpublish"].includes(String(body.action))) throw new ApiError(400, "Please provide a valid action and article revision.");
    let article = null;
    if (body.action !== "unpublish") {
      try { article = validateInsight(body.article, body.action === "publish"); }
      catch (error) { throw new ApiError(400, error instanceof Error ? error.message : "Invalid article."); }
    }
    const item = await updateInsight(id, Number(body.revision), article, body.action as "draft" | "publish" | "unpublish");
    if (body.action !== "draft") refreshInsights();
    return json({ item });
  } catch (error) { return apiError(error); }
}
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireSameOrigin(request); await requireAdmin();
    const { id } = await params;
    const body = await readJson(request);
    if (!Number.isSafeInteger(body.revision) || Number(body.revision) < 1) throw new ApiError(400, "Please provide the current article revision.");
    await deleteInsight(id, Number(body.revision)); refreshInsights();
    return json({ ok: true });
  } catch (error) { return apiError(error); }
}
