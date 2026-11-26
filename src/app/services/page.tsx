import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Expertise | Avira Law",
  description:
    "Avira Law advises on litigation, arbitration, corporate and commercial, white collar, investigations and regulatory enforcement, corporate governance, technology and data privacy, and employment matters.",
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
