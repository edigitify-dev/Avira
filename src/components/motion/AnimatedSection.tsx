"use client";

import { motion, type Variants } from "framer-motion";
import { motionVariants, type MotionVariantName, staggerContainer } from "@/lib/motion";

const tagMap = {
  section: motion.section,
  div: motion.div,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  aside: motion.aside,
  li: motion.li,
} as const;

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Element rendered — defaults to `section`. */
  as?: keyof typeof tagMap;
  /** Which entrance/exit treatment to use. */
  variant?: MotionVariantName;
  /** Seconds to hold before the animation starts. */
  delay?: number;
  /** How much of the section must be visible before it triggers (0–1). */
  amount?: number;
  /** Play the animation only the first time, instead of every scroll pass. */
  once?: boolean;
  /** Stagger direct children (pair with <StaggerItem>) instead of animating as one block. */
  stagger?: boolean;
  /** Seconds between each staggered child. */
  staggerChildren?: number;
};

/**
 * Scroll-driven reveal wrapper: animates in on enter and — because
 * `viewport.once` defaults to false — automatically reverses back to the
 * hidden state on exit, so every section gets a matching enter/exit.
 */
export function AnimatedSection({
  children,
  className,
  id,
  as = "section",
  variant = "fadeUp",
  delay = 0,
  amount = 0.3,
  once = false,
  stagger = false,
  staggerChildren = 0.12,
}: AnimatedSectionProps) {
  const Component = tagMap[as];
  const base = motionVariants[variant];

  const variants: Variants = stagger
    ? staggerContainer(staggerChildren, delay)
    : {
        hidden: base.hidden,
        visible: {
          ...base.visible,
          transition: {
            ...(base.visible as { transition?: object }).transition,
            delay,
          },
        },
      };

  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </Component>
  );
}
