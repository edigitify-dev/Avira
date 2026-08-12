import Image from "next/image";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StaggerItem } from "@/components/motion/StaggerItem";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-ink">
      <Image
        src="/hero.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/15" />

      <div className="relative z-10 flex flex-1 flex-col justify-end px-6 py-8 sm:px-16 sm:py-10">
        <AnimatedSection
          as="div"
          stagger
          staggerChildren={0.15}
          className="max-w-3xl pb-16 sm:pb-24"
        >
          <StaggerItem>
            <h1 className="font-serif text-6xl leading-[1.05] text-cream sm:text-7xl">
              Your trusted partner for every step ahead
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-7 max-w-lg font-sans text-lg leading-8 text-cream/75">
              Counsel built around how modern businesses actually move — clear, responsive, and always in your corner.
            </p>
          </StaggerItem>
          <StaggerItem>
            <a
              href="#contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-rust px-8 py-4 font-sans text-sm font-medium uppercase tracking-widest text-cream transition-opacity hover:opacity-85"
            >
              Get legal help now
              <span aria-hidden>↗</span>
            </a>
          </StaggerItem>
        </AnimatedSection>
      </div>
    </section>
  );
}
