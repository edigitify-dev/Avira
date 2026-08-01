import Image from "next/image";
import { Quote } from "lucide-react";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

export function TestimonialSection() {
  return (
    <Section
      theme="forest"
      stagger
      staggerChildren={0.15}
      className="flex flex-col items-center gap-10 text-center"
    >
      <StaggerItem>
        <Quote className="h-9 w-9 text-rust" strokeWidth={1.5} />
      </StaggerItem>

      <StaggerItem className="max-w-2xl">
        <p className="font-serif text-2xl leading-relaxed text-cream sm:text-3xl">
          Avira didn&apos;t just handle our restructuring — they anticipated every question the
          board would ask before we did. That kind of foresight is rare.
        </p>
      </StaggerItem>

      <StaggerItem className="flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            src="https://images.pexels.com/photos/34381970/pexels-photo-34381970.jpeg"
            alt="Priya Nair"
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="text-left">
          <p className="font-serif text-base text-cream">Priya Nair</p>
          <p className="font-sans text-xs uppercase tracking-[0.15em] text-cream/55">
            CFO, Nimbus Retail
          </p>
        </div>
      </StaggerItem>
    </Section>
  );
}
