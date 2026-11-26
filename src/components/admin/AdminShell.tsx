"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ExternalLink, FilePenLine, LayoutTemplate, LogOut, Mail, Menu, X } from "lucide-react";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [signingOut, setSigningOut] = useState(false);
  async function logout() {
    if (document.documentElement.dataset.cmsUnsaved === "true" && !window.confirm("You have unsaved edits. Leave the editor and sign out?")) return;
    setSigningOut(true); setError("");
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (!response.ok) throw new Error("Couldn't sign out. Please try again.");
      delete document.documentElement.dataset.cmsUnsaved;
      window.location.assign("/admin/login");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Please try again."); setSigningOut(false); }
  }
  return <div className="min-h-dvh bg-ivory text-ink lg:pl-60">
    <div className="flex h-18 items-center justify-between bg-ink px-5 text-cream lg:hidden">
      <span className="font-serif text-2xl">Avira <span className="font-sans text-xs tracking-widest text-cream/60">STUDIO</span></span>
      <button className="cms-button" aria-label={open ? "Close admin menu" : "Open admin menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
    </div>
    {open && <button aria-label="Close navigation" className="fixed inset-0 z-50 bg-ink/45 lg:hidden" onClick={() => setOpen(false)} />}
    <aside className={`${open ? "flex" : "hidden"} fixed inset-y-0 left-0 z-50 w-60 flex-col bg-ink px-5 py-8 text-cream lg:flex`}>
      <a href="/admin" className="px-3 outline-offset-4 focus-visible:outline-2"><Image src="/logo.png" alt="Avira Law administration" width={200} height={100} className="h-14 w-auto brightness-0 invert" priority /></a>
      <p className="mt-6 px-3 text-xs font-medium uppercase tracking-[0.22em] text-cream/50">Website studio</p>
      <nav aria-label="Administration" className="mt-10 space-y-2">
        {[{ href: "/admin", label: "Website pages", icon: LayoutTemplate }, { href: "/admin/insights", label: "Insights", icon: FilePenLine }, { href: "/admin/enquiries", label: "Contact Us", icon: Mail }].map(item => {
          const active = pathname === item.href;
          return <a key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`flex min-h-12 items-center gap-3 px-4 py-3 text-sm outline-offset-2 focus-visible:outline-2 ${active ? "bg-cream text-ink" : "text-cream/70 hover:bg-cream/5 hover:text-cream"}`}><item.icon size={19} strokeWidth={1.5} />{item.label}</a>;
        })}
      </nav>
      <div className="mt-auto pt-12">
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-between px-3 text-sm text-cream/70 hover:text-cream">View live website <ExternalLink size={16} /></a>
        <div className="mt-6 border-t border-cream/15 px-3 pt-6">
          <button onClick={logout} disabled={signingOut} className="flex min-h-11 items-center gap-2 text-sm text-cream/70 hover:text-cream disabled:opacity-50"><LogOut size={16} />{signingOut ? "Signing out…" : "Sign out"}</button>
          {error && <p role="alert" className="mt-3 text-sm text-cream">{error}</p>}
        </div>
      </div>
    </aside>
    <div className="min-w-0">{children}</div>
  </div>;
}
