import { updateEnquiry } from "@/lib/cms/enquiries";
import { apiError, json, readJson, requireSameOrigin } from "@/lib/cms/http";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireSameOrigin(request);
    const { id } = await params;
    const body = await readJson(request);
    return json({ item: await updateEnquiry(id, body.status) });
  } catch (error) { return apiError(error); }
}
