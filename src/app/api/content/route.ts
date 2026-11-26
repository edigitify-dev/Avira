import { getPublishedContent } from "@/lib/cms/content";
import { json } from "@/lib/cms/http";
export async function GET() { return json(await getPublishedContent()); }
