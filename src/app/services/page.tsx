import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Expertise | Avira Law",
  description:
    "Avira Law advises on corporate and commercial, corporate governance, litigation, arbitration, white collar, investigations and employment matters.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col flex-1">
      <ServicesHero />
      <ServicesExplorer />
      <CtaSection />
      <Footer />
    </div>
  );
}
