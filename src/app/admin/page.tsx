import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/cms/auth";
import { EnquiryInbox } from "@/components/admin/EnquiryInbox";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return <EnquiryInbox username={admin.username} />;
}
