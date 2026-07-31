import Image from "next/image";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { NavBar } from "@/components/NavBar";

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
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/35 to-ink/10" />

      <div className="relative z-10 flex flex-1 flex-col justify-between px-6 py-8 sm:px-16 sm:py-10">
        <AnimatedSection as="div" variant="fadeDown">
          <NavBar />
        </AnimatedSection>

        <AnimatedSection
          as="div"
          stagger
          staggerChildren={0.15}
          className="max-w-2xl pb-16 sm:pb-24"
        >
          <StaggerItem>
            <h1 className="font-serif text-5xl leading-[1.1] text-cream sm:text-6xl">
              Your trusted partner for every step ahead
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 max-w-md font-sans text-lg leading-8 text-cream/80">
              Counsel built around how modern businesses actually move — clear, responsive, and always in your corner.
            </p>
          </StaggerItem>
          <StaggerItem>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-rust px-7 py-3.5 font-sans text-sm font-medium uppercase tracking-widest text-cream transition-colors hover:bg-rust/90"
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
