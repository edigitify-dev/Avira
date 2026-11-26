import Link from "next/link";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { GeometryPattern } from "@/components/home/GeometryPattern";

export function Hero() {
  return (
    <Section
      theme="light"
      size="spacious"
      stagger
      staggerChildren={0.15}
      className="isolate grid grid-cols-2 items-center gap-x-8 gap-y-12 overflow-hidden lg:min-h-[46rem] lg:grid-cols-12 lg:gap-8"
    >
      <StaggerItem variant="scaleIn" className="lg:col-span-3 lg:self-start">
        <div className="mx-auto w-full max-w-48 text-forest sm:max-w-60 lg:-mt-6 lg:max-w-72">
          <GeometryPattern variant="fold" />
        </div>
      </StaggerItem>

      <StaggerItem className="order-first col-span-2 lg:order-none lg:col-span-6">
        <h1 className="font-serif text-2xl leading-[1.35] text-ink sm:text-3xl lg:text-[2.75rem] lg:leading-[1.22]">
          Avira stands for strength and resolve - qualities reflected in clear thinking, sound
          judgment and purposeful advocacy.
        </h1>
        <div className="mt-10 flex items-center">
          <Link
            href="/about"
            className="inline-flex shrink-0 items-center gap-2 border border-forest/35 px-6 py-3 font-sans text-sm font-medium text-forest outline-offset-4 transition-colors hover:border-forest hover:bg-forest hover:text-cream focus-visible:outline-2 focus-visible:outline-forest motion-reduce:transition-none"
          >
            Learn More
            <span aria-hidden>→</span>
          </Link>
        </div>
      </StaggerItem>

      <StaggerItem variant="scaleIn" className="lg:col-span-3 lg:self-end lg:pt-24">
        <div className="mx-auto w-full max-w-48 text-forest sm:max-w-60 lg:max-w-72">
          <GeometryPattern variant="halo" />
        </div>
      </StaggerItem>
    </Section>
  );
}
