import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

export function ServicesHero() {
  return (
    <Section theme="light" size="tall" stagger staggerChildren={0.15} className="flex flex-col gap-10">
      <StaggerItem className="max-w-2xl">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">
          What we do
        </p>
        <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-ink sm:text-6xl">
          Competition law, practiced end to end.
        </h1>
        <p className="mt-7 max-w-xl font-sans text-base leading-7 text-ink/65">
          From cartel inquiries to merger clearances, we advise on every stage of competition
          law — litigation, deals, compliance, and the policy shaping what comes next.
        </p>
      </StaggerItem>

      <StaggerItem className="flex items-center gap-4 text-ink/40">
        <span className="h-px w-10 bg-ink/20" />
        <p className="font-sans text-xs font-medium uppercase tracking-[0.15em]">
          Five practice areas, below
        </p>
      </StaggerItem>
    </Section>
  );
}
