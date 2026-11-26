import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { AboutPattern } from "@/components/about/AboutPattern";

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
          We never set out to be the biggest firm in the room  only the one clients actually
          wanted to call first. That meant saying no to volume in favour of depth: fewer
          matters, held by fewer hands, each one led by a partner who knows the business behind
          the paperwork.
        </p>
        <p className="mt-5 font-sans text-base leading-7 text-ink/65">
          A decade later, the practice has grown into a pan-India bench with cross-border reach,
          but the operating principle hasn&apos;t moved. Every engagement is still built around
          direct access, plain-spoken advice, and outcomes the client can point to.
        </p>

        <blockquote className="mt-9 border-l-2 border-rust py-1 pl-6">
          <p className="font-serif text-xl italic leading-relaxed text-ink">
            &ldquo;We built Avira around a simple idea, that legal counsel should feel like a
            partner in the room, not a vendor on retainer.&rdquo;
          </p>
          <footer className="mt-4 font-sans text-xs font-medium uppercase tracking-[0.15em] text-ink/50">
            Arjun Malhotra — Managing Partner
          </footer>
        </blockquote>
      </StaggerItem>

      <StaggerItem variant="scaleIn" className="flex flex-col items-center">
        <div className="aspect-square w-full max-w-lg text-forest">
          <AboutPattern variant="rosette" />
        </div>

        <div className="mt-6 flex items-baseline justify-center gap-4">
          <p className="font-serif text-4xl text-ink">500+</p>
          <p className="font-sans text-sm font-medium uppercase tracking-[0.15em] text-forest">
            Matters resolved
          </p>
        </div>
      </StaggerItem>
    </Section>
  );
}
