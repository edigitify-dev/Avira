import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { OurApproach } from "@/components/about/OurApproach";
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
    "Avira stands for strength and resolve - qualities reflected in clear thinking, sound judgment and purposeful advocacy.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1">
      <AboutHero />
      <OurApproach />
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
