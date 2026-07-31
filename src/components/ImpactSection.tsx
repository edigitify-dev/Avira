import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { CountUp } from "@/components/motion/CountUp";
import { UnderlineDraw } from "@/components/motion/UnderlineDraw";

const stats = [
  { value: 12, suffix: "", label: "Honors & awards" },
  { value: 10, suffix: "+", label: "Years of experience" },
  { value: 50, suffix: "+", label: "Clients served" },
  { value: 97, suffix: "%", label: "Success rate" },
];

export function ImpactSection() {
  return (
    <Section theme="dark" stagger staggerChildren={0.12} className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-24">
      <StaggerItem className="max-w-md">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">By the numbers</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
          Results our clients can point to
        </h2>
        <p className="mt-5 font-sans text-base leading-7 text-cream/70">
          A decade of practice measured the way it should be — in outcomes, not billable hours.
        </p>
      </StaggerItem>

      <div className="grid flex-1 grid-cols-2 divide-x divide-y divide-cream/15 border border-cream/15 sm:divide-y-0 sm:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.label} className="flex flex-col gap-3 px-6 py-8">
            <span className="font-serif text-4xl sm:text-5xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </span>
            <UnderlineDraw className="h-px w-8 bg-rust" />
            <span className="font-sans text-xs uppercase tracking-[0.15em] text-cream/60">
              {stat.label}
            </span>
          </StaggerItem>
        ))}
      </div>
    </Section>
  );
}
