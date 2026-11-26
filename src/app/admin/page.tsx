import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/cms/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { WebsiteEditor } from "@/components/admin/WebsiteEditor";

import { editablePages } from "@/lib/cms/page-catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export default async function AdminPage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminShell><WebsiteEditor pages={editablePages} /></AdminShell>;
}
