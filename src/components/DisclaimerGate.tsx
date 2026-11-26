"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { transitionPremiumFast } from "@/lib/motion";

/**
 * Bar Council of India requires this acknowledgement gate before a visitor
 * can view a law firm's site — content here counts as legal boilerplate,
 * not marketing copy, so it stays plain rather than brand-voiced.
 */
export function DisclaimerGate() {
  // Ask again on each full page load; the root layout preserves this state
  // while the visitor navigates between pages after agreeing.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const handleAgree = () => {
    setVisible(false);
  };

  const handleDecline = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transitionPremiumFast}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 px-6 py-10 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={transitionPremiumFast}
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto bg-paper p-8 sm:p-10"
          >
            <h2 className="font-serif text-2xl text-ink sm:text-3xl">Disclaimer</h2>

            <div className="mt-6 space-y-4 font-sans text-sm leading-6 text-ink/70">
              <p>
                The rules of the Bar Council of India prohibit law firms from
                soliciting work or advertising in any manner. By clicking on
                &apos;I AGREE&apos;, the user acknowledges that:
              </p>
              <ul className="list-disc space-y-4 pl-5">
                <li>
                  The user wishes to gain more information about Avira Law, its
                  practice areas and its attorneys, for his/her own information
                  and use;
                </li>
                <li>
                  The information is made available/provided to the user only on
                  his/her specific request and any information obtained or
                  material downloaded from this website is completely at the
                  user&apos;s volition and any transmission, receipt or use of
                  this site is not intended to, and will not, create any
                  lawyer-client relationship; and
                </li>
                <li>
                  None of the information contained on the website is in the
                  nature of a legal opinion or otherwise amounts to any legal
                  advice.
                </li>
              </ul>
              <p>
                Avira Law is not liable for any consequence of any action taken
                by the user relying on material/information provided under this
                website. In cases where the user has any legal issues, he/she in
                all cases must seek independent legal advice.
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                type="button"
                onClick={handleAgree}
                className="flex-1 border border-ink px-6 py-3 font-sans text-sm font-medium uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                I AGREE
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="flex-1 border border-ink px-6 py-3 font-sans text-sm font-medium uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                Decline
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
