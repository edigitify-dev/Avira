import Link from "next/link";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { practiceAreas } from "@/components/services/practiceAreas";

export function ExpertiseList() {
  return (
    <Section theme="dark" topLine stagger staggerChildren={0.12} className="flex flex-col gap-14">
      <StaggerItem className="max-w-2xl">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cream/60">
          Practice areas
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Our Expertise</h2>
      </StaggerItem>

      <StaggerItem>
        <ul className="grid sm:grid-cols-2 sm:gap-x-16">
          {practiceAreas.map((area) => (
            <li
              key={area.slug}
              className="flex items-baseline gap-5 border-t border-cream/10 py-6"
            >
              <span className="font-sans text-xs text-cream/35">{area.index}</span>
              <span className="font-serif text-2xl text-cream">{area.title}</span>
            </li>
          ))}
        </ul>
      </StaggerItem>

      <StaggerItem>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 border border-cream/25 px-6 py-3 font-sans text-sm font-medium text-cream transition-colors hover:bg-cream hover:text-ink"
        >
          Explore our expertise
          <span aria-hidden>→</span>
        </Link>
      </StaggerItem>
    </Section>
  );
}
