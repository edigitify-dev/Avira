import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

export type LegalBlock = {
  heading?: string;
  paragraphs?: string[];
  items?: string[];
};

type Props = {
  title: string;
  intro?: string;
  blocks: LegalBlock[];
};

export function LegalPage({ title, intro, blocks }: Props) {
  return (
    <Section theme="light" stagger staggerChildren={0.12} className="flex flex-col gap-12">
      <StaggerItem className="max-w-3xl pt-8">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">Legal</p>
        <h1 className="mt-5 font-serif text-4xl leading-[1.1] text-ink sm:text-5xl">{title}</h1>
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
          </div>
        ))}
      </StaggerItem>
    </Section>
  );
}
