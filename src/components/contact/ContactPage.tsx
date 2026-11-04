"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { transitionPremium } from "@/lib/motion";

const practiceAreas = [
  "Litigation & Enforcement",
  "Merger Control",
  "Counselling & Compliance",
  "Policy & Advocacy",
  "Pro Bono",
  "General enquiry",
];

type FormState = "idle" | "submitting" | "success";

export function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [selectedArea, setSelectedArea] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    await new Promise((r) => setTimeout(r, 1400));
    setFormState("success");
  }

  return (
    <main className="relative flex min-h-dvh flex-col bg-ink text-cream lg:h-dvh lg:overflow-hidden">
      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 translate-x-1/3 select-none font-serif text-[32rem] leading-[0.8] text-cream/3"
      >
        A
      </span>

      {/* ── Zones ── */}
      <div className="relative flex flex-1 flex-col px-8 sm:px-16 lg:flex-row">
        {/* Left — editorial */}
        <div className="flex flex-col justify-center py-24 lg:w-[44%] lg:py-0 lg:pr-16">
          <AnimatedSection
            as="div"
            stagger
            staggerChildren={0.13}
            className="flex flex-col gap-10"
          >
            <StaggerItem className="flex flex-col gap-4">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-cream/30">
                Contact
              </p>
              <h1 className="font-serif text-[2.65rem] leading-[1.06] text-cream sm:text-[3.2rem]">
                Tell us what
                <br />
                you&apos;re facing.
              </h1>
              <p className="max-w-xs font-sans text-[15px] leading-6 text-cream/45">
                We respond within one business day with a straight answer on
                whether — and how — we can help.
              </p>
            </StaggerItem>

            <StaggerItem className="flex flex-col gap-6">
              <span className="block h-px w-10 bg-cream/15" />
              <div className="flex flex-col gap-4">
                <ContactItem label="Email">
                  <a
                    href="mailto:hello@avira.law"
                    className="transition-colors hover:text-cream"
                  >
                    hello@avira.law
                  </a>
                </ContactItem>
                <ContactItem label="Phone">+91 98765 43210</ContactItem>
                <ContactItem label="Office">New Delhi, India</ContactItem>
              </div>
            </StaggerItem>
          </AnimatedSection>
        </div>

        {/* Vertical rule */}
        <div className="hidden w-px bg-cream/8 lg:block" />

        {/* Right — form */}
        <div className="flex flex-1 flex-col justify-center pb-24 lg:py-0 lg:pl-16">
          <AnimatedSection
            as="div"
            stagger
            staggerChildren={0.1}
            delay={0.2}
            className="w-full max-w-md"
          >
            <StaggerItem className="mt-8">
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...transitionPremium, duration: 0.6 }}
                    className="flex flex-col gap-5"
                  >
                    <span className="block h-px w-10 bg-cream/20" />
                    <p className="font-serif text-[2rem] text-cream">
                      Thank you.
                    </p>
                    <p className="max-w-xs font-sans text-[15px] leading-6 text-cream/50">
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
                    className="flex flex-col gap-7"
                  >
                    <Field
                      id="name"
                      label="Full name"
                      type="text"
                      required
                      autoComplete="name"
                    />
                    <Field
                      id="email"
                      label="Email"
                      type="email"
                      required
                      autoComplete="email"
                    />
                    <Field
                      id="org"
                      label="Organisation"
                      type="text"
                      autoComplete="organization"
                    />
                    <SelectField
                      id="area"
                      label="Practice area"
                      options={practiceAreas}
                      value={selectedArea}
                      onChange={setSelectedArea}
                    />
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="message"
                        className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-cream/35"
                      >
                        How can we help? *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={3}
                        placeholder="Briefly describe your matter…"
                        className="w-full resize-none border-b border-cream/15 bg-transparent pb-2 pt-1 font-sans text-[15px] text-cream placeholder:text-cream/20 focus:border-cream/50 focus:outline-none transition-colors duration-200"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-6 pt-1">
                      <button
                        type="submit"
                        disabled={formState === "submitting"}
                        className="inline-flex cursor-pointer items-center gap-3 border border-cream/25 px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:bg-cream hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {formState === "submitting" ? (
                          "Sending…"
                        ) : (
                          <>
                            Send enquiry <span aria-hidden>→</span>
                          </>
                        )}
                      </button>
                      <p className="font-sans text-[10px] leading-4 text-cream/20">
                        Attorney–client
                        <br />
                        privilege applies.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </StaggerItem>
          </AnimatedSection>
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div className="relative shrink-0 border-t border-cream/[0.07] px-8 py-5 sm:px-16">
        <div className="flex items-center justify-between">
          <p className="font-sans text-[11px] text-cream/20">
            © {new Date().getFullYear()} Avira Law · Established 2016
          </p>
          <p className="font-sans text-[11px] text-cream/20">
            New Delhi, India
          </p>
        </div>
      </div>
    </main>
  );
}

// ── ContactItem ────────────────────────────────────────────
function ContactItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-6">
      <span className="w-12 shrink-0 font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-cream/25">
        {label}
      </span>
      <span className="font-sans text-[15px] text-cream/55">{children}</span>
    </div>
  );
}

// ── Field ──────────────────────────────────────────────────
type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};

function Field({ label, id, required, ...props }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-cream/35"
      >
        {label}
        {required && " *"}
      </label>
      <input
        id={id}
        required={required}
        className="w-full border-b border-cream/15 bg-transparent pb-2 pt-1 font-sans text-[15px] text-cream placeholder:text-cream/20 focus:border-cream/50 focus:outline-none transition-colors duration-200"
        {...props}
      />
    </div>
  );
}

// ── SelectField ────────────────────────────────────────────
type SelectFieldProps = {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
};

function SelectField({
  id,
  label,
  options,
  value,
  onChange,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-cream/35"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none border-b border-cream/15 bg-transparent pb-2 pr-5 pt-1 font-sans text-[15px] text-cream/60 transition-colors duration-200 [color-scheme:dark] focus:border-cream/50 focus:outline-none"
        >
          <option value="" className="bg-ink text-cream">
            Select…
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-ink text-cream">
              {o}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-2.5 right-0 font-sans text-[11px] text-cream/30"
        >
          ↓
        </span>
      </div>
    </div>
  );
}
