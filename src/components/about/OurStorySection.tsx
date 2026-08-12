import Image from "next/image";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

export function OurStorySection() {
  return (
    <Section
      theme="light"
      topLine
      stagger
      staggerChildren={0.15}
      className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24"
    >
      <StaggerItem className="max-w-lg">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">
          Our story
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          A practice built one relationship at a time
        </h2>
        <p className="mt-6 font-sans text-base leading-7 text-ink/65">
          We never set out to be the biggest firm in the room — only the one clients actually
          wanted to call first. That meant saying no to volume in favour of depth: fewer
          matters, held by fewer hands, each one led by a partner who knows the business behind
          the paperwork.
        </p>
        <p className="mt-5 font-sans text-base leading-7 text-ink/65">
          A decade later, the practice has grown into a pan-India bench with cross-border reach —
          but the operating principle hasn&apos;t moved. Every engagement is still built around
          direct access, plain-spoken advice, and outcomes the client can point to.
        </p>

        <blockquote className="mt-9 border-l-2 border-rust py-1 pl-6">
          <p className="font-serif text-xl italic leading-relaxed text-ink">
            &ldquo;We built Avira around a simple idea — that legal counsel should feel like a
            partner in the room, not a vendor on retainer.&rdquo;
          </p>
          <footer className="mt-4 font-sans text-xs font-medium uppercase tracking-[0.15em] text-ink/50">
            Arjun Malhotra — Managing Partner
          </footer>
        </blockquote>
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

        <div className="absolute -bottom-8 -right-6 border border-ink/15 bg-paper px-8 py-6 sm:-right-10">
          <p className="font-serif text-4xl text-ink">500+</p>
          <p className="mt-1 font-sans text-xs font-medium uppercase tracking-[0.15em] text-rust">
            Matters
            <br />
            resolved
          </p>
        </div>
      </StaggerItem>
    </Section>
  );
}
