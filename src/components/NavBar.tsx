"use client";

import { EditableLink, EditableImage, EditableText } from "@/components/cms/Editable";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Expertise", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Join Us", href: "/join-us" },
  { label: "Contact Us", href: "/contact" },
];

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <header
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          document.querySelector<HTMLButtonElement>('[aria-controls="mobile-navigation"]')?.focus();
        }
      }}
      className={`fixed inset-x-0 top-0 z-50 px-6 py-5 transition-colors duration-300 sm:px-16 sm:py-6 ${
        scrolled ? "bg-ink/90 backdrop-blur-sm" : "bg-ink"
      }`}
    >
      <div className="flex h-16 items-center justify-between">
        <EditableLink contentId="components-NavBar-1" scope="site" nextLink href="/" onClick={() => setMenuOpen(false)} className="flex h-16 shrink-0 items-center">
          <EditableImage contentId="components-NavBar-2" scope="site"
            src="/logo.png"
            alt="Avira Law"
            width={200}
            height={100}
            className="h-18 w-auto brightness-0 invert"
            priority
          />
        </EditableLink>
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex gap-4 lg:gap-7 xl:gap-10">
            {links.map((link) => (
              <li key={link.label}>
                <EditableLink contentId="components-NavBar-3" scope="site" nextLink
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="whitespace-nowrap font-sans text-[10px] font-medium uppercase tracking-[0.15em] text-cream/80 transition-colors hover:text-cream lg:text-xs"
                >
                  <EditableText id="components-NavBar-4" dynamic scope="site">{link.label}</EditableText>
                </EditableLink>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-cream outline-offset-4 focus-visible:outline-2 md:hidden"
        >
          {menuOpen ? <X aria-hidden className="h-6 w-6" strokeWidth={1.5} /> : <Menu aria-hidden className="h-6 w-6" strokeWidth={1.5} />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full bg-ink px-6 pb-8 pt-4 text-cream md:hidden"
      >
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <EditableLink contentId="components-NavBar-3" scope="site" nextLink
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/80 outline-offset-4 hover:text-cream focus-visible:outline-2 focus-visible:outline-cream"
              >
                <EditableText id="components-NavBar-4" dynamic scope="site">{link.label}</EditableText>
              </EditableLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
