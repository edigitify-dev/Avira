import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

export function CtaSection() {
  return (
    <Section theme="forest" stagger staggerChildren={0.12} className="flex flex-col items-center gap-8 text-center">
      <StaggerItem className="max-w-xl">
        <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
          Ready to talk to counsel who gets it?
        </h2>
        <p className="mt-5 font-sans text-base leading-7 text-cream/70">
          Tell us what you&apos;re facing — we&apos;ll respond within one business day with a
          straight answer on how we can help.
        </p>
      </StaggerItem>

      <StaggerItem>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-rust px-8 py-3.5 font-sans text-sm font-medium uppercase tracking-widest text-cream transition-colors hover:bg-rust/90"
        >
          Get legal help now
          <span aria-hidden>→</span>
        </a>
      </StaggerItem>
    </Section>
  );
}
