import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { InsightsGrid } from "@/components/insights/InsightsGrid";
import { CopyInsightLink } from "@/components/insights/CopyInsightLink";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import {
  formatInsightDate,
  getInsightBySlug,
  getReadingTime,
  getRelatedInsights,
  insights,
} from "@/lib/insights";

type InsightPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  return {
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

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  return (
    <div className="flex flex-1 flex-col">
      <main>
        <article>
          <Section theme="light" stagger className="pb-16! pt-32! sm:pb-20! sm:pt-40!">
            <div className="mx-auto max-w-7xl">
              <StaggerItem>
                <Link href="/insights" className="inline-flex items-center gap-3 font-sans text-xs font-medium text-ink/70 outline-offset-4 hover:text-forest focus-visible:outline-2 focus-visible:outline-forest">
                  <ArrowLeft aria-hidden className="h-4 w-4" /> Back to insights
                </Link>
              </StaggerItem>
              <StaggerItem className="mt-14">
                <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-forest">{insight.category}</p>
                <h1 className="mt-6 max-w-5xl text-balance font-serif text-[2.65rem] leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-7xl">{insight.title}</h1>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-7 max-w-2xl font-sans text-base leading-8 text-ink/75 sm:text-lg">{insight.summary}</p>
                <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 font-sans text-xs text-ink/70">
                  <span className="font-medium text-ink">Avira Editorial</span>
                  <span aria-hidden>·</span>
                  <time dateTime={insight.date}>{formatInsightDate(insight.date)}</time>
                  <span aria-hidden>·</span>
                  <span>{getReadingTime(insight)} min read</span>
                </div>
                <p className="mt-4 font-sans text-[11px] text-ink/60">Sample article · Illustrative content</p>
              </StaggerItem>
            </div>
          </Section>

          <Section theme="white" stagger amount={0.02}>
            <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-20 xl:gap-28">
              <aside className="self-start lg:sticky lg:top-28">
                <StaggerItem>
                  <nav aria-label="In this article">
                    <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-forest">In this article</p>
                    <ol className="mt-6 flex flex-col gap-5">
                      {insight.sections.map((section, index) => (
                        <li key={section.id}>
                          <a href={`#${section.id}`} className="group flex gap-3 font-sans text-xs leading-6 text-ink/70 outline-offset-4 hover:text-forest focus-visible:outline-2 focus-visible:outline-forest">
                            <span className="text-forest/60">0{index + 1}</span>
                            <span>{section.heading}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                  <div className="mt-9"><CopyInsightLink /></div>
                </StaggerItem>
              </aside>

              <div className="min-w-0 max-w-3xl">
                <StaggerItem>
                  <p className="font-serif text-2xl leading-relaxed text-ink sm:text-[1.75rem]">{insight.introduction}</p>
                  <div className="my-12 bg-cream/60 p-7 sm:p-9">
                    <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest">At a glance</h2>
                    <ul className="mt-6 space-y-5">
                      {insight.takeaways.map((takeaway, index) => (
                        <li key={takeaway} className="flex gap-4 font-sans text-sm leading-7 text-ink/80">
                          <span aria-hidden className="font-serif text-lg text-forest">0{index + 1}</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>

                {insight.sections.map((section, index) => (
                  <AnimatedSection as="div" id={section.id} key={section.id} stagger amount={0.15} className="mb-12 scroll-mt-32 last:mb-0">
                    <StaggerItem>
                      <h2 className="font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl">{section.heading}</h2>
                    </StaggerItem>
                    {section.paragraphs.map((paragraph) => (
                      <StaggerItem key={paragraph}>
                        <p className="mt-6 font-sans text-[15px] leading-8 text-ink/80 sm:text-base">{paragraph}</p>
                      </StaggerItem>
                    ))}
                    {index === 0 && (
                      <StaggerItem>
                        <blockquote className="my-12 border-l-2 border-forest pl-7 font-serif text-2xl italic leading-relaxed text-forest sm:pl-9 sm:text-3xl">“{insight.quote}”</blockquote>
                      </StaggerItem>
                    )}
                  </AnimatedSection>
                ))}

              </div>
            </div>
          </Section>
        </article>

        <Section theme="light" stagger amount={0.1}>
          <div className="mx-auto max-w-7xl">
            <StaggerItem className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-forest">Keep reading</p>
                <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">More perspectives</h2>
              </div>
              <Link href="/insights#all-insights" className="inline-flex items-center gap-3 font-sans text-xs font-medium text-forest outline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-forest">All insights <ArrowUpRight aria-hidden className="h-4 w-4" /></Link>
            </StaggerItem>
            <InsightsGrid items={getRelatedInsights(insight)} />
          </div>
        </Section>
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
