import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

export function Hero() {
  return (
    <Section
      theme="white"
      size="tall"
      stagger
      staggerChildren={0.15}
      className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-start lg:gap-8"
    >
      <StaggerItem className="lg:col-span-3">
        <div className="relative mt-8 aspect-4/5 w-40 overflow-hidden sm:w-48">
          <Image
            src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg"
            alt="Legal documents and a pen on a desk"
            fill
            sizes="200px"
            className="object-cover"
          />
        </div>
      </StaggerItem>

      <StaggerItem className="lg:col-span-6">
        <p className="font-serif text-2xl leading-[1.35] text-ink sm:text-3xl lg:text-[2.25rem]">
          Avira stands for strength and resolve - qualities reflected in clear thinking, sound
          judgment and purposeful advocacy.
        </p>
        <div className="mt-10 flex items-center gap-6">
          <span className="h-px flex-1 bg-ink/15" />
          <Link
            href="/about"
            className="inline-flex shrink-0 items-center gap-2 border border-ink/20 px-6 py-3 font-sans text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
          >
            Learn More
            <span aria-hidden>→</span>
          </Link>
        </div>
      </StaggerItem>

      <StaggerItem className="flex flex-col items-start gap-8 lg:col-span-3 lg:items-end lg:pt-16">
        <div className="relative aspect-4/5 w-48 overflow-hidden sm:w-56">
          <Image
            src="https://images.pexels.com/photos/3771097/pexels-photo-3771097.jpeg"
            alt="Attorney reviewing legal documents at a desk"
            fill
            sizes="240px"
            className="object-cover"
          />
        </div>
      </StaggerItem>
    </Section>
  );
}
