import Image from "next/image";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

const highlights = [
  "Strategic legal advisory",
  "Corporate & litigation expertise",
  "Pan-India presence",
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 shrink-0 text-rust">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 10.2 8.8 12.5 13.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AboutSection() {
  return (
    <Section theme="light" stagger staggerChildren={0.15} className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
      <StaggerItem className="max-w-lg">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">
          About Avira
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Passion, precision, and professionalism in law
        </h2>
        <p className="mt-6 font-sans text-base leading-7 text-ink/70">
          We&apos;re a boutique legal practice built for how modern businesses actually operate —
          pairing rigorous legal craft with the kind of responsive, plain-spoken counsel clients
          don&apos;t have to chase down.
        </p>

        <ul className="mt-8 flex flex-col gap-4">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-3 font-sans text-base font-medium text-ink">
              <CheckIcon />
              {item}
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="mt-10 inline-flex items-center gap-2 rounded-lg bg-ink px-8 py-4 font-sans text-sm font-medium uppercase tracking-widest text-cream transition-colors hover:bg-ink/90"
        >
          Learn more
          <span aria-hidden>↗</span>
        </a>
      </StaggerItem>

      <StaggerItem variant="slideInRight" className="relative">
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl sm:aspect-5/6">
          <Image
            src="https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg"
            alt="Statue of Lady Justice holding the scales"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        </div>

        <div className="absolute -bottom-8 -left-6 rounded-xl bg-paper px-8 py-6 shadow-xl sm:-left-10">
          <p className="font-serif text-4xl text-ink">40+</p>
          <p className="mt-1 font-sans text-xs font-medium uppercase tracking-[0.15em] text-rust">
            Years combined
            <br />
            experience
          </p>
        </div>
      </StaggerItem>
    </Section>
  );
}
