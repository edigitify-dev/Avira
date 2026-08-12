import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

const steps = [
  {
    number: "01",
    title: "Consultation",
    body: "We begin with a deep analysis of your legal landscape, identifying critical risks and strategic opportunities.",
  },
  {
    number: "02",
    title: "Strategy",
    body: "Developing a bespoke legal framework designed for precision, resilience, and long-term success.",
  },
  {
    number: "03",
    title: "Execution",
    body: "Implementing our strategy with meticulous attention to detail, ensuring every action serves the objective.",
  },
  {
    number: "04",
    title: "Resolution",
    body: "Achieving high-stakes results while providing ongoing protection and strategic advisory.",
  },
];

export function ProcessSection() {
  return (
    <Section theme="dark" topLine stagger staggerChildren={0.12} className="flex flex-col gap-16">
      <StaggerItem className="max-w-2xl">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cream/60">
          Our process
        </p>
        <h2 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl">
          Our expertise & process
        </h2>
        <p className="mt-5 font-sans text-base leading-7 text-cream/65">
          Strategic legal guidance tailored to ensure compliance, strengthen businesses, and resolve
          complex corporate challenges.
        </p>
      </StaggerItem>

      {/*
        border-t border-l on container + border-r border-b on each cell
        = complete bordered grid, no double-borders, cards share the ink bg.
        The cells are defined entirely by their hairline borders — no fill needed.
      */}
      <StaggerItem>
        <div className="grid grid-cols-1 border-t border-l border-cream/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex min-h-80 flex-col overflow-hidden border-r border-b border-cream/10 p-8 lg:p-10"
            >
              {/* Large watermark numeral, clipped by overflow-hidden */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-2 select-none font-serif text-[7rem] leading-none text-cream/[0.06]"
              >
                {step.number}
              </span>

              {/* Small step label */}
              <p className="font-sans text-xs text-cream/30">{step.number}</p>

              {/* Push content to bottom */}
              <div className="flex-1" />

              {/* Title */}
              <p className="font-serif text-2xl text-cream">{step.title}</p>

              {/* Hairline rule */}
              <div className="mt-4 h-px w-8 bg-cream/20" />

              {/* Body */}
              <p className="mt-4 font-sans text-sm leading-6 text-cream/60">{step.body}</p>
            </div>
          ))}
        </div>
      </StaggerItem>
    </Section>
  );
}
