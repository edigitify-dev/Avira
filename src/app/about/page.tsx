import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { VisionMissionSection } from "@/components/about/VisionMissionSection";
import { OurStorySection } from "@/components/about/OurStorySection";
import { ValuesSection } from "@/components/about/ValuesSection";
import { JourneySection } from "@/components/about/JourneySection";
import { VikramProfile } from "@/components/about/VikramProfile";
import { TeamSection } from "@/components/TeamSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | Avira Law",
  description:
    "Avira is a boutique legal practice built on judgment, rigor, and direct partner access — founded 2016, now a pan-India bench with cross-border reach.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1">
      <AboutHero />
      <VisionMissionSection />
      <OurStorySection />
      <ValuesSection />
      <JourneySection />
      <VikramProfile />
      <TeamSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
