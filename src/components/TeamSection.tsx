import Image from "next/image";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

const team = [
  {
    name: "Arjun Malhotra",
    role: "Managing Partner",
    photo: "https://images.pexels.com/photos/8112112/pexels-photo-8112112.jpeg",
  },
  {
    name: "Ananya Rao",
    role: "Head of Corporate",
    photo: "https://images.pexels.com/photos/4342352/pexels-photo-4342352.jpeg",
  },
  {
    name: "Vikram Sethi",
    role: "Head of Litigation",
    photo: "https://images.pexels.com/photos/29856511/pexels-photo-29856511.jpeg",
  },
  {
    name: "Meera Kapoor",
    role: "Senior Associate",
    photo: "https://images.pexels.com/photos/30004322/pexels-photo-30004322.jpeg",
  },
];

export function TeamSection() {
  return (
    <Section theme="light" stagger staggerChildren={0.12} className="flex flex-col items-center gap-16">
      <StaggerItem className="max-w-xl text-center">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">Our team</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          The people behind Avira
        </h2>
        <p className="mt-5 font-sans text-base leading-7 text-ink/70">
          A small bench of specialists, not a rotating cast — every matter is led by someone who
          knows it end to end.
        </p>
      </StaggerItem>

      <div className="grid w-full grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
        {team.map((member) => (
          <StaggerItem key={member.name} className="flex flex-col items-center text-center">
            <div className="relative aspect-square w-full max-w-[11rem] overflow-hidden rounded-2xl">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                sizes="(min-width: 640px) 25vw, 45vw"
                className="object-cover grayscale"
              />
            </div>
            <p className="mt-5 font-serif text-lg text-ink">{member.name}</p>
            <p className="mt-1 font-sans text-xs font-medium uppercase tracking-[0.15em] text-rust">
              {member.role}
            </p>
          </StaggerItem>
        ))}
      </div>
    </Section>
  );
}
