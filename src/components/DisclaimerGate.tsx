"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { transitionPremiumFast } from "@/lib/motion";

const STORAGE_KEY = "avira-disclaimer-agreed";

/**
 * Bar Council of India requires this acknowledgement gate before a visitor
 * can view a law firm's site — content here counts as legal boilerplate,
 * not marketing copy, so it stays plain rather than brand-voiced.
 */
export function DisclaimerGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const handleAgree = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
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
                The Bar Council of India prohibits legal practitioners and advocates from
                engaging in any form of advertising and solicitation of work. By accessing this
                website, you acknowledge and agree that:
              </p>
              <p>
                (1) You are accessing this website solely to obtain information about Avira Law
                and the services it provides for your personal use and reference.
              </p>
              <p>
                (2) There has been no solicitation of work, advertisement or inducement by Avira
                Law or its constituents in any form.
              </p>
              <p>
                (3) The content on this website does not constitute opinion or legal advice and
                any information downloaded or obtained from this website does not create an
                attorney-client relationship between you and Avira Law.
              </p>
              <p>
                (4) All content and materials on this website are the intellectual property of
                Avira Law.
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                type="button"
                onClick={handleAgree}
                className="flex-1 border border-ink px-6 py-3 font-sans text-sm font-medium uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                Agree
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
