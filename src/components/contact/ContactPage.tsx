"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  ChevronDown,
  Lock,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Scale,
  ShieldCheck,
  User,
  type LucideIcon,
} from "lucide-react";
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

const MAX_MESSAGE = 500;

type FormState = "idle" | "submitting" | "success";

export function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [selectedArea, setSelectedArea] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    await new Promise((r) => setTimeout(r, 1400));
    setFormState("success");
  }

  return (
    <main className="relative flex min-h-dvh flex-col bg-cream text-ink">
      {/* ── Content ── */}
      <div className="relative mx-auto grid w-full max-w-[1500px] flex-1 items-center gap-12 px-6 pb-12 pt-28 sm:px-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-16 lg:pt-32">
        {/* Left — editorial */}
        <AnimatedSection
          as="div"
          stagger
          staggerChildren={0.13}
          className="flex flex-col gap-10"
        >
          <StaggerItem className="flex flex-col gap-6">
            <div className="flex items-center gap-5">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-ink">
                Contact
              </p>
              <span className="block h-px w-16 bg-ink/40" />
            </div>
            <h1 className="font-serif text-[2.5rem] leading-[1.08] text-ink sm:text-[3.2rem] lg:text-[3.6rem]">
              Tell us what
              <br />
              you&apos;re <em className="text-[#A67C52]">facing.</em>
            </h1>
            <p className="max-w-md font-sans text-base leading-7 text-ink/80">
              We respond within one business day with a straight answer on
              whether — and how — we can help.
            </p>
          </StaggerItem>

          <StaggerItem className="flex flex-col gap-5">
            <ContactItem icon={Mail}>
              <a
                href="mailto:hello@avira.law"
                className="transition-colors hover:text-ink/70"
              >
                hello@avira.law
              </a>
            </ContactItem>
            <ContactItem icon={Phone}>+91 98765 43210</ContactItem>
            <ContactItem icon={MapPin}>New Delhi, India</ContactItem>
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
            <div className="rounded-3xl border border-[#1F2B2A]/10 bg-white p-6 text-[#1F2B2A] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.2)] sm:p-10">
              {/* Card header */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-[1.8rem] leading-tight sm:text-[2.15rem]">
                    Send an Enquiry
                  </h2>
                  <span className="mt-3 block h-[3px] w-14 rounded-full bg-[#A67C52]" />
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
                      />
                      <Field
                        id="email"
                        label="Email"
                        type="email"
                        icon={Mail}
                        placeholder="your@email.com"
                        required
                        autoComplete="email"
                      />
                      <Field
                        id="org"
                        label="Organisation"
                        type="text"
                        icon={Building2}
                        placeholder="Your organisation (optional)"
                        autoComplete="organization"
                      />
                      <SelectField
                        id="area"
                        label="Practice area"
                        icon={Scale}
                        placeholder="Select a practice area"
                        options={practiceAreas}
                        value={selectedArea}
                        onChange={setSelectedArea}
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
                          required
                          rows={4}
                          maxLength={MAX_MESSAGE}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Briefly describe your matter…"
                          className="w-full resize-none rounded-lg border border-[#1F2B2A]/20 bg-[#1F2B2A]/[0.03] py-3.5 pb-9 pl-12 pr-4 font-sans text-sm text-[#1F2B2A] placeholder:text-[#1F2B2A]/50 transition-colors duration-200 focus:border-[#1F2B2A]/60 focus:outline-none"
                        />
                        <span className="pointer-events-none absolute bottom-3 right-4 font-sans text-[11px] text-[#1F2B2A]/60">
                          {message.length} / {MAX_MESSAGE}
                        </span>
                      </div>
                    </div>

                    {/* Submit row */}
                    <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center">
                      <button
                        type="submit"
                        disabled={formState === "submitting"}
                        className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-3 rounded-full bg-[#1F2B2A] px-9 py-4 font-sans text-[15px] font-medium text-white transition-colors duration-300 hover:bg-[#1F2B2A]/85 disabled:cursor-not-allowed disabled:opacity-50"
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
      <div className="relative mx-6 shrink-0 border-t border-ink/15 py-6 sm:mx-12 lg:mx-16">
        <div className="flex items-center justify-between">
          <p className="font-sans text-[13px] text-ink/70">
            © {new Date().getFullYear()} Avira Law · Established 2016
          </p>
          <p className="font-sans text-[13px] text-ink/70">New Delhi, India</p>
        </div>
      </div>
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
    <div className="flex items-center gap-5">
      <Icon
        className="h-6 w-6 shrink-0 text-[#A67C52]"
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
          required={required}
          className="w-full rounded-lg border border-[#1F2B2A]/20 bg-[#1F2B2A]/[0.03] py-3.5 pl-12 pr-4 font-sans text-sm text-[#1F2B2A] placeholder:text-[#1F2B2A]/50 transition-colors duration-200 focus:border-[#1F2B2A]/60 focus:outline-none"
          {...props}
        />
      </div>
    </div>
  );
}

// ── SelectField ────────────────────────────────────────────
type SelectFieldProps = {
  id: string;
  label: string;
  icon: LucideIcon;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
};

function SelectField({
  id,
  label,
  icon: Icon,
  placeholder,
  options,
  value,
  onChange,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor={id}
        className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em]"
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#1F2B2A]/60"
          strokeWidth={1.5}
        />
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full cursor-pointer appearance-none rounded-lg border border-[#1F2B2A]/20 bg-[#1F2B2A]/[0.03] py-3.5 pl-12 pr-11 font-sans text-sm transition-colors duration-200 [color-scheme:light] focus:border-[#1F2B2A]/60 focus:outline-none ${
            value ? "text-[#1F2B2A]" : "text-[#1F2B2A]/50"
          }`}
        >
          <option value="" className="bg-white text-[#1F2B2A]">
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-white text-[#1F2B2A]">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1F2B2A]/70"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
