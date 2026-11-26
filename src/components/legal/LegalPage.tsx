import type { ReactNode } from "react";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { BrandWatermark } from "@/components/BrandWatermark";

export type LegalBlock = {
  heading?: string;
  paragraphs?: ReactNode[];
  items?: string[];
  closingParagraphs?: ReactNode[];
  subsections?: { heading: string; paragraphs: ReactNode[] }[];
};

type Props = {
  title: string;
  intro?: string;
  lastUpdated?: string;
  blocks: LegalBlock[];
};

export function LegalPage({ title, intro, lastUpdated, blocks }: Props) {
  return (
    <Section theme="light" amount="some" stagger staggerChildren={0.12} className="isolate flex flex-col gap-12">
      <BrandWatermark tone="deep-teal" className="right-[2%] top-48 w-[min(34rem,60vw)]" />
      <StaggerItem className="max-w-3xl pt-8">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">Legal</p>
        <h1 className="mt-5 font-serif text-4xl leading-[1.1] text-ink sm:text-5xl">{title}</h1>
        {lastUpdated && <p className="mt-4 font-sans text-sm text-ink/65">Last updated: {lastUpdated}</p>}
        {intro && <p className="mt-6 font-sans text-base leading-7 text-ink/65">{intro}</p>}
      </StaggerItem>

      <StaggerItem className="flex max-w-3xl flex-col gap-10">
        {blocks.map((block, i) => (
          <div key={i}>
            {block.heading && (
              <h2 className="font-serif text-2xl leading-snug text-ink">{block.heading}</h2>
            )}
            {block.paragraphs?.map((p, pi) => (
              <p
                key={pi}
                className={`font-sans text-base leading-7 text-ink/65 ${
                  block.heading || pi > 0 ? "mt-4" : ""
                }`}
              >
                {p}
              </p>
            ))}
            {block.items && (
              <ul className="mt-4 flex flex-col gap-3">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-base leading-7 text-ink/65">
                    <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-ink/40" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {block.closingParagraphs?.map((paragraph, pi) => (
              <p key={pi} className="mt-4 font-sans text-base leading-7 text-ink/65">
                {paragraph}
              </p>
            ))}
            {block.subsections?.map((subsection) => (
              <div key={subsection.heading} className="mt-6">
                <h3 className="font-sans text-base font-medium leading-7 text-ink">
                  {subsection.heading}
                </h3>
                {subsection.paragraphs.map((paragraph, pi) => (
                  <p key={pi} className="mt-4 font-sans text-base leading-7 text-ink/65">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ))}
      </StaggerItem>
    </Section>
  );
}
