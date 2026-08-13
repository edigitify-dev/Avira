import { Scale, ShieldCheck, Handshake, EyeOff } from "lucide-react";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

const values = [
  {
    icon: Scale,
    title: "Judgment",
    body: "Advice weighed against your actual business risk, not just the letter of the statute.",
  },
  {
    icon: ShieldCheck,
    title: "Rigor",
    body: "Every position is stress-tested before it reaches you, no first drafts as final answers.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    body: "The partner you sign with is the partner who shows up, from kickoff to closing.",
  },
  {
    icon: EyeOff,
    title: "Discretion",
    body: "Sensitive matters stay sensitive, need to know handling as a default, not a request.",
  },
];

export function ValuesSection() {
  return (
    <Section theme="forest" topLine stagger staggerChildren={0.12} className="flex flex-col items-center gap-16">
      <StaggerItem className="max-w-xl text-center">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cream/60">
          What we stand for
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
          The principles behind the practice
        </h2>
        <p className="mt-5 font-sans text-base leading-7 text-cream/65">
          Values only mean something if they show up in the work, these are the ones our
          clients tell us they notice first.
        </p>
      </StaggerItem>

      <div className="grid w-full grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {values.map(({ icon: Icon, title, body }) => (
          <StaggerItem key={title} className="flex flex-col items-start">
            <Icon className="h-7 w-7 text-cream/80" strokeWidth={1.5} />
            <p className="mt-6 font-serif text-xl text-cream">{title}</p>
            <span className="mt-3 h-px w-8 bg-cream/20" />
            <p className="mt-4 font-sans text-sm leading-6 text-cream/60">{body}</p>
          </StaggerItem>
        ))}
      </div>
    </Section>
  );
}
