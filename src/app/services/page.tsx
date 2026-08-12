import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services | Avira Law",
  description:
    "Avira's competition law practice — litigation & enforcement, merger control, counselling & compliance, policy & advocacy, and pro bono work before the CCI, NCLAT, and Indian courts.",
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
