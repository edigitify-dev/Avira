"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { practiceAreas } from "@/components/services/practiceAreas";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Expertise", href: "/services" },
  { label: "Join Us", href: "/join-us" },
  { label: "Reach Out", href: "/contact" },
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
          <a
            href="#"
            className="mt-5 inline-flex min-h-11 items-center gap-3 font-sans text-sm font-medium tracking-wide text-cream/75 outline-offset-4 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-cream motion-reduce:transition-none"
          >
            LinkedIn
            <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={1.5} />
          </a>
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
            Expertise
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {practiceAreas.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/services#${item.slug}`}
                  className="font-sans text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  {item.title}
                </Link>
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
              <a href="mailto:info@aviralaw.com" className="transition-colors hover:text-cream">
                info@aviralaw.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-rust" strokeWidth={1.5} />
              <a href="tel:+919818893922" className="transition-colors hover:text-cream">
                +91 – 9818893922
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin
                className="h-4 w-4 shrink-0 text-rust"
                strokeWidth={1.5}
              />
              Delhi NCR, India
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

      <StaggerItem className="mt-16 flex flex-col items-center gap-4 border-t border-cream/10 pt-8 text-center">
        <p className="font-sans text-xs text-cream/40">
          © 2026. Avira Law. All rights reserved.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            href="/disclaimer"
            className="font-sans text-xs text-cream/40 transition-colors hover:text-cream"
          >
            Disclaimer
          </Link>
          <Link
            href="/privacy-policy"
            className="font-sans text-xs text-cream/40 transition-colors hover:text-cream"
          >
            Privacy Policy
          </Link>
        </div>
      </StaggerItem>
    </AnimatedSection>
  );
}
