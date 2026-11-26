import { EditableText, EditableLink } from "@/components/cms/Editable";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { InsightsGrid } from "@/components/insights/InsightsGrid";
import { getPublishedInsights } from "@/lib/cms/insights";

export async function InsightsPreview() {
  const insights = await getPublishedInsights();
  return (
    <Section theme="light" stagger staggerChildren={0.12} className="flex flex-col gap-14">
      <StaggerItem className="max-w-2xl">
        <h2 className="font-serif text-4xl leading-tight text-ink sm:text-5xl"><EditableText id="components-home-InsightsPreview-1">{"Insights"}</EditableText></h2>
        <p className="mt-5 font-serif text-xl italic leading-relaxed text-ink/75"><EditableText id="components-home-InsightsPreview-2">{"A closer look at the decisions, developments and questions shaping the law."}</EditableText></p>
      </StaggerItem>

      <StaggerItem>
        <InsightsGrid items={insights.slice(0, 2)} />
      </StaggerItem>

      <StaggerItem>
        <EditableLink contentId="components-home-InsightsPreview-3" nextLink
          href="/insights"
          className="inline-flex items-center gap-2 border border-forest/35 px-6 py-3 font-sans text-sm font-medium text-forest outline-offset-4 transition-colors hover:border-forest hover:bg-forest hover:text-cream focus-visible:outline-2 focus-visible:outline-forest motion-reduce:transition-none"
        ><EditableText id="components-home-InsightsPreview-4">{"View all Insights"}</EditableText><span aria-hidden>→</span>
        </EditableLink>
      </StaggerItem>
    </Section>
  );
}
