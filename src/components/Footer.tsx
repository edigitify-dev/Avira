"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StaggerItem } from "@/components/motion/StaggerItem";

/** lucide-react no longer ships brand marks — minimal glyphs matched to its stroke style. */
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" />
      <path
        d="M7.5 10.5v6M7.5 7.5v.01M11.5 16.5v-4c0-1.1.9-2 2-2s2 .9 2 2v4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} {...props}>
      <path
        d="M5 5l14 14M19 5L5 19"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Expertise", href: "/services" },
  { label: "Join Us", href: "/join-us" },
  { label: "Reach Out", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];
const practiceAreas = [
  "Corporate advisory",
  "Litigation",
  "Compliance",
  "Transparent engagement",
];
const socials = [
  { icon: LinkedInIcon, label: "LinkedIn", href: "#" },
  { icon: XIcon, label: "X (Twitter)", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
];

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: send email to your newsletter service
    setSubscribed(true);
  }

  return (
    <AnimatedSection
      as="footer"
      stagger
      staggerChildren={0.1}
      className="bg-slate px-6 pb-8 pt-20 text-cream sm:px-16"
    >
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
        <StaggerItem>
          <Image
            src="/logo.png"
            alt="Avira Law"
            width={200}
            height={100}
            className="h-16 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-xs font-sans text-sm leading-6 text-cream/60">
            Strategic legal counsel for modern businesses — clear, responsive,
            and always in your corner.
          </p>
          <div className="mt-6 flex gap-4">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-cream/50 transition-colors hover:text-rust"
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/40">
            Quick Links
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="font-sans text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/40">
            Practice areas
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {practiceAreas.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="font-sans text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/40">
            Contact
          </p>
          <ul className="mt-5 flex flex-col gap-3 font-sans text-sm text-cream/70">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-rust" strokeWidth={1.5} />
              hello@avira.law
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-rust" strokeWidth={1.5} />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-3">
              <MapPin
                className="h-4 w-4 shrink-0 text-rust"
                strokeWidth={1.5}
              />
              New Delhi, India
            </li>
          </ul>
        </StaggerItem>

        <StaggerItem>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/40">
            Newsletter
          </p>
          {subscribed ? (
            <p className="mt-5 font-sans text-sm text-cream/70">
              Thanks for subscribing.
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="mt-5 flex flex-col gap-3"
            >
              <input
                type="email"
                required
                aria-label="Email address"
                placeholder="Your email"
                autoComplete="email"
                className="w-full border-b border-cream/25 bg-transparent pb-2 font-sans text-sm text-cream placeholder:text-cream/30 focus:border-cream focus:outline-none"
              />
              <button
                type="submit"
                className="w-fit cursor-pointer border border-cream/30 px-5 py-2.5 font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream transition-colors duration-300 hover:bg-cream hover:text-slate"
              >
                Subscribe
              </button>
            </form>
          )}
        </StaggerItem>
      </div>

      <StaggerItem className="mt-16 flex flex-col gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-xs text-cream/40">
          © 2026. Avira Law. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link
            href="/privacy-policy"
            className="font-sans text-xs text-cream/40 transition-colors hover:text-cream"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="font-sans text-xs text-cream/40 transition-colors hover:text-cream"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/disclaimer"
            className="font-sans text-xs text-cream/40 transition-colors hover:text-cream"
          >
            Disclaimer
          </Link>
        </div>
      </StaggerItem>
    </AnimatedSection>
  );
}
