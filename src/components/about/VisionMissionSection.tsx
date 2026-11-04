"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { transitionPremium } from "@/lib/motion";

const pillars = [
  {
    index: "01",
    label: "Vision",
    statement:
      "To be the counsel businesses turn to first, not because we're the largest, but because we're the ones who actually understand what's at stake.",
  },
  {
    index: "02",
    label: "Mission",
    statement:
      "To deliver advice with the judgment of a partner and the responsiveness of an in-house team, clear, direct, and accountable to the outcome, every time.",
  },
];

export function VisionMissionSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Section
      theme="dark"
      topLine
      stagger
      staggerChildren={0.15}
      className="flex flex-col gap-12"
    >
      <StaggerItem>
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cream/50">
          What drives us
        </p>
      </StaggerItem>

      {/*
        Two panels that trade width on hover — the focused pillar widens,
        its statement brightens, and a hairline draws out beneath it.
        Equal-width and fully readable at rest, so nothing depends on hover to work.
      */}
      <StaggerItem>
        <div className="flex flex-col divide-y divide-cream/10 border-y border-cream/10 sm:flex-row sm:divide-x sm:divide-y-0">
          {pillars.map((pillar, i) => {
            const isOther = hovered !== null && hovered !== i;
            const isActive = hovered === i;

            return (
              <motion.div
                key={pillar.label}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                animate={{ flexGrow: isActive ? 1.35 : isOther ? 0.75 : 1 }}
                transition={transitionPremium}
                className="flex flex-col justify-between gap-10 py-12 sm:px-10 sm:py-16"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-sans text-xs text-cream/35">
                    {pillar.index}
                  </span>
                  <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">
                    {pillar.label}
                  </span>
                </div>

                <motion.p
                  animate={{ opacity: isOther ? 0.4 : 1 }}
                  transition={transitionPremium}
                  className="font-serif text-xl leading-[1.4] text-cream sm:text-2xl lg:text-[1.75rem]"
                >
                  {pillar.statement}
                </motion.p>

                <motion.span
                  animate={{ scaleX: isActive ? 1 : 0.25 }}
                  transition={transitionPremium}
                  className="h-px w-full origin-left bg-rust"
                />
              </motion.div>
            );
          })}
        </div>
      </StaggerItem>
    </Section>
  );
}
