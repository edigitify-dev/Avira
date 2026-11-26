"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  User,
  type LucideIcon,
} from "lucide-react";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { transitionPremium } from "@/lib/motion";

const MAX_MESSAGE = 500;

type FormState = "idle" | "submitting" | "success";

export function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");
  const requestId = useRef<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formState === "submitting") return;
    const fields = new FormData(e.currentTarget);
    requestId.current ??= crypto.randomUUID();
    setFormState("submitting");
    setFormError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.get("name"), email: fields.get("email"),
          organisation: fields.get("org"), phone: fields.get("phone"),
          message: fields.get("message"), website: fields.get("website"),
          requestId: requestId.current,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your message couldn't be sent. Please try again.");
      setFormState("success");
    } catch (cause) {
      setFormError(cause instanceof Error ? cause.message : "We couldn't connect. Please try again.");
      setFormState("idle");
    }
  }

  return (
    <main className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-cream text-ink lg:min-h-[46rem]">
      {/* ── Content ── */}
      <div className="relative section-gutter mx-auto grid w-full flex-1 items-center gap-12 px-6 pb-12 pt-28 sm:px-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:pt-32">
        {/* Left — editorial */}
        <AnimatedSection
          as="div"
          stagger
          staggerChildren={0.13}
          className="flex flex-col gap-10"
        >
          <StaggerItem className="flex flex-col gap-6">
            <h1 className="font-serif text-[2.5rem] leading-[1.08] text-ink sm:text-[3.2rem] lg:text-[3.6rem]">
              Contact Us
            </h1>
            <p className="max-w-md font-sans text-base leading-7 text-ink/80">
              For new matters and general enquiries, please get in touch:
            </p>
          </StaggerItem>

          <StaggerItem className="flex flex-col gap-5">
            <ContactItem icon={Mail}>
              <span className="block font-semibold">Email:</span>
              <a
                href="mailto:info@aviralaw.com"
                className="transition-colors hover:text-ink/70"
              >
                info@aviralaw.com
              </a>
            </ContactItem>
            <ContactItem icon={Phone}>
              <span className="block font-semibold">Telephone:</span>
              <a href="tel:+919818893922" className="transition-colors hover:text-ink/70">
                +91 98188 93922
              </a>
            </ContactItem>
            <ContactItem icon={MapPin}>
              <span className="block font-semibold">Office:</span>
              <span className="mt-1 block leading-7">
                <strong className="font-semibold">Avira Law</strong>
                <br />
                Floor 19, C-001/A2, Berger Towers
                <br />
                Sector 16B, Noida, Uttar Pradesh
              </span>
            </ContactItem>
          </StaggerItem>
        </AnimatedSection>

        {/* Right — form card */}
        <AnimatedSection
          as="div"
          stagger
          staggerChildren={0.1}
          delay={0.2}
          className="w-full"
        >
          <StaggerItem>
            <div className="rounded-none border border-[#1F2B2A]/10 bg-white p-6 text-[#1F2B2A] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.2)] sm:p-10">
              {/* Card header */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-[1.8rem] leading-tight sm:text-[2.15rem]">
                    Send an Enquiry
                  </h2>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...transitionPremium, duration: 0.6 }}
                    className="flex min-h-[26rem] flex-col justify-center gap-5"
                  >
                    <span className="block h-px w-10 bg-[#1F2B2A]/30" />
                    <p className="font-serif text-[2rem]">Thank you.</p>
                    <p className="max-w-sm font-sans text-[15px] leading-7 text-[#1F2B2A]/80">
                      Your message has been received. We&apos;ll respond within
                      one business day with a direct answer.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleSubmit}
                    aria-busy={formState === "submitting"}
                    aria-describedby={formError ? "contact-form-error" : undefined}
                    className="mt-8 flex flex-col gap-6"
                  >
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field
                        id="name"
                        label="Full name"
                        type="text"
                        icon={User}
                        placeholder="Enter your full name"
                        required
                        autoComplete="name"
                        maxLength={120}
                      />
                      <Field
                        id="email"
                        label="Email"
                        type="email"
                        icon={Mail}
                        placeholder="your@email.com"
                        required
                        autoComplete="email"
                        maxLength={254}
                      />
                      <Field
                        id="org"
                        label="Organisation"
                        type="text"
                        icon={Building2}
                        placeholder="Your organisation (optional)"
                        autoComplete="organization"
                        maxLength={160}
                      />
                      <Field
                        id="phone"
                        name="phone"
                        label="Contact number"
                        type="tel"
                        icon={Phone}
                        placeholder="Your contact number"
                        autoComplete="tel"
                        maxLength={40}
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2.5">
                      <label
                        htmlFor="message"
                        className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em]"
                      >
                        How can we help? *
                      </label>
                      <div className="relative">
                        <Pencil
                          aria-hidden
                          className="pointer-events-none absolute left-4 top-4 h-[18px] w-[18px] text-[#1F2B2A]/60"
                          strokeWidth={1.5}
                        />
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          maxLength={MAX_MESSAGE}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Briefly describe your matter…"
                          className="w-full resize-none rounded-none border border-[#1F2B2A]/20 bg-[#1F2B2A]/[0.03] py-3.5 pb-9 pl-12 pr-4 font-sans text-sm text-[#1F2B2A] placeholder:text-[#1F2B2A]/50 transition-colors duration-200 focus:border-[#1F2B2A]/60 focus:outline-none"
                        />
                        <span className="pointer-events-none absolute bottom-3 right-4 font-sans text-[11px] text-[#1F2B2A]/60">
                          {message.length} / {MAX_MESSAGE}
                        </span>
                      </div>
                    </div>

                    <div hidden aria-hidden="true">
                      <label htmlFor="contact-website">Leave this field empty</label>
                      <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
                    </div>
                    {formError && <p id="contact-form-error" role="alert" className="border-l-2 border-forest pl-4 font-sans text-sm leading-6 text-ink">{formError}</p>}

                    {/* Submit row */}
                    <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center">
                      <button
                        type="submit"
                        disabled={formState === "submitting"}
                        className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-3 rounded-none bg-[#1F2B2A] px-9 py-4 font-sans text-[15px] font-medium text-white transition-colors duration-300 hover:bg-[#1F2B2A]/85 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {formState === "submitting" ? (
                          "Sending…"
                        ) : (
                          <>
                            Send Enquiry <span aria-hidden>→</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </StaggerItem>
        </AnimatedSection>
      </div>

      {/* ── Bottom strip ── */}
      <AnimatedSection
        as="footer"
        stagger
        className="relative mx-6 flex shrink-0 flex-col items-center gap-4 border-t border-ink/15 py-6 text-center sm:mx-12 lg:mx-16"
      >
        <StaggerItem>
          <p className="font-sans text-xs text-ink/70">
            © 2026. Avira Law. All rights reserved.
          </p>
        </StaggerItem>
        <StaggerItem className="flex justify-center gap-6">
          <Link
            href="/disclaimer"
            className="font-sans text-xs text-ink/70 transition-colors hover:text-ink"
          >
            Disclaimer
          </Link>
          <Link
            href="/privacy-policy"
            className="font-sans text-xs text-ink/70 transition-colors hover:text-ink"
          >
            Privacy Policy
          </Link>
        </StaggerItem>
      </AnimatedSection>
    </main>
  );
}

// ── ContactItem ────────────────────────────────────────────
function ContactItem({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-5">
      <Icon
        className="mt-1 h-6 w-6 shrink-0 text-rust"
        strokeWidth={1.5}
        aria-hidden
      />
      <span className="font-sans text-base text-ink">{children}</span>
    </div>
  );
}

// ── Field ──────────────────────────────────────────────────
type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  icon: LucideIcon;
};

function Field({ label, id, icon: Icon, required, ...props }: FieldProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor={id}
        className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em]"
      >
        {label}
        {required && " *"}
      </label>
      <div className="relative">
        <Icon
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#1F2B2A]/60"
          strokeWidth={1.5}
        />
        <input
          id={id}
          name={id}
          required={required}
          className="w-full rounded-none border border-[#1F2B2A]/20 bg-[#1F2B2A]/[0.03] py-3.5 pl-12 pr-4 font-sans text-sm text-[#1F2B2A] placeholder:text-[#1F2B2A]/50 transition-colors duration-200 focus:border-[#1F2B2A]/60 focus:outline-none"
          {...props}
        />
      </div>
    </div>
  );
}
