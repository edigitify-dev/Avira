import { revalidatePath, revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/cms/auth";
import { createInsight, listInsightRecords } from "@/lib/cms/insights";
import { validateInsight } from "@/lib/cms/insight-model";
import { apiError, ApiError, json, readJson, requireSameOrigin } from "@/lib/cms/http";
export const runtime = "nodejs";
export async function GET() {
  try { await requireAdmin(); return json({ items: await listInsightRecords() }); }
  catch (error) { return apiError(error); }
}
export async function POST(request: Request) {
  try {
    requireSameOrigin(request); await requireAdmin();
    const body = await readJson(request, 300000);
    if (!["draft", "publish"].includes(String(body.action))) throw new ApiError(400, "Choose save draft or publish.");
    let article;
    try { article = validateInsight(body.article, body.action === "publish"); }
    catch (error) { throw new ApiError(400, error instanceof Error ? error.message : "Invalid article."); }
    const item = await createInsight(article, body.action === "publish");
    if (body.action === "publish") { revalidateTag("avira-insights", { expire: 0 }); revalidatePath("/", "layout"); }
    return json({ item }, 201);
  } catch (error) { return apiError(error); }
}
