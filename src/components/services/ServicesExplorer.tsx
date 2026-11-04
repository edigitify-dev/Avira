"use client";

import { useState } from "react";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { practiceAreas } from "./practiceAreas";
import { PracticeAreaCard } from "./PracticeAreaCard";
import { ServiceDrawer } from "./ServiceDrawer";

const FIRM_PROFILE_URL = "/avira-firm-profile.pdf";

export function ServicesExplorer() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const selectedArea = practiceAreas.find((a) => a.slug === selectedSlug) ?? null;

  function openArea(slug: string) {
    setSelectedSlug(slug);
    setDrawerOpen(true);
  }

  return (
    <Section theme="dark" topLine stagger staggerChildren={0.15} className="flex flex-col gap-14">
      <StaggerItem className="max-w-2xl">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cream/60">
          Practice areas
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Where we practice</h2>
        <p className="mt-5 font-sans text-base leading-7 text-cream/65">
          Five disciplines, one team. Select an area for the full picture — approach,
          capabilities, and recent work.
        </p>
      </StaggerItem>

      <StaggerItem>
        <div className="grid grid-cols-1 gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, i) => (
            <PracticeAreaCard
              key={area.slug}
              area={area}
              onOpen={() => openArea(area.slug)}
              className={i === practiceAreas.length - 1 ? "lg:col-span-2" : ""}
            />
          ))}
        </div>
      </StaggerItem>

      <StaggerItem className="flex flex-col items-start gap-4">
        <a
          href={FIRM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-cream/25 px-6 py-3 font-sans text-sm font-medium text-cream transition-colors hover:bg-cream hover:text-ink"
        >
          View the full firm profile
          <span aria-hidden>→</span>
        </a>
        <p className="font-sans text-sm text-cream/55">
          To view or download our firm profile, please click{" "}
          <a
            href={FIRM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream underline underline-offset-4 transition-colors hover:text-rust"
          >
            here
          </a>
          .
        </p>
      </StaggerItem>

      <ServiceDrawer area={selectedArea} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </Section>
  );
}
