import Link from "next/link";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

export function CtaSection() {
  return (
    <Section
      theme="slate"
      size="spacious"
      topLine
      stagger
      staggerChildren={0.12}
      className="relative flex flex-col items-center gap-10 overflow-hidden text-center"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-serif text-[20rem] leading-none text-cream/[0.03]"
      >
        A
      </span>

      <StaggerItem className="relative max-w-2xl">
        <h2 className="font-serif text-5xl leading-tight sm:text-6xl">Reach Out</h2>
        <p className="mt-6 font-sans text-base leading-7 text-cream/65">
          For enquiries, write to{" "}
          <a
            href="mailto:info@aviralaw.com"
            className="text-cream underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            info@aviralaw.com
          </a>{" "}
          or reach us{" "}
          <Link
            href="/contact"
            className="text-cream underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            here
          </Link>
          .
        </p>
      </StaggerItem>

      <StaggerItem className="relative">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-rust px-10 py-4 font-sans text-sm font-medium uppercase tracking-widest text-cream transition-opacity hover:opacity-85"
        >
          Reach Out
          <span aria-hidden>→</span>
        </Link>
      </StaggerItem>
    </Section>
  );
}
