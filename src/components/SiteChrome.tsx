"use client";

import { usePathname } from "next/navigation";
import { DisclaimerGate } from "@/components/DisclaimerGate";
import { NavBar } from "@/components/NavBar";

export function SiteChrome() {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return null;
  return <><DisclaimerGate /><NavBar /></>;
}
