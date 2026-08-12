"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { transitionPremium } from "@/lib/motion";

const milestones = [
  {
    year: "2016",
    title: "Avira is founded",
    body: "Opened as a two-person advisory practice in New Delhi, built around corporate counsel.",
  },
  {
    year: "2018",
    title: "Litigation practice launches",
    body: "Dispute resolution added alongside advisory work, led by our first outside hire.",
  },
  {
    year: "2020",
    title: "Pan-India presence",
    body: "Crossed 25 attorneys and opened standing relationships across every major commercial hub.",
  },
  {
    year: "2022",
    title: "Cross-border reach",
    body: "Extended active practice into 15+ countries for clients with international operations.",
  },
  {
    year: "2024",
    title: "Industry recognition",
    body: "Earned 12 honors and awards across corporate advisory and dispute resolution.",
  },
  {
    year: "2026",
    title: "Today",
    body: "A bench of 50+ attorneys, still run on the same principle we started with.",
  },
];

export function JourneySection() {
  const [active, setActive] = useState(0);
  const current = milestones[active];

  const step = (delta: number) =>
    setActive((i) => (i + delta + milestones.length) % milestones.length);

  return (
    <Section theme="white" topLine stagger staggerChildren={0.12} className="flex flex-col gap-14">
      <StaggerItem className="max-w-2xl">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">
          Our journey
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          A decade, in milestones
        </h2>
        <p className="mt-5 font-sans text-base leading-7 text-ink/65">
          The short version of how a two-person practice became a pan-India bench without losing
          the parts that mattered.
        </p>
      </StaggerItem>

      <StaggerItem>
        {/* Year selector ribbon */}
        <div className="flex flex-wrap items-baseline gap-x-9 gap-y-3 border-b border-ink/10 pb-6">
          {milestones.map((m, i) => (
            <button
              key={m.year}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className="group relative pb-3 font-sans text-sm font-medium tracking-wide transition-colors"
            >
              <span className={i === active ? "text-ink" : "text-ink/35 group-hover:text-ink/60"}>
                {m.year}
              </span>
              <span
                className={`absolute inset-x-0 -bottom-px h-px bg-rust transition-transform duration-500 ease-out ${
                  i === active ? "scale-x-100" : "scale-x-0"
                }`}
                aria-hidden
              />
            </button>
          ))}
        </div>

        {/* Showcase */}
        <div className="relative mt-4 min-h-64 sm:min-h-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={transitionPremium}
              className="absolute inset-0 grid gap-6 pt-10 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-14"
            >
              <p className="font-serif text-[5.5rem] leading-none text-ink sm:text-[7rem]">
                {current.year}
              </p>
              <div className="max-w-lg border-t border-ink/10 pt-6 sm:border-t-0 sm:border-l sm:border-ink/10 sm:pl-14 sm:pt-0">
                <p className="font-serif text-2xl text-ink sm:text-3xl">{current.title}</p>
                <p className="mt-3 font-sans text-base leading-7 text-ink/60">{current.body}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-6">
          <p className="font-sans text-xs uppercase tracking-[0.15em] text-ink/40">
            {String(active + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous milestone"
              className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink/60 transition-colors hover:border-ink hover:text-ink"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next milestone"
              className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink/60 transition-colors hover:border-ink hover:text-ink"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </StaggerItem>
    </Section>
  );
}
