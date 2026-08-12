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
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">
          Let&apos;s talk
        </p>
        <h2 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl">
          Ready to talk to counsel who gets it?
        </h2>
        <p className="mt-6 font-sans text-base leading-7 text-cream/65">
          Tell us what you&apos;re facing — we&apos;ll respond within one business day with a
          straight answer on how we can help.
        </p>
      </StaggerItem>

      <StaggerItem className="relative flex flex-col items-center gap-5">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-rust px-10 py-4 font-sans text-sm font-medium uppercase tracking-widest text-cream transition-opacity hover:opacity-85"
        >
          Get legal help now
          <span aria-hidden>→</span>
        </a>
        <p className="font-sans text-xs text-cream/35">
          Or email us at{" "}
          <a
            href="mailto:hello@avira.law"
            className="text-cream/60 underline-offset-2 transition-colors hover:text-cream hover:underline"
          >
            hello@avira.law
          </a>
        </p>
      </StaggerItem>
    </Section>
  );
}
