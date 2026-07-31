"use client";

import { motion, type Variants } from "framer-motion";
import { transitionPremiumFast } from "@/lib/motion";

const variants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: transitionPremiumFast },
};

/** Draws left-to-right. No own trigger — inherits hidden/visible from the nearest animated ancestor (e.g. a <StaggerItem>). */
export function UnderlineDraw({ className }: { className?: string }) {
  return <motion.span variants={variants} className={`block origin-left ${className ?? ""}`} />;
}
