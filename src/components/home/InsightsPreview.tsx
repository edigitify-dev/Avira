import Link from "next/link";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { InsightsGrid } from "@/components/insights/InsightsGrid";
import { getLatestInsights } from "@/lib/insights";

export function InsightsPreview() {
  return (
    <Section theme="light" stagger staggerChildren={0.12} className="flex flex-col gap-14">
      <StaggerItem className="max-w-2xl">
        <h2 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">Insights</h2>
        <p className="mt-5 font-serif text-xl italic leading-relaxed text-ink/75">
          A closer look at the decisions, developments and questions shaping the law.
        </p>
      </StaggerItem>

      <StaggerItem>
        <InsightsGrid items={getLatestInsights(3)} />
      </StaggerItem>

      <StaggerItem>
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 border border-forest/35 px-6 py-3 font-sans text-sm font-medium text-forest outline-offset-4 transition-colors hover:border-forest hover:bg-forest hover:text-cream focus-visible:outline-2 focus-visible:outline-forest motion-reduce:transition-none"
        >
          View all Insights
          <span aria-hidden>→</span>
        </Link>
      </StaggerItem>
    </Section>
  );
}
