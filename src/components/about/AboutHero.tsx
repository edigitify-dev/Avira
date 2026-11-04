import Image from "next/image";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

export function AboutHero() {
  return (
    <Section
      theme="white"
      size="tall"
      stagger
      staggerChildren={0.15}
      className="grid items-center gap-16 lg:grid-cols-12 lg:gap-8"
    >
      <StaggerItem className="lg:col-span-5">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">
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

      <StaggerItem variant="slideInRight" className="relative lg:col-span-7">
        <div className="relative aspect-4/5 w-full overflow-hidden sm:aspect-16/10">
          <Image
            src="https://images.pexels.com/photos/3771097/pexels-photo-3771097.jpeg"
            alt="Attorney reviewing legal documents at a desk"
            fill
            sizes="(min-width: 1024px) 55vw, 90vw"
            className="object-cover"
            priority
          />
        </div>
      </StaggerItem>
    </Section>
  );
}
