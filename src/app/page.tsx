import Image from "next/image";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StaggerItem } from "@/components/motion/StaggerItem";

const features = [
  {
    title: "Enter",
    body: "Sections fade and rise into place as they cross into view, timed with an expo-out ease for a settled, weighted feel.",
  },
  {
    title: "Exit",
    body: "Scroll back past a section and it reverses the same way it arrived — no snap, no jump cut.",
  },
  {
    title: "Stagger",
    body: "Grouped content (headings, copy, cards) reveals in sequence rather than all at once.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <AnimatedSection
        as="section"
        variant="fadeUp"
        className="flex min-h-screen w-full flex-col items-center justify-center gap-6 px-16 text-center"
      >
        <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={100} height={20} priority />
        <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
          Scroll to see enter and exit animations
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Every section below reveals on the way in and reverses on the way out.
        </p>
      </AnimatedSection>

      <AnimatedSection
        as="section"
        stagger
        staggerChildren={0.15}
        className="flex min-h-screen w-full flex-col items-center justify-center gap-12 px-16"
      >
        <StaggerItem>
          <h2 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Features
          </h2>
        </StaggerItem>
        <div className="grid w-full max-w-4xl gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <StaggerItem
              key={feature.title}
              className="rounded-2xl border border-black/8 bg-white p-6 dark:border-white/10 dark:bg-zinc-950"
            >
              <h3 className="mb-2 text-lg font-medium text-black dark:text-zinc-50">
                {feature.title}
              </h3>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{feature.body}</p>
            </StaggerItem>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection
        as="section"
        variant="scaleIn"
        className="flex min-h-screen w-full flex-col items-center justify-center gap-6 px-16 text-center"
      >
        <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Ready for the real UI
        </h2>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Send over the design and typography and this same pattern wraps every section.
        </p>
      </AnimatedSection>
    </div>
  );
}
