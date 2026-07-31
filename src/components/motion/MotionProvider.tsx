"use client";

import { MotionConfig } from "framer-motion";

/** Forces every animation in the app to respect the user's reduced-motion setting. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
