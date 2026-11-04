import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { InsightsGrid } from "@/components/insights/InsightsGrid";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { insights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights | Avira Law",
  description: "A closer look at the decisions, developments and questions shaping the law",
};

export default function InsightsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Section theme="light" stagger staggerChildren={0.12} className="flex flex-col gap-14">
        <StaggerItem className="max-w-2xl pt-8">
          <h1 className="font-serif text-5xl leading-[1.05] text-ink sm:text-6xl">Insights</h1>
          <p className="mt-6 font-serif text-xl italic leading-relaxed text-ink/65">
            A closer look at the decisions, developments and questions shaping the law
          </p>
        </StaggerItem>

        <StaggerItem>
          <InsightsGrid items={insights} />
        </StaggerItem>
      </Section>
      <CtaSection />
      <Footer />
    </div>
  );
}
