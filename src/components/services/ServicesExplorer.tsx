import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { practiceAreas } from "./practiceAreas";

const FIRM_PROFILE_URL = "/avira-firm-profile.pdf";

export function ServicesExplorer() {
  return (
    <Section
      theme="dark"
      topLine
      stagger
      staggerChildren={0.15}
      className="grid gap-14 lg:grid-cols-12 lg:gap-20"
    >
      {/* Left — sticky summary + CTA */}
      <StaggerItem className="lg:col-span-4">
        <div className="lg:sticky lg:top-32">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cream/60">
            Practice areas
          </p>
          <p className="mt-5 font-serif text-[5rem] leading-none text-cream sm:text-[6rem]">
            {String(practiceAreas.length).padStart(2, "0")}
          </p>
          <span className="mt-6 block h-px w-12 bg-rust" />
          <p className="mt-6 max-w-xs font-sans text-sm leading-6 text-cream/60">
            Advisory and contentious work, led by partners who stay with the
            matter from start to finish.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4">
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
          </div>
        </div>
      </StaggerItem>

      {/* Right — practice area list */}
      <StaggerItem className="lg:col-span-8">
        <ul className="flex flex-col border-b border-cream/10">
          {practiceAreas.map((area) => (
            <li
              key={area.slug}
              className="group relative grid gap-4 border-t border-cream/10 py-9 transition-colors duration-500 sm:grid-cols-[3.5rem_1fr] sm:gap-6 lg:py-11"
            >
              {/* Rust line draws across the top on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-rust transition-transform duration-500 ease-out group-hover:scale-x-100"
              />

              <span className="font-sans text-xs font-medium tracking-[0.15em] text-rust sm:pt-3">
                {area.index}
              </span>

              <div>
                <h2 className="font-serif text-2xl leading-snug text-cream transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl">
                  {area.title}
                </h2>
                <p className="mt-4 max-w-2xl font-sans text-base leading-7 text-cream/65 transition-colors duration-500 group-hover:text-cream/85">
                  {area.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </StaggerItem>
    </Section>
  );
}
