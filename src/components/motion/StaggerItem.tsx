"use client";

import { motion } from "framer-motion";
import { motionVariants, type MotionVariantName } from "@/lib/motion";

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
  variant?: MotionVariantName;
};

/** Use as a direct child of `<AnimatedSection stagger>` — inherits its enter/exit timing. */
export function StaggerItem({ children, className, variant = "fadeUp" }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={motionVariants[variant]}>
      {children}
    </motion.div>
  );
}
