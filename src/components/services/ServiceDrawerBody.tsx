"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { transitionPremium } from "@/lib/motion";
import type { PracticeArea } from "./practiceAreas";

/** Keyed by slug from the parent drawer, so switching areas remounts this and resets the accordion. */
export function ServiceDrawerBody({ area }: { area: PracticeArea }) {
  const [highlightsOpen, setHighlightsOpen] = useState(false);

  return (
    <div>
      <h2 className="font-serif text-3xl leading-tight text-cream sm:text-4xl">{area.title}</h2>

      <div className="mt-6 flex flex-col gap-4">
        {area.paragraphs.map((paragraph, i) => (
          <p key={i} className="font-sans text-base leading-7 text-cream/70">
            {paragraph}
          </p>
        ))}
      </div>

      {area.capabilities && (
        <ul className="mt-8 flex flex-col gap-3">
          {area.capabilities.map((capability) => (
            <li key={capability} className="flex items-start gap-3 font-sans text-sm leading-6 text-cream/70">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cream/50" aria-hidden />
              {capability}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10">
        <button
          type="button"
          onClick={() => setHighlightsOpen((v) => !v)}
          aria-expanded={highlightsOpen}
          className="flex w-full items-center justify-between border-t border-b border-cream/10 py-5 text-left"
        >
          <span className="font-serif text-lg text-cream">Recent work highlights</span>
          <motion.span animate={{ rotate: highlightsOpen ? 180 : 0 }} transition={transitionPremium}>
            <ChevronDown className="h-5 w-5 text-cream/40" strokeWidth={1.5} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {highlightsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={transitionPremium}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-8 pb-2 pt-8">
                {area.highlightGroups.map((group, gi) => (
                  <div key={gi}>
                    {group.heading && (
                      <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/50">
                        {group.heading}
                      </p>
                    )}
                    <ul className={`flex flex-col divide-y divide-cream/10 ${group.heading ? "mt-4" : ""}`}>
                      {group.items.map((item, ii) => (
                        <li key={ii} className="flex gap-3 py-3.5">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cream/40" aria-hidden />
                          <span className="font-sans text-sm leading-6 text-cream/65">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
