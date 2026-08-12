import type { ComponentProps } from "react";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

const themes = {
  dark:   { base: "bg-ink text-cream",    line: "bg-cream/10" },
  light:  { base: "bg-cream text-ink",    line: "bg-ink/10"   },
  white:  { base: "bg-paper text-ink",    line: "bg-ink/10"   },
  slate:  { base: "bg-slate text-cream",  line: "bg-cream/10" },
  forest: { base: "bg-forest text-cream", line: "bg-cream/10" },
  rust:   { base: "bg-rust text-cream",   line: "bg-cream/10" },
} as const;

const paddings = {
  slim:     "px-6 py-16 sm:px-16 sm:py-24",
  default:  "px-6 py-24 sm:px-16 sm:py-32",
  spacious: "px-6 py-32 sm:px-16 sm:py-44",
  tall:     "px-6 py-40 sm:px-16 sm:py-56",
} as const;

type SectionProps = {
  theme?: keyof typeof themes;
  /** Controls vertical padding scale. Defaults to `default`. */
  size?: keyof typeof paddings;
  /**
   * Draws a 1-px hairline flush with the top of the section, inset by
   * the section's horizontal padding — editorial segmentation without an <hr>.
   */
  topLine?: boolean;
  className?: string;
  children?: React.ReactNode;
} & Omit<ComponentProps<typeof AnimatedSection>, "className" | "as" | "children">;

export function Section({
  theme = "light",
  size = "default",
  topLine = false,
  className = "",
  children,
  ...motionProps
}: SectionProps) {
  const t = themes[theme];
  return (
    <AnimatedSection
      as="section"
      className={`relative ${paddings[size]} ${t.base} ${className}`}
      {...motionProps}
    >
      {topLine && (
        <div className={`absolute inset-x-6 top-0 h-px sm:inset-x-16 ${t.line}`} />
      )}
      {children}
    </AnimatedSection>
  );
}
