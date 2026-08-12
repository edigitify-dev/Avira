import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

const reasons = [
  {
    title: "Client-first counsel",
    body: "Direct access to the lawyers on your matter — never a rotating cast of associates.",
  },
  {
    title: "Proven track record",
    body: "A high success rate built over four decades of combined practice.",
  },
  {
    title: "Pan-India reach",
    body: "Local standing wherever your business operates, without outsourcing relationships.",
  },
  {
    title: "Transparent engagement",
    body: "Scope and fees agreed upfront — nothing buried in the invoice.",
  },
];

export function WhyChooseUsSection() {
  return (
    /*
     * 2-column macro layout: heading anchors the left (~40%), a 2×2 reason
     * grid fills the right (~60%). Each cell is self-contained — number,
     * title, body stack in their own column, so alignment is trivially clean.
     */
    <Section
      theme="white"
      topLine
      stagger
      staggerChildren={0.15}
      className="grid items-start gap-16 lg:grid-cols-[2fr_3fr] lg:gap-32"
    >
      {/* Left: brand statement */}
      <StaggerItem>
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">
          Why choose us
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          What sets Avira apart
        </h2>
        <p className="mt-5 font-sans text-base leading-7 text-ink/65">
          Every engagement runs on the same principle — clear counsel, delivered by the people
          who actually know your matter.
        </p>
        <div className="mt-10 h-px w-10 bg-rust/50" />
      </StaggerItem>

      {/* Right: 2×2 grid — each cell is border-t separated, fully independent */}
      <StaggerItem>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-12 lg:gap-x-16">
          {reasons.map(({ title, body }, i) => (
            <div key={title} className="border-t border-ink/10 py-8 lg:py-10">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-rust">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-4 font-serif text-xl text-ink">{title}</p>
              <p className="mt-3 font-sans text-sm leading-6 text-ink/60">{body}</p>
            </div>
          ))}
        </div>
      </StaggerItem>
    </Section>
  );
}
