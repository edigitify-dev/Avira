import { EditableText } from "@/components/cms/Editable";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

export function TeamSection() {
  return (
    <Section theme="light" stagger staggerChildren={0.12}>
      <div className="mx-auto max-w-2xl text-center">
        <StaggerItem>
          <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-ink/70"><EditableText id="components-TeamSection-1">{"THE TEAM"}</EditableText></p>
        </StaggerItem>
        <StaggerItem>
          <h2 className="mt-4 font-serif text-4xl italic leading-tight text-ink sm:text-5xl"><EditableText id="components-TeamSection-2">{"We are growing."}</EditableText></h2>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-5 font-sans text-base leading-7 text-ink/65"><EditableText id="components-TeamSection-3">{"Avira Law is building a team of lawyers who approach the law with depth, precision and sound judgment."}</EditableText></p>
        </StaggerItem>
      </div>
    </Section>
  );
}
