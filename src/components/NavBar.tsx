"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { transitionPremiumFast } from "@/lib/motion";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Leadership", href: "#" },
  { label: "Contact", href: "/contact" },
];

/** Pages with a dark hero — keep navbar transparent but flip links/logo to cream. */
const DARK_HERO_ROUTES = ["/contact"];

export function NavBar() {
  const pathname = usePathname();
  const darkHero = DARK_HERO_ROUTES.includes(pathname);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setSolid(latest > 80);
    setHidden(latest > previous && latest > 200);
  });

  const light = solid || darkHero;

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={transitionPremiumFast}
      className={`fixed inset-x-0 top-0 z-50 px-6 py-5 sm:px-16 sm:py-6 ${
        solid ? "bg-ink/95 py-3 shadow-sm backdrop-blur-sm sm:py-4" : ""
      }`}
    >
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Avira Law"
            width={200}
            height={100}
            className={`h-10 w-auto brightness-0 ${light ? "invert" : ""}`}
            priority
          />
        </Link>
        <ul className="hidden gap-10 sm:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`font-sans text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                  light ? "text-cream/80 hover:text-cream" : "text-ink/70 hover:text-ink"
                }`}
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
