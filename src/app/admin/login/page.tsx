import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/cms/auth";
import { AdminLogin } from "@/components/admin/AdminLogin";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sign in" };

export default async function AdminLoginPage() {
  if (await getAdmin()) redirect("/admin");
  return <AdminLogin />;
}
