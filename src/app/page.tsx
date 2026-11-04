import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ExpertiseList } from "@/components/home/ExpertiseList";
import { VikramCard } from "@/components/home/VikramCard";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 overflow-x-clip">
      <Hero />
      <AboutSection />
      <ExpertiseList />
      {/* <VikramCard /> */}
      <InsightsPreview />
      <CtaSection />
      <Footer />
    </div>
  );
}
