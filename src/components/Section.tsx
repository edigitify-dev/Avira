import type { ComponentProps } from "react";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

const themes = {
  dark: "bg-ink text-cream",
  light: "bg-cream text-ink",
  slate: "bg-slate text-cream",
  forest: "bg-forest text-cream",
} as const;

type SectionProps = {
  theme?: keyof typeof themes;
  className?: string;
} & Omit<ComponentProps<typeof AnimatedSection>, "className" | "as">;

/**
 * Full-bleed section shell: picks one of the brand's dark/light backgrounds
 * and wraps content in the shared enter/exit reveal. Alternate `theme` per
 * section (dark, light, dark, ...) to get the brand board's section-wise
 * contrast rather than one flat page background.
 */
export function Section({ theme = "light", className = "", ...motionProps }: SectionProps) {
  return (
    <AnimatedSection
      as="section"
      className={`px-6 py-24 sm:px-16 sm:py-32 ${themes[theme]} ${className}`}
      {...motionProps}
    />
  );
}
