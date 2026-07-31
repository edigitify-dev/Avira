import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-rust">
      <path
        d="M12 3.5 5 6v5.5c0 4.5 3 7.9 7 9 4-1.1 7-4.5 7-9V6l-7-2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-rust">
      <circle cx="12" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 13.5 8 20l4-2 4 2-1-6.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-rust">
      <path
        d="M12 21s6.5-6.1 6.5-11A6.5 6.5 0 0 0 5.5 10c0 4.9 6.5 11 6.5 11Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-rust">
      <path d="M12 3.5v17M7 6.5h10M4 6.5l-2.5 5a3 3 0 0 0 5 0l-2.5-5Zm16 0-2.5 5a3 3 0 0 0 5 0l-2.5-5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

const reasons = [
  {
    icon: ShieldIcon,
    title: "Client-first counsel",
    body: "Direct access to the lawyers on your matter — never a rotating cast of associates.",
  },
  {
    icon: AwardIcon,
    title: "Proven track record",
    body: "A high success rate built over four decades of combined practice.",
  },
  {
    icon: PinIcon,
    title: "Pan-India reach",
    body: "Local standing wherever your business operates, without outsourcing relationships.",
  },
  {
    icon: ScaleIcon,
    title: "Transparent engagement",
    body: "Scope and fees agreed upfront — nothing buried in the invoice.",
  },
];

export function WhyChooseUsSection() {
  return (
    <Section theme="slate" stagger staggerChildren={0.12} className="flex flex-col items-center gap-16 text-center">
      <StaggerItem className="max-w-xl">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cream/70">
          Why choose us
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
          What sets Avira apart
        </h2>
        <p className="mt-5 font-sans text-base leading-7 text-cream/75">
          Every engagement runs on the same principle — clear counsel, delivered by the people
          who actually know your matter.
        </p>
      </StaggerItem>

      <div className="grid w-full grid-cols-1 divide-y divide-cream/15 border border-cream/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {reasons.map(({ icon: Icon, title, body }) => (
          <StaggerItem key={title} className="flex flex-col items-center gap-4 px-8 py-12 text-center">
            <Icon />
            <p className="font-serif text-lg">{title}</p>
            <p className="font-sans text-sm leading-6 text-cream/65">{body}</p>
          </StaggerItem>
        ))}
      </div>

      <StaggerItem>
        <a
          href="#services"
          className="inline-flex items-center gap-2 rounded-full bg-rust px-8 py-3.5 font-sans text-sm font-medium uppercase tracking-widest text-cream transition-colors hover:bg-rust/90"
        >
          See how we help
          <span aria-hidden>→</span>
        </a>
      </StaggerItem>
    </Section>
  );
}
