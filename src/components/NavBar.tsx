"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { transitionPremiumFast } from "@/lib/motion";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Expertise", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Join Us", href: "/join-us" },
  { label: "Reach Out", href: "/contact" },
];

const ROUTE_THEMES: Record<string, { bg: string; lightText: boolean }> = {
  "/contact": { bg: "bg-ink", lightText: true },
};

export function NavBar() {
  const pathname = usePathname();
  const routeTheme = ROUTE_THEMES[pathname];
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setSolid(latest > 80);
    setHidden(latest > previous && latest > 200);
  });

  const light = menuOpen || (routeTheme ? routeTheme.lightText : solid);
  const background = menuOpen ? "bg-ink" : routeTheme ? routeTheme.bg : solid ? "bg-ink/95" : "";

  return (
    <motion.header
      initial={false}
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          document.querySelector<HTMLButtonElement>('[aria-controls="mobile-navigation"]')?.focus();
        }
      }}
      animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
      transition={transitionPremiumFast}
      className={`fixed inset-x-0 top-0 z-50 px-6 py-5 transition-colors duration-300 sm:px-16 sm:py-6 ${background} ${
        solid ? "py-3 shadow-sm backdrop-blur-sm sm:py-4" : ""
      }`}
    >
      <nav className="flex items-center justify-between">
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Image
            src="/logo.png"
            alt="Avira Law"
            width={200}
            height={100}
            className={`h-10 w-auto brightness-0 ${light ? "invert" : ""}`}
            priority
          />
        </Link>
        <ul className="hidden gap-4 md:flex lg:gap-7 xl:gap-10">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`whitespace-nowrap font-sans text-[10px] font-medium uppercase tracking-[0.15em] transition-colors lg:text-xs ${
                  light
                    ? "text-cream/80 hover:text-cream"
                    : "text-ink/70 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
          className={`inline-flex h-11 w-11 cursor-pointer items-center justify-center outline-offset-4 focus-visible:outline-2 md:hidden ${light ? "text-cream" : "text-ink"}`}
        >
          {menuOpen ? <X aria-hidden className="h-6 w-6" strokeWidth={1.5} /> : <Menu aria-hidden className="h-6 w-6" strokeWidth={1.5} />}
        </button>
      </nav>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full bg-ink px-6 pb-8 pt-4 text-cream md:hidden"
      >
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/80 outline-offset-4 hover:text-cream focus-visible:outline-2 focus-visible:outline-cream"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
