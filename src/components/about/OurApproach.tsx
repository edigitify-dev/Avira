import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

export function OurApproach() {
  return (
    <Section
      theme="light"
      topLine
      stagger
      staggerChildren={0.15}
      className="grid gap-12 lg:grid-cols-12 lg:gap-24"
    >
      <StaggerItem className="lg:col-span-5">
        <h2 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">Our approach</h2>
      </StaggerItem>

      <StaggerItem className="flex flex-col gap-5 lg:col-span-7">
        <p className="font-sans text-base leading-7 text-ink/65">
          Our approach is grounded in rigorous analysis, sound judgment and a clear sense of
          purpose. We value legal work that is thoughtful, commercially aware and expressed with
          precision. That means engaging seriously with the law, questioning assumptions where
          necessary and arriving at a considered view rather than defaulting to convention.
        </p>
        <p className="font-sans text-base leading-7 text-ink/65">
          We also place importance on the way advice is delivered. Clarity, candour and
          responsiveness matter, as does consistency of thought from the outset through to
          conclusion. The emphasis is on substance, perspective and advice that is both legally
          robust and practically useful.
        </p>
      </StaggerItem>
    </Section>
  );
}
