import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/cms/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { InsightsManager } from "@/components/admin/InsightsManager";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export default async function AdminInsightsPage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminShell><InsightsManager /></AdminShell>;
}
