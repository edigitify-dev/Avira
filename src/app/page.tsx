import { Hero } from "@/components/Hero";
import { ImpactSection } from "@/components/ImpactSection";
import { AboutSection } from "@/components/AboutSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { TeamSection } from "@/components/TeamSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Hero />
      <ImpactSection />
      <AboutSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <TeamSection />
      <TestimonialSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
