import Image from "next/image";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

const stats = [
  { value: "2016", label: "Founded" },
  { value: "50+", label: "Attorneys" },
  { value: "15+", label: "Countries" },
];

export function AboutHero() {
  return (
    <Section
      theme="white"
      size="tall"
      stagger
      staggerChildren={0.15}
      className="grid items-center gap-16 lg:grid-cols-12 lg:gap-8"
    >
      <StaggerItem className="lg:col-span-5">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">
          About Avira
        </p>
        <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-[3.75rem]">
          Counsel built to be trusted, not just retained.
        </h1>
        <p className="mt-7 max-w-md font-sans text-base leading-7 text-ink/65">
          Avira began as a two-person practice with a simple conviction: that legal advice is
          only as good as the judgment behind it. A decade on, that conviction is still the
          entire business — a small bench of specialists who stay on your matter from the first
          call to the last signature.
        </p>

        <dl className="mt-12 flex items-center gap-8 sm:gap-10">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8 sm:gap-10">
              {i > 0 && <span className="h-10 w-px bg-ink/10" aria-hidden />}
              <div>
                <dt className="font-serif text-3xl text-ink sm:text-4xl">{stat.value}</dt>
                <dd className="mt-1 font-sans text-xs font-medium uppercase tracking-[0.15em] text-ink/50">
                  {stat.label}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </StaggerItem>

      <StaggerItem variant="slideInRight" className="relative lg:col-span-7">
        <div className="relative aspect-4/5 w-full overflow-hidden sm:aspect-16/10">
          <Image
            src="https://images.pexels.com/photos/3771097/pexels-photo-3771097.jpeg"
            alt="Attorney reviewing legal documents at a desk"
            fill
            sizes="(min-width: 1024px) 55vw, 90vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute -bottom-8 -left-6 border border-ink/15 bg-paper px-8 py-6 sm:-left-10">
          <p className="font-serif text-4xl text-ink">2016</p>
          <p className="mt-1 font-sans text-xs font-medium uppercase tracking-[0.15em] text-rust">
            Where Avira
            <br />
            began
          </p>
        </div>
      </StaggerItem>
    </Section>
  );
}
