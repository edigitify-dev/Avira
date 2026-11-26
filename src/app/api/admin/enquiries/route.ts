import { listEnquiries } from "@/lib/cms/enquiries";
import { apiError, json } from "@/lib/cms/http";

export async function GET(request: Request) {
  try { return json(await listEnquiries(new URL(request.url).searchParams)); }
  catch (error) { return apiError(error); }
}
