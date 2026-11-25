import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

export function TeamSection() {
  return (
    <Section theme="light" stagger staggerChildren={0.12}>
      <div className="mx-auto max-w-2xl text-center">
        <StaggerItem>
          <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-ink/70">
            THE TEAM
          </p>
        </StaggerItem>
        <StaggerItem>
          <h2 className="mt-4 font-serif text-4xl italic leading-tight text-ink sm:text-5xl">
            We are growing.
          </h2>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-5 font-sans text-base leading-7 text-ink/65">
            Avira Law is building a team of lawyers who approach the law with
            depth, precision and sound judgment.
          </p>
        </StaggerItem>
      </div>
    </Section>
  );
}
