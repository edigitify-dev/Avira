import Link from "next/link";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { VIKRAM_BIO } from "@/components/about/VikramProfile";

export function VikramCard() {
  return (
    <Section
      theme="white"
      topLine
      stagger
      staggerChildren={0.15}
      className="grid gap-12 lg:grid-cols-12 lg:gap-24"
    >
      <StaggerItem className="lg:col-span-5">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">
          Leadership
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">Vikram Shah</h2>
        <p className="mt-3 font-sans text-xs font-medium uppercase tracking-[0.15em] text-ink/50">
          Founding Partner
        </p>
      </StaggerItem>

      <StaggerItem className="lg:col-span-7">
        <p className="font-serif text-2xl leading-[1.4] text-ink sm:text-[1.75rem]">{VIKRAM_BIO}</p>
        <Link
          href="/about#vikram"
          className="mt-10 inline-flex items-center gap-2 border border-ink/20 px-6 py-3 font-sans text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
        >
          View profile
          <span aria-hidden>→</span>
        </Link>
      </StaggerItem>
    </Section>
  );
}
