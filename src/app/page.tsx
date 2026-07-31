import { Hero } from "@/components/Hero";
import { ImpactSection } from "@/components/ImpactSection";
import { AboutSection } from "@/components/AboutSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Hero />
      <ImpactSection />
      <AboutSection />
    </div>
  );
}
