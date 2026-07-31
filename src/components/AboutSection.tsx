import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { UnderlineDraw } from "@/components/motion/UnderlineDraw";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

const timeline = [
  {
    index: "01",
    title: "Strategic legal advisory",
    body: "Counsel positioned ahead of the decision, not filed after it.",
  },
  {
    index: "02",
    title: "Corporate & litigation expertise",
    body: "One team across the deal and the dispute, so nothing gets lost in the handoff.",
  },
  {
    index: "03",
    title: "Pan-India presence",
    body: "Local standing where your business actually operates.",
  },
];

export function AboutSection() {
  return (
    <Section
      theme="light"
      stagger
      staggerChildren={0.15}
      className="grid grid-cols-1 items-stretch gap-16 px-0! py-0! lg:grid-cols-12 lg:gap-x-12"
    >
      <div className="flex flex-col justify-center px-6 py-24 sm:px-16 sm:py-32 lg:col-span-6 lg:py-32 lg:pr-0">
        <StaggerItem>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">
            About Avira
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Passion, precision, and professionalism in law
          </h2>
        </StaggerItem>

        <StaggerItem className="mt-8 flex items-center gap-6 border-y border-ink/10 py-6">
          <span className="font-serif text-5xl text-ink">40+</span>
          <span className="h-10 w-px bg-ink/15" />
          <span className="font-sans text-sm leading-6 text-ink/70">
            Years combined
            <br />
            experience
          </span>
        </StaggerItem>

        <StaggerItem className="mt-10 flex flex-col">
          {timeline.map((item, i) => (
            <div key={item.index} className="relative flex gap-6 pb-8 last:pb-0">
              {i < timeline.length - 1 && (
                <span className="absolute left-[0.6rem] top-8 bottom-0 w-px bg-ink/10" />
              )}
              <span className="font-serif text-sm text-rust">{item.index}</span>
              <div>
                <p className="font-sans text-base font-medium text-ink">{item.title}</p>
                <p className="mt-1 max-w-sm font-sans text-sm leading-6 text-ink/60">{item.body}</p>
              </div>
            </div>
          ))}
        </StaggerItem>

        <StaggerItem>
          <a href="#contact" className="group mt-4 inline-flex w-fit flex-col font-sans text-sm font-medium uppercase tracking-widest text-ink">
            Learn more about our approach
            <UnderlineDraw className="mt-1 h-px w-full bg-ink" />
          </a>
        </StaggerItem>
      </div>

      <StaggerItem variant="fadeIn" className="relative lg:col-span-6">
        <ParallaxImage
          src="https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg"
          alt="Statue of Lady Justice holding the scales"
          className="h-80 w-full sm:h-112 lg:h-full lg:min-h-144"
        />
        <div className="pointer-events-none absolute inset-0 bg-forest mix-blend-multiply opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/40 to-transparent" />
      </StaggerItem>
    </Section>
  );
}
