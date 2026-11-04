import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { InsightsCollection } from "@/components/insights/InsightsCollection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { formatInsightDate, getReadingTime, insights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights | Avira Law",
  description: "Perspectives on competition, commerce and the questions shaping the law. Explore the Avira Law sample editorial collection.",
};

export default function InsightsPage() {
  const featured = insights[0];

  return (
    <div className="flex flex-1 flex-col">
      <main>
        <Section theme="light" stagger className="pb-16! pt-36! sm:pb-20! sm:pt-44!">
          <div className="mx-auto max-w-7xl">
            <StaggerItem>
              <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-forest">The Avira perspective</p>
            </StaggerItem>
            <div className="mt-7 grid gap-7 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-20">
              <StaggerItem>
                <h1 className="font-serif text-6xl leading-[1.02] tracking-tight text-ink sm:text-8xl">Ideas with<br /><span className="italic text-forest">perspective.</span></h1>
              </StaggerItem>
              <StaggerItem>
                <p className="max-w-md font-sans text-base leading-8 text-ink/75">A closer look at competition, commerce and the questions shaping the law. Considered thinking. A clearer view.</p>
                <p className="mt-5 font-sans text-xs text-ink/60">Insights · Sample editorial collection</p>
              </StaggerItem>
            </div>
          </div>
        </Section>

        {featured && (
          <Section theme="white" size="slim" stagger>
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <StaggerItem className="relative aspect-[4/3] overflow-hidden bg-ink">
                <Image src="/hero.jpg" alt="A wooden judge’s gavel in warm light" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                <span className="absolute bottom-5 left-5 bg-cream px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">In focus</span>
              </StaggerItem>
              <StaggerItem>
                <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-forest">Featured insight / {featured.category}</p>
                <h2 className="mt-6 font-serif text-4xl leading-[1.13] tracking-tight text-ink sm:text-5xl">
                  <Link href={`/insights/${featured.slug}`} className="outline-offset-4 hover:text-forest focus-visible:outline-2 focus-visible:outline-forest">{featured.title}</Link>
                </h2>
                <p className="mt-6 max-w-lg font-sans text-sm leading-7 text-ink/70">{featured.summary}</p>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-xs text-ink/65">
                  <time dateTime={featured.date}>{formatInsightDate(featured.date)}</time>
                  <span aria-hidden>·</span>
                  <span>{getReadingTime(featured)} min read</span>
                </div>
                <Link href={`/insights/${featured.slug}`} className="mt-9 inline-flex items-center gap-8 bg-ink px-6 py-4 font-sans text-xs font-medium text-cream outline-offset-4 transition-colors hover:bg-forest focus-visible:outline-2 focus-visible:outline-forest motion-reduce:transition-none">Read the perspective <ArrowUpRight aria-hidden className="h-4 w-4" /></Link>
              </StaggerItem>
            </div>
          </Section>
        )}

        <Section id="all-insights" theme="light" stagger amount={0.05}>
          <div className="mx-auto max-w-7xl">
            <StaggerItem className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-forest">From the journal</p>
                <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">Explore our insights</h2>
              </div>
              <p className="max-w-xs font-sans text-sm leading-6 text-ink/70">Different questions. The same commitment to clarity.</p>
            </StaggerItem>
            <StaggerItem><InsightsCollection items={insights} /></StaggerItem>
          </div>
        </Section>

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
