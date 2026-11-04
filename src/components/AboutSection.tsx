import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

export function AboutSection() {
  return (
    <Section
      theme="ivory"
      stagger
      staggerChildren={0.15}
      className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24"
    >
      <StaggerItem className="max-w-lg">
        <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-forest">
          About Avira
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">Who we are</h2>
        <p className="mt-6 font-sans text-base leading-7 text-ink/75">
          Avira Law is an Indian law firm with a practice spanning corporate and commercial law,
          litigation and arbitration, white-collar and regulatory matters, investigations,
          corporate governance and employment.
        </p>

        <Link
          href="/about"
          className="mt-10 inline-flex items-center gap-2 bg-forest px-8 py-4 font-sans text-sm font-medium uppercase tracking-widest text-cream outline-offset-4 transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-forest motion-reduce:transition-none"
        >
          About Us
          <span aria-hidden>→</span>
        </Link>
      </StaggerItem>

      <StaggerItem variant="slideInRight" className="relative">
        <div className="relative aspect-4/5 w-full overflow-hidden sm:aspect-5/6">
          <Image
            src="https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg"
            alt="Statue of Lady Justice holding the scales"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        </div>
      </StaggerItem>
    </Section>
  );
}
