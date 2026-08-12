"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { transitionPremium } from "@/lib/motion";
import type { PracticeArea } from "./practiceAreas";
import { ServiceDrawerBody } from "./ServiceDrawerBody";

type Props = {
  area: PracticeArea | null;
  open: boolean;
  onClose: () => void;
};

export function ServiceDrawer({ area, open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && area && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionPremium}
            onClick={onClose}
            className="fixed inset-0 z-60 bg-ink/70 backdrop-blur-sm"
          />
          <motion.aside
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={transitionPremium}
            className="fixed inset-y-0 right-0 z-70 flex w-full max-w-xl flex-col bg-ink text-cream sm:max-w-2xl"
          >
            <div className="flex items-center justify-between border-b border-cream/10 px-8 py-7 sm:px-12">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-cream/40">
                {area.index} — Practice area
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-cream/50 transition-colors hover:text-cream"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-10 sm:px-12">
              <ServiceDrawerBody key={area.slug} area={area} />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
