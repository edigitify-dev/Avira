import { EditableText, EditableImage, EditableLink } from "@/components/cms/Editable";
import { getPublishedInsights } from "@/lib/cms/insights";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { BrandWatermark } from "@/components/BrandWatermark";
import { InsightsCollection } from "@/components/insights/InsightsCollection";
import { Footer } from "@/components/Footer";
import { formatInsightDate, getReadingTime } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights | Avira Law",
  description: "Perspectives on competition, commerce and the questions shaping the law. Explore the Avira Law editorial collection.",
};

export default async function InsightsPage() {
  const insights = await getPublishedInsights();
  const featured = insights[0];

  return (
    <div className="flex flex-1 flex-col">
      <main>
        <Section theme="light" size="spacious" stagger className="isolate overflow-hidden lg:flex lg:min-h-[46rem] lg:flex-col lg:justify-center">
          <BrandWatermark tone="deep-teal" />
          <div className="mx-auto w-full max-w-[88rem]">
            <div className="grid gap-7 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-20">
              <StaggerItem>
                <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-forest"><EditableText id="app-insights-page-1">{"The Avira perspective"}</EditableText></p>
                <h1 className="mt-5 font-serif text-6xl leading-[1.02] tracking-tight text-ink sm:text-8xl"><EditableText id="app-insights-page-2">{"Ideas with"}</EditableText><br /><span className="italic text-forest"><EditableText id="app-insights-page-3">{"perspective."}</EditableText></span></h1>
              </StaggerItem>
              <StaggerItem>
                <p className="max-w-md font-sans text-base leading-8 text-ink/75"><EditableText id="app-insights-page-4">{"A closer look at competition, commerce and the questions shaping the law. Considered thinking. A clearer view."}</EditableText></p>
                <p className="mt-5 font-sans text-xs text-ink/60"><EditableText id="app-insights-page-5">{"Insights · The Avira journal"}</EditableText></p>
              </StaggerItem>
            </div>
          </div>
        </Section>

        {featured && (
          <Section theme="white" size="slim" stagger>
            <div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <StaggerItem className="relative aspect-[4/3] overflow-hidden bg-ink">
                <EditableImage contentId="app-insights-page-6" src={featured.image || "/hero.jpg"} alt={featured.imageAlt || "A wooden judge’s gavel in warm light"} unoptimized={Boolean(featured.image)} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                <span className="absolute bottom-5 left-5 bg-cream px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink"><EditableText id="app-insights-page-7">{"In focus"}</EditableText></span>
              </StaggerItem>
              <StaggerItem>
                <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-forest"><EditableText id="app-insights-page-8">{"Featured insight / "}</EditableText><EditableText id="app-insights-page-9" dynamic>{featured.category}</EditableText></p>
                <h2 className="mt-6 font-serif text-4xl leading-[1.13] tracking-tight text-ink sm:text-5xl">
                  <EditableLink contentId="app-insights-page-10" nextLink href={`/insights/${featured.slug}`} className="outline-offset-4 hover:text-forest focus-visible:outline-2 focus-visible:outline-forest"><EditableText id="app-insights-page-11" dynamic>{featured.title}</EditableText></EditableLink>
                </h2>
                <p className="mt-6 max-w-lg font-sans text-sm leading-7 text-ink/70"><EditableText id="app-insights-page-12" dynamic>{featured.summary}</EditableText></p>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-xs text-ink/65">
                  <time dateTime={featured.date}><EditableText id="app-insights-page-13" dynamic>{formatInsightDate(featured.date)}</EditableText></time>
                  <span aria-hidden>·</span>
                  <span>{getReadingTime(featured)}<EditableText id="app-insights-page-14">{" min read"}</EditableText></span>
                </div>
                <EditableLink contentId="app-insights-page-15" nextLink href={`/insights/${featured.slug}`} className="mt-9 inline-flex items-center gap-8 bg-ink px-6 py-4 font-sans text-xs font-medium text-cream outline-offset-4 transition-colors hover:bg-forest focus-visible:outline-2 focus-visible:outline-forest motion-reduce:transition-none"><EditableText id="app-insights-page-16">{"Read the perspective "}</EditableText><ArrowUpRight aria-hidden className="h-4 w-4" /></EditableLink>
              </StaggerItem>
            </div>
          </Section>
        )}

        <Section id="all-insights" theme="light" stagger amount={0.05}>
          <div className="mx-auto max-w-[88rem]">
            <StaggerItem className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-forest"><EditableText id="app-insights-page-17">{"From the journal"}</EditableText></p>
                <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl"><EditableText id="app-insights-page-18">{"Explore our insights"}</EditableText></h2>
              </div>
              <p className="max-w-xs font-sans text-sm leading-6 text-ink/70"><EditableText id="app-insights-page-19">{"Different questions. The same commitment to clarity."}</EditableText></p>
            </StaggerItem>
            <StaggerItem><InsightsCollection items={insights} /></StaggerItem>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
