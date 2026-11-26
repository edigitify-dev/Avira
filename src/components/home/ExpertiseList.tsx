import { EditableText, EditableLink } from "@/components/cms/Editable";
import { Section } from "@/components/Section";
import { BrandWatermark } from "@/components/BrandWatermark";
import { StaggerItem } from "@/components/motion/StaggerItem";

const expertiseAreas = [
  "Litigation",
  "Arbitration",
  "White Collar, Investigations & Regulatory Enforcement",
  "Corporate & Commercial",
  "Corporate Governance",
  "Technology & Data Privacy",
  "Employment",
];

export function ExpertiseList() {
  return (
    <Section theme="dark" stagger staggerChildren={0.12} className="isolate flex flex-col gap-14 overflow-hidden">
      <BrandWatermark tone="sand" />
      <StaggerItem className="max-w-2xl">
        <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-cream/70"><EditableText id="components-home-ExpertiseList-1">{"Practice areas"}</EditableText></p>
        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl"><EditableText id="components-home-ExpertiseList-2">{"Our Expertise"}</EditableText></h2>
      </StaggerItem>

      <StaggerItem>
        <ul className="grid sm:grid-cols-2 sm:gap-x-16">
          {expertiseAreas.map((title, index) => (
            <li
              key={title}
              className="flex items-baseline gap-5 border-t border-cream/20 py-6"
            >
              <span className="font-sans text-xs text-cream/65"><EditableText id="components-home-ExpertiseList-3" dynamic>{String(index + 1).padStart(2, "0")}</EditableText></span>
              <span className="font-serif text-2xl text-cream"><EditableText id="components-home-ExpertiseList-4" dynamic>{title}</EditableText></span>
            </li>
          ))}
        </ul>
      </StaggerItem>

      <StaggerItem>
        <EditableLink contentId="components-home-ExpertiseList-5" nextLink
          href="/services"
          className="inline-flex items-center gap-2 bg-cream px-6 py-3 font-sans text-sm font-medium text-ink outline-offset-4 transition-colors hover:bg-ivory focus-visible:outline-2 focus-visible:outline-cream motion-reduce:transition-none"
        ><EditableText id="components-home-ExpertiseList-6">{"Explore our expertise"}</EditableText><span aria-hidden>→</span>
        </EditableLink>
      </StaggerItem>
    </Section>
  );
}
