import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";
import { practiceAreas } from "./practiceAreas";

const FIRM_PROFILE_URL = "/avira-firm-profile.pdf";

export function ServicesExplorer() {
  return (
    <Section
      theme="dark"
      topLine
      animated={false}
      className="grid gap-14 lg:grid-cols-12 lg:gap-20"
    >
      {/* Left — sticky label and firm profile */}
      <div className="lg:col-span-4">
        <div className="flex min-h-72 flex-col items-center justify-center px-2 py-10 text-center sm:min-h-80 lg:sticky lg:top-[calc(50vh-10rem)]">
          <p className="font-serif text-4xl leading-[1.1] tracking-tight text-cream sm:text-5xl">
            Practice <span className="block italic text-cream/75">areas</span>
          </p>

          <a
            href={FIRM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex max-w-xs items-center gap-5 bg-cream px-6 py-4 font-sans text-base font-medium text-ink outline-offset-4 transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-cream motion-reduce:transition-none"
          >
            <span>View the full firm profile</span>
            <span className="border-l border-ink/20 pl-4">
              <ArrowUpRight aria-hidden className="h-5 w-5" strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </div>

      {/* Right — practice area list */}
      <div className="lg:col-span-8">
        <ul className="flex flex-col border-b border-cream/10">
          {practiceAreas.map((area) => (
            <li
              key={area.slug}
              id={area.slug}
              className="group relative grid scroll-mt-24 gap-4 border-t border-cream/10 py-9 transition-colors duration-500 sm:grid-cols-[3.5rem_1fr] sm:gap-6 lg:py-11"
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
      </div>
    </Section>
  );
}
