import Image from "next/image";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { UnderlineDraw } from "@/components/motion/UnderlineDraw";

const highlights = [
  {
    title: "Strategic legal advisory",
    body: "Counsel positioned ahead of the decision, not filed after it.",
  },
  {
    title: "Corporate & litigation expertise",
    body: "One team across the deal and the dispute, so nothing gets lost in the handoff.",
  },
  {
    title: "Pan-India presence",
    body: "Local standing where your business actually operates.",
  },
];

export function AboutSection() {
  return (
    <Section theme="light" stagger staggerChildren={0.15}>
      <StaggerItem className="max-w-2xl">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">
          About Avira
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Passion, precision, and professionalism in law
        </h2>
        <p className="mt-6 font-sans text-base leading-7 text-ink/70">
          We&apos;re a boutique legal practice built for how modern businesses actually operate,
          backed by <span className="text-ink">40+ years</span>{" "}
          of combined experience —
          pairing rigorous legal craft with the kind of responsive, plain-spoken counsel clients
          don&apos;t have to chase down.
        </p>
      </StaggerItem>

      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
        <StaggerItem className="overflow-hidden rounded-2xl">
          <Image
            src="https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg"
            alt="Statue of Lady Justice holding the scales"
            width={900}
            height={1080}
            className="aspect-4/5 w-full object-cover"
          />
        </StaggerItem>

        <StaggerItem className="flex flex-col justify-center gap-10">
          {highlights.map((item) => (
            <div key={item.title}>
              <p className="font-serif text-xl text-ink">{item.title}</p>
              <p className="mt-2 max-w-sm font-sans text-sm leading-6 text-ink/60">{item.body}</p>
            </div>
          ))}

          <a
            href="#contact"
            className="group inline-flex w-fit flex-col font-sans text-sm font-medium uppercase tracking-widest text-ink"
          >
            Learn more about our approach
            <UnderlineDraw className="mt-1 h-px w-full bg-rust" />
          </a>
        </StaggerItem>
      </div>
    </Section>
  );
}
