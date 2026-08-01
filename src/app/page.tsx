import { Hero } from "@/components/Hero";
import { ImpactSection } from "@/components/ImpactSection";
import { AboutSection } from "@/components/AboutSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { ProcessSection } from "@/components/ProcessSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Hero />
      <ImpactSection />
      <AboutSection />
      <WhyChooseUsSection />
      <ProcessSection />
    </div>
  );
}
