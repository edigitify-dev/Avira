import { EditableText, EditableLink } from "@/components/cms/Editable";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { GeometryPattern } from "@/components/home/GeometryPattern";

export function AboutSection() {
  return (
    <Section
      theme="ivory"
      stagger
      staggerChildren={0.15}
      className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24"
    >
      <StaggerItem className="max-w-lg">
        <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-forest"><EditableText id="components-AboutSection-1">{"About Avira"}</EditableText></p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl"><EditableText id="components-AboutSection-2">{"Who We Are"}</EditableText></h2>
        <p className="mt-6 font-sans text-base leading-7 text-ink/75"><EditableText id="components-AboutSection-3">{"Avira Law advises and represents clients in India and internationally, with a practice spanning contentious, transactional and advisory work. We engage with questions of law and regulation that shape commercial activity, business relationships and institutional decision-making."}</EditableText></p>
        <p className="mt-5 font-sans text-base leading-7 text-ink/75"><EditableText id="components-AboutSection-4">{"Our outlook is shaped by an appreciation of the evolving relationship between law, business and society. We bring a breadth of perspective to our practice and place particular value on independent thinking, clarity in advice and conviction in advocacy."}</EditableText></p>

        <EditableLink contentId="components-AboutSection-5" nextLink
          href="/about"
          className="mt-10 inline-flex items-center gap-2 bg-forest px-8 py-4 font-sans text-sm font-medium uppercase tracking-widest text-cream outline-offset-4 transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-forest motion-reduce:transition-none"
        ><EditableText id="components-AboutSection-6">{"Learn More"}</EditableText><span aria-hidden>→</span>
        </EditableLink>
      </StaggerItem>

      <StaggerItem variant="scaleIn" className="relative flex items-center justify-center">
        <div className="flex aspect-square w-full max-w-lg items-center justify-center text-forest">
          <GeometryPattern variant="balance" />
        </div>
      </StaggerItem>
    </Section>
  );
}
