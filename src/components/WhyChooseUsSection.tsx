import { Handshake, Award, MapPinned, ShieldCheck } from "lucide-react";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

const reasons = [
  {
    icon: Handshake,
    title: "Client-first counsel",
    body: "Direct access to the lawyers on your matter — never a rotating cast of associates.",
  },
  {
    icon: Award,
    title: "Proven track record",
    body: "A high success rate built over four decades of combined practice.",
  },
  {
    icon: MapPinned,
    title: "Pan-India reach",
    body: "Local standing wherever your business operates, without outsourcing relationships.",
  },
  {
    icon: ShieldCheck,
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
            <Icon className="h-8 w-8 text-rust" strokeWidth={1.5} />
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
