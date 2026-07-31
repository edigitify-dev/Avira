import type { Transition, Variants } from "framer-motion";

/** Expo-out — the "premium" scroll-reveal curve (Linear/Vercel-style), never bouncy. */
export const easePremium = [0.16, 1, 0.3, 1] as const;

export const transitionPremium: Transition = {
  duration: 0.8,
  ease: easePremium,
};

export const transitionPremiumFast: Transition = {
  duration: 0.5,
  ease: easePremium,
};

/** Distance (px) content travels in on enter / travels out on exit. */
const DISTANCE = 32;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: DISTANCE },
  visible: { opacity: 1, y: 0, transition: transitionPremium },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -DISTANCE },
  visible: { opacity: 1, y: 0, transition: transitionPremium },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitionPremium },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transitionPremium },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -DISTANCE },
  visible: { opacity: 1, x: 0, transition: transitionPremium },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: DISTANCE },
  visible: { opacity: 1, x: 0, transition: transitionPremium },
};

export const motionVariants = {
  fadeUp,
  fadeDown,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
} as const;

export type MotionVariantName = keyof typeof motionVariants;

/** Wrap around fadeUp/fadeIn etc. children to stagger their entrance. */
export const staggerContainer = (staggerChildren = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});
