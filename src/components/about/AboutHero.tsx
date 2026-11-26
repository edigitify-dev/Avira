import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { AboutPattern } from "@/components/about/AboutPattern";

export function AboutHero() {
  return (
    <Section
      theme="white"
      size="spacious"
      stagger
      staggerChildren={0.15}
      className="isolate grid items-center gap-16 overflow-hidden lg:min-h-[46rem] lg:grid-cols-12 lg:gap-8 lg:py-24!"
    >
      <StaggerItem className="lg:col-span-5">
        <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-rust">
          About Us
        </p>
        <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-[3.75rem]">
          Who we are
        </h1>
        <p className="mt-7 max-w-md font-sans text-base leading-7 text-ink/65">
          Avira stands for strength and resolve - qualities reflected in clear thinking, sound
          judgment and purposeful advocacy.
        </p>
        <p className="mt-5 max-w-md font-sans text-base leading-7 text-ink/65">
          Avira Law is an Indian law firm with a practice spanning corporate and commercial law,
          litigation and arbitration, white-collar and regulatory matters, investigations,
          corporate governance and employment. The firm advises Indian and international clients on
          domestic and cross-border matters, across both contentious and advisory work.
        </p>
      </StaggerItem>

      <StaggerItem variant="scaleIn" className="flex items-center justify-center lg:col-span-7">
        <div className="aspect-square w-full max-w-lg text-forest">
          <AboutPattern variant="structure" />
        </div>
      </StaggerItem>
    </Section>
  );
}
