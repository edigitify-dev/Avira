import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { practiceAreas } from "./practiceAreas";

const FIRM_PROFILE_URL = "/avira-firm-profile.pdf";

export function ServicesExplorer() {
  return (
    <Section theme="dark" topLine stagger staggerChildren={0.15} className="flex flex-col gap-14">
      <StaggerItem>
        <ul className="flex flex-col">
          {practiceAreas.map((area) => (
            <li
              key={area.slug}
              className="grid gap-4 border-t border-cream/10 py-10 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-8 lg:py-12"
            >
              <span className="font-sans text-xs text-cream/35 lg:col-span-1 lg:pt-2">
                {area.index}
              </span>
              <h2 className="font-serif text-3xl leading-snug text-cream lg:col-span-4">
                {area.title}
              </h2>
              <p className="font-sans text-base leading-7 text-cream/70 lg:col-span-7">
                {area.description}
              </p>
            </li>
          ))}
        </ul>
      </StaggerItem>

      <StaggerItem className="flex flex-col items-start gap-4">
        <a
          href={FIRM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-cream/25 px-6 py-3 font-sans text-sm font-medium text-cream transition-colors hover:bg-cream hover:text-ink"
        >
          View the full firm profile
          <span aria-hidden>→</span>
        </a>
        <p className="font-sans text-sm text-cream/55">
          To view or download our firm profile, please click{" "}
          <a
            href={FIRM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream underline underline-offset-4 transition-colors hover:text-rust"
          >
            here
          </a>
          .
        </p>
      </StaggerItem>
    </Section>
  );
}
