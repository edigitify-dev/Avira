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
          Our Expertise
        </h1>
      </StaggerItem>
    </Section>
  );
}
