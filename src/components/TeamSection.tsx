import Image from "next/image";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

const team = [
  {
    name: "Arjun Malhotra",
    role: "Managing Partner",
    focus: "Corporate & M&A",
    photo: "https://images.pexels.com/photos/8112112/pexels-photo-8112112.jpeg",
  },
  {
    name: "Ananya Rao",
    role: "Head of Corporate",
    focus: "Governance & compliance",
    photo: "https://images.pexels.com/photos/4342352/pexels-photo-4342352.jpeg",
  },
  {
    name: "Vikram Sethi",
    role: "Head of Litigation",
    focus: "Dispute resolution",
    photo: "https://images.pexels.com/photos/29856511/pexels-photo-29856511.jpeg",
  },
  {
    name: "Meera Kapoor",
    role: "Senior Associate",
    focus: "Regulatory advisory",
    photo: "https://images.pexels.com/photos/30004322/pexels-photo-30004322.jpeg",
  },
];

export function TeamSection() {
  return (
    <Section theme="light" topLine stagger staggerChildren={0.12} className="flex flex-col items-center gap-16">
      <StaggerItem className="max-w-xl text-center">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">Our team</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          The people behind Avira
        </h2>
        <p className="mt-5 font-sans text-base leading-7 text-ink/65">
          A small bench of specialists, not a rotating cast — every matter is led by someone who
          knows it end to end.
        </p>
      </StaggerItem>

      <div className="grid w-full grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {team.map((member) => (
          <StaggerItem key={member.name} className="group relative aspect-3/4 overflow-hidden">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 25vw, 50vw"
              className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col p-5 sm:p-6">
              <span className="h-px w-8 bg-rust transition-all duration-500 group-hover:w-12" />
              <p className="mt-3 font-serif text-lg text-cream sm:text-xl">{member.name}</p>
              <p className="mt-1 font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/65">
                {member.role}
              </p>
              <p className="mt-0 max-h-0 overflow-hidden font-sans text-xs leading-5 text-cream/50 opacity-0 transition-all duration-500 group-hover:mt-2 group-hover:max-h-8 group-hover:opacity-100">
                {member.focus}
              </p>
            </div>
          </StaggerItem>
        ))}
      </div>
    </Section>
  );
}
