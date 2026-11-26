import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/cms/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { EnquiryInbox } from "@/components/admin/EnquiryInbox";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export default async function EnquiriesPage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminShell><EnquiryInbox username={admin.username} /></AdminShell>;
}
