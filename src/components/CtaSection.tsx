"use client";

// import { useState } from "react";
import Link from "next/link";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

// type FormState = "idle" | "submitting" | "success";

export function CtaSection() {
  // const [newsletterState, setNewsletterState] = useState<FormState>("idle");

  // async function handleNewsletterSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   setNewsletterState("submitting");
  //   await new Promise((r) => setTimeout(r, 1000));
  //   setNewsletterState("success");
  // }

  return (
    <Section
      theme="forest"
      topLine
      stagger
      staggerChildren={0.15}
      className="flex flex-col items-center bg-white! text-center text-[#1F2B2A]!"
    >
      {/* ---- Your original CTA content (replace with your real copy) ---- */}
      <StaggerItem>
        <h2 className="max-w-3xl font-serif text-4xl leading-tight text-[#1F2B2A] sm:text-5xl">
          Ready to talk about your next step?
        </h2>
      </StaggerItem>

      <StaggerItem>
        <p className="mt-6 max-w-xl font-sans text-base text-[#1F2B2A]/70">
          Tell us what you&rsquo;re working through and we&rsquo;ll outline how
          we can help.
        </p>
      </StaggerItem>

      <StaggerItem>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-2 border hover:border-[#1F2B2A]/30 px-8 py-4 font-sans text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-300 bg-[#1F2B2A] text-white hover:bg-transparent hover:text-[#1F2B2A]"
        >
          Get in touch <span aria-hidden>→</span>
        </Link>
      </StaggerItem>

      {/* ---- Newsletter (moved from Footer), below the CTA ----
      <StaggerItem className="mt-20 grid w-full max-w-5xl gap-8 border-t border-[#1F2B2A]/15 pt-12 text-left lg:grid-cols-2 lg:items-end lg:gap-24">
        <div>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-[#1F2B2A]/50">
            Subscribe
          </p>
          <p className="mt-4 max-w-md font-serif text-2xl leading-snug text-[#1F2B2A]">
            Sign up for our monthly newsletter and receive the latest legal
            insights and updates directly in your inbox.
          </p>
        </div>

        {newsletterState === "success" ? (
          <p className="font-serif text-xl text-[#1F2B2A]">
            Thank you for subscribing.
          </p>
        ) : (
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex items-end gap-4"
          >
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="newsletter-email"
                className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-[#1F2B2A]/50"
              >
                Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                className="w-full border-b border-[#1F2B2A]/25 bg-transparent pb-2 pt-1 font-sans text-sm text-[#1F2B2A] placeholder:text-[#1F2B2A]/30 transition-colors duration-200 focus:border-[#1F2B2A] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={newsletterState === "submitting"}
              className="inline-flex shrink-0 cursor-pointer items-center gap-2 border border-[#1F2B2A]/30 px-6 py-3 font-sans text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-300 bg-[#1F2B2A] text-white hover:bg-transparent hover:text-[#1F2B2A] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {newsletterState === "submitting" ? (
                "Subscribing…"
              ) : (
                <>
                  Subscribe <span aria-hidden>→</span>
                </>
              )}
            </button>
          </form>
        )}
      </StaggerItem>
      */}
    </Section>
  );
}
