import { EditableLink, EditableText, EditableImage } from "@/components/cms/Editable";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { BrandWatermark } from "@/components/BrandWatermark";
import { InsightsGrid } from "@/components/insights/InsightsGrid";
import { CopyInsightLink } from "@/components/insights/CopyInsightLink";
import { Footer } from "@/components/Footer";
import {
  formatInsightDate,
  getReadingTime,
  getRelatedInsights,
} from "@/lib/insights";

import { getPublishedInsights, getDraftInsight } from "@/lib/cms/insights";
import { getAdmin } from "@/lib/cms/auth";

type InsightPageProps = { params: Promise<{ slug: string }>; searchParams: Promise<{ preview?: string; cmsCanvas?: string }> };
async function visibleInsight(slug: string, preview: boolean) {
  if (preview && await getAdmin()) return getDraftInsight(slug);
  return (await getPublishedInsights()).find(item => item.slug === slug);
}

export async function generateMetadata({ params, searchParams }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const search = await searchParams;
  const preview = search.preview === "1" || search.cmsCanvas === "1";
  const insight = await visibleInsight(slug, preview);
  if (!insight) notFound();

  return {
    robots: preview ? { index: false, follow: false } : undefined,
    title: `${insight.title} | Avira Law`,
    description: insight.summary,
    openGraph: {
      title: insight.title,
      description: insight.summary,
      type: "article",
      publishedTime: insight.date,
    },
  };
}

export default async function InsightDetailPage({ params, searchParams }: InsightPageProps) {
  const { slug } = await params;
  const search = await searchParams;
  const preview = search.preview === "1" || search.cmsCanvas === "1";
  const insight = await visibleInsight(slug, preview);
  if (!insight) notFound();

  const collection = await getPublishedInsights();
  return (
    <div className="flex flex-1 flex-col">
      <main>
        <article>
          <Section theme="light" stagger className="isolate overflow-hidden lg:flex lg:min-h-[46rem] lg:flex-col lg:justify-center pb-16! pt-32! sm:pb-20! sm:pt-40!">
            <BrandWatermark tone="deep-teal" />
            <div className="mx-auto max-w-[88rem]">
              <StaggerItem>
                <EditableLink contentId="app-insights--slug--page-1" nextLink href="/insights" className="inline-flex items-center gap-3 font-sans text-xs font-medium text-ink/70 outline-offset-4 hover:text-forest focus-visible:outline-2 focus-visible:outline-forest">
                  <ArrowLeft aria-hidden className="h-4 w-4" /><EditableText id="app-insights--slug--page-2">{" Back to insights"}</EditableText></EditableLink>
              </StaggerItem>
              <StaggerItem className="mt-14">
                <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-forest"><EditableText id="app-insights--slug--page-3" dynamic>{insight.category}</EditableText></p>
                <h1 className="mt-5 max-w-5xl text-balance font-serif text-[2.65rem] leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-7xl"><EditableText id="app-insights--slug--page-4" dynamic>{insight.title}</EditableText></h1>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-7 max-w-2xl font-sans text-base leading-8 text-ink/75 sm:text-lg"><EditableText id="app-insights--slug--page-5" dynamic>{insight.summary}</EditableText></p>
                <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 font-sans text-xs text-ink/70">
                  <span className="font-medium text-ink"><EditableText id="app-insights--slug--page-6">{insight.author || "Avira Editorial"}</EditableText></span>
                  <span aria-hidden>·</span>
                  <time dateTime={insight.date}><EditableText id="app-insights--slug--page-7" dynamic>{formatInsightDate(insight.date)}</EditableText></time>
                  <span aria-hidden>·</span>
                  <span>{getReadingTime(insight)}<EditableText id="app-insights--slug--page-8">{" min read"}</EditableText></span>
                </div>
                {insight.sample !== false && <p className="mt-4 font-sans text-[11px] text-ink/60"><EditableText id="app-insights--slug--page-9">{"Sample article · Illustrative content"}</EditableText></p>}
              </StaggerItem>
            </div>
          </Section>

          <Section theme="white" stagger amount={0.02}>
            <div className="mx-auto grid max-w-[88rem] gap-14 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-20 xl:gap-28">
              <aside className="self-start lg:sticky lg:top-28">
                <StaggerItem>
                  <nav aria-label="In this article">
                    <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-forest"><EditableText id="app-insights--slug--page-10">{"In this article"}</EditableText></p>
                    <ol className="mt-6 flex flex-col gap-5">
                      {insight.sections.map((section, index) => (
                        <li key={section.id}>
                          <EditableLink contentId="app-insights--slug--page-11" href={`#${section.id}`} className="group flex gap-3 font-sans text-xs leading-6 text-ink/70 outline-offset-4 hover:text-forest focus-visible:outline-2 focus-visible:outline-forest">
                            <span className="text-forest/60">0{index + 1}</span>
                            <span><EditableText id="app-insights--slug--page-12" dynamic>{section.heading}</EditableText></span>
                          </EditableLink>
                        </li>
                      ))}
                    </ol>
                  </nav>
                  <div className="mt-9"><CopyInsightLink /></div>
                </StaggerItem>
              </aside>

              <div className="min-w-0 max-w-3xl">
                <StaggerItem>
                  {insight.image && <div className="relative mb-10 aspect-[16/10] overflow-hidden bg-cream"><EditableImage contentId="article-cover" src={insight.image} alt={insight.imageAlt || insight.title} fill unoptimized sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" /></div>}
                  <p className="font-serif text-2xl leading-relaxed text-ink sm:text-[1.75rem]"><EditableText id="app-insights--slug--page-13" dynamic>{insight.introduction}</EditableText></p>
                  {insight.takeaways.length > 0 && <div className="my-12 bg-cream/60 p-7 sm:p-9">
                    <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest"><EditableText id="app-insights--slug--page-14">{"At a glance"}</EditableText></h2>
                    <ul className="mt-6 space-y-5">
                      {insight.takeaways.map((takeaway, index) => (
                        <li key={takeaway} className="flex gap-4 font-sans text-sm leading-7 text-ink/80">
                          <span aria-hidden className="font-serif text-lg text-forest">0{index + 1}</span>
                          <span><EditableText id="app-insights--slug--page-15" dynamic>{takeaway}</EditableText></span>
                        </li>
                      ))}
                    </ul>
                  </div>}
                </StaggerItem>

                {insight.sections.map((section, index) => (
                  <AnimatedSection as="div" id={section.id} key={section.id} stagger amount={0.15} className="mb-12 scroll-mt-32 last:mb-0">
                    <StaggerItem>
                      <h2 className="font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl"><EditableText id="app-insights--slug--page-16" dynamic>{section.heading}</EditableText></h2>
                    </StaggerItem>
                    {section.paragraphs.map((paragraph) => (
                      <StaggerItem key={paragraph}>
                        <p className="mt-6 font-sans text-[15px] leading-8 text-ink/80 sm:text-base"><EditableText id="app-insights--slug--page-17" dynamic>{paragraph}</EditableText></p>
                      </StaggerItem>
                    ))}
                    {index === 0 && insight.quote && (
                      <StaggerItem>
                        <blockquote className="my-12 border-l-2 border-forest pl-7 font-serif text-2xl italic leading-relaxed text-forest sm:pl-9 sm:text-3xl">“<EditableText id="app-insights--slug--page-18" dynamic>{insight.quote}</EditableText>”</blockquote>
                      </StaggerItem>
                    )}
                  </AnimatedSection>
                ))}

              </div>
            </div>
          </Section>
        </article>

        <Section theme="light" stagger amount={0.1}>
          <div className="mx-auto max-w-[88rem]">
            <StaggerItem className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-forest"><EditableText id="app-insights--slug--page-19">{"Keep reading"}</EditableText></p>
                <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl"><EditableText id="app-insights--slug--page-20">{"More perspectives"}</EditableText></h2>
              </div>
              <EditableLink contentId="app-insights--slug--page-21" nextLink href="/insights#all-insights" className="inline-flex items-center gap-3 font-sans text-xs font-medium text-forest outline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-forest"><EditableText id="app-insights--slug--page-22">{"All insights "}</EditableText><ArrowUpRight aria-hidden className="h-4 w-4" /></EditableLink>
            </StaggerItem>
            <InsightsGrid items={getRelatedInsights(insight, 3, collection)} />
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
