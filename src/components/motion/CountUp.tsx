"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

type CountUpProps = {
  value: number;
  suffix?: string;
  className?: string;
};

/** Counts up to `value` when scrolled into view, and resets when scrolled away — mirrors the enter/exit convention used everywhere else. */
export function CountUp({ value, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1600, bounce: 0 });
  const isInView = useInView(ref, { once: false, amount: 0.6 });

  useEffect(() => {
    motionValue.set(isInView ? value : 0);
  }, [isInView, motionValue, value]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
      }),
    [springValue, suffix],
  );

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
