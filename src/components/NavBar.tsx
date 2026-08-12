"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { transitionPremiumFast } from "@/lib/motion";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Leadership", href: "#" },
  { label: "Contact", href: "#contact" },
];

/**
 * Fixed header: transparent over the light hero at the top of the page (dark logo/text),
 * then solid dark + hides on scroll-down / reappears on scroll-up once past it (cream logo/text).
 */
export function NavBar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setSolid(latest > 80);
    setHidden(latest > previous && latest > 200);
  });

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={transitionPremiumFast}
      className={`fixed inset-x-0 top-0 z-50 px-6 py-8 sm:px-16 sm:py-10 ${
        solid ? "bg-ink/95 py-5 shadow-sm backdrop-blur-sm sm:py-6" : ""
      }`}
    >
      <nav className="flex items-center justify-between">
        <Image
          src="/logo.png"
          alt="Avira Law"
          width={200}
          height={100}
          className={`h-14 w-auto brightness-0 ${solid ? "invert" : ""}`}
          priority
        />
        <ul className="hidden gap-10 sm:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`font-sans text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                  solid ? "text-cream/80 hover:text-cream" : "text-ink/70 hover:text-ink"
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
