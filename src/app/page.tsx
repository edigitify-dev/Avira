import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

const eyebrow = "font-sans text-sm font-medium uppercase tracking-[0.2em]";

const practiceAreas = [
  {
    title: "Corporate",
    body: "Structuring, contracts, and governance for growing businesses.",
  },
  {
    title: "Litigation",
    body: "Representation and strategy for disputes, from filing to resolution.",
  },
  {
    title: "Advisory",
    body: "Ongoing counsel so decisions get made with the risk already priced in.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Section theme="dark" variant="fadeUp" className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
        <p className={`${eyebrow} text-cream/70`}>Legal Platform</p>
        <h1 className="font-serif text-6xl font-medium italic sm:text-7xl">Ako</h1>
        <p className="max-w-md font-sans text-lg leading-8 text-cream/80">
          Counsel built around how modern businesses actually move.
        </p>
      </Section>

      <Section theme="light" stagger staggerChildren={0.15} className="flex flex-col items-center gap-16">
        <StaggerItem className="text-center">
          <p className={`${eyebrow} text-slate`}>What we do</p>
          <h2 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">Practice areas</h2>
        </StaggerItem>
        <div className="grid w-full max-w-4xl gap-6 sm:grid-cols-3">
          {practiceAreas.map((area) => (
            <StaggerItem key={area.title} className="rounded-2xl bg-paper p-8 shadow-sm">
              <h3 className="font-serif text-xl font-medium text-ink">{area.title}</h3>
              <p className="mt-3 font-sans text-sm leading-6 text-ink/70">{area.body}</p>
            </StaggerItem>
          ))}
        </div>
      </Section>

      <Section theme="forest" variant="scaleIn" className="flex flex-col items-center gap-6 text-center">
        <p className={`${eyebrow} text-cream/70`}>Get in touch</p>
        <h2 className="max-w-lg font-serif text-4xl font-medium sm:text-5xl">
          Let&apos;s talk about where your business is headed
        </h2>
        <a
          href="#"
          className="mt-4 rounded-full bg-rust px-8 py-3 font-sans text-sm font-medium uppercase tracking-widest text-cream transition-colors hover:bg-rust/90"
        >
          Book a consultation
        </a>
      </Section>
    </div>
  );
}
