import Link from "next/link";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

const expertiseAreas = [
  "Litigation",
  "Arbitration",
  "White Collar, Investigations & Regulatory Enforcement",
  "Corporate & Commercial",
  "Corporate Governance",
  "Technology & Data Privacy",
  "Employment",
];

export function ExpertiseList() {
  return (
    <Section theme="dark" stagger staggerChildren={0.12} className="flex flex-col gap-14">
      <StaggerItem className="max-w-2xl">
        <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-cream/70">
          Practice areas
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Our Expertise</h2>
      </StaggerItem>

      <StaggerItem>
        <ul className="grid sm:grid-cols-2 sm:gap-x-16">
          {expertiseAreas.map((title, index) => (
            <li
              key={title}
              className="flex items-baseline gap-5 border-t border-cream/20 py-6"
            >
              <span className="font-sans text-xs text-cream/65">{String(index + 1).padStart(2, "0")}</span>
              <span className="font-serif text-2xl text-cream">{title}</span>
            </li>
          ))}
        </ul>
      </StaggerItem>

      <StaggerItem>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 bg-cream px-6 py-3 font-sans text-sm font-medium text-ink outline-offset-4 transition-colors hover:bg-ivory focus-visible:outline-2 focus-visible:outline-cream motion-reduce:transition-none"
        >
          Explore our expertise
          <span aria-hidden>→</span>
        </Link>
      </StaggerItem>
    </Section>
  );
}
