"use client";

import { usePathname } from "next/navigation";
import { DisclaimerGate } from "@/components/DisclaimerGate";
import { useContent } from "@/components/cms/ContentProvider";
import { NavBar } from "@/components/NavBar";

export function SiteChrome() {
  const pathname = usePathname();
  const content = useContent();
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return null;
  return <>{!content?.canvas && <DisclaimerGate />}<NavBar /></>;
}
