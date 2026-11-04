import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { formatInsightDate, getReadingTime, type Insight } from "@/lib/insights";

export function InsightsGrid({ items }: { items: Insight[] }) {
  if (items.length === 0) {
    return (
      <p className="font-sans text-base leading-7 text-ink/65">
        New insights will be published here soon.
      </p>
    );
  }

  return (
    <AnimatedSection as="div" stagger amount={0.1} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <StaggerItem key={item.slug} className="h-full">
          <article className="h-full">
            <Link
              href={`/insights/${item.slug}`}
              className="group flex h-full flex-col bg-paper p-7 outline-offset-4 transition-colors hover:bg-forest hover:text-cream focus-visible:outline-2 focus-visible:outline-forest motion-reduce:transition-none sm:p-9"
            >
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-forest group-hover:text-cream/80 sm:text-xs">
                {item.category}
              </p>
              <h3 className="mt-7 font-serif text-[1.7rem] leading-[1.2] tracking-tight sm:text-3xl">{item.title}</h3>
              <p className="mb-10 mt-5 font-sans text-sm leading-7 text-ink/70 group-hover:text-cream/80">{item.summary}</p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 font-sans text-[11px] text-ink/65 group-hover:text-cream/75">
                <time dateTime={item.date}>{formatInsightDate(item.date)}</time>
                <span>{getReadingTime(item)} min read</span>
              </div>
              <span className="mt-6 inline-flex items-center justify-between gap-3 font-sans text-xs font-semibold">
                Read insight <ArrowUpRight aria-hidden className="h-5 w-5" strokeWidth={1.5} />
              </span>
            </Link>
          </article>
        </StaggerItem>
      ))}
    </AnimatedSection>
  );
}
