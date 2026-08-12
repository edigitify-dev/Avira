"use client";

import type { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { PracticeArea } from "./practiceAreas";
import { practiceAreaIcons } from "./icons";

type Props = {
  area: PracticeArea;
  onOpen: () => void;
  className?: string;
};

/** Card with a cursor-following radial glow — the Linear/Stripe "spotlight" recipe, in-brand. */
export function PracticeAreaCard({ area, onOpen, className = "" }: Props) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const Icon = practiceAreaIcons[area.slug];
  const matterCount = area.highlightGroups.reduce((sum, group) => sum + group.items.length, 0);

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const glow = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(231,225,214,0.10), transparent 70%)`;

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      className={`group relative flex h-full w-full flex-col justify-between overflow-hidden bg-ink p-8 text-left sm:p-9 ${className}`}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow }}
      />

      <div className="relative flex items-start justify-between">
        <span className="font-sans text-xs text-cream/35">{area.index}</span>
        <Icon
          className="h-6 w-6 text-cream/40 transition-colors duration-300 group-hover:text-rust"
          strokeWidth={1.5}
        />
      </div>

      <div className="relative mt-16">
        <p className="font-serif text-2xl leading-snug text-cream sm:text-[1.75rem]">{area.title}</p>
        <p className="mt-3 max-w-sm font-sans text-sm leading-6 text-cream/50">{area.teaser}</p>
      </div>

      <div className="relative mt-10 flex items-center justify-between border-t border-cream/10 pt-5">
        <span className="font-sans text-xs uppercase tracking-[0.15em] text-cream/35">
          {matterCount} matters
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-cream/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cream"
          strokeWidth={1.5}
        />
      </div>
    </button>
  );
}
