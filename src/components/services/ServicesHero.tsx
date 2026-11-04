import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

export function ServicesHero() {
  return (
    <Section
      theme="light"
      size="tall"
      stagger
      staggerChildren={0.15}
      className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16"
    >
      <StaggerItem className="lg:col-span-7">
        <div className="flex items-center gap-5">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">
            What we do
          </p>
          <span className="block h-px w-14 bg-rust/50" />
        </div>
        <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-[4.25rem]">
          Our Expertise
        </h1>
      </StaggerItem>

      <StaggerItem className="lg:col-span-5">
        <p className="max-w-md border-l-2 border-rust pl-6 font-sans text-base leading-7 text-ink/65">
          Corporate, contentious and regulatory work for Indian and
          international clients, handled with the same clarity from first call
          to final outcome.
        </p>
      </StaggerItem>
    </Section>
  );
}
