import type { ComponentProps } from "react";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

const themes = {
  dark:   { base: "bg-ink text-cream",    line: "bg-cream/10" },
  light:  { base: "bg-cream text-ink",    line: "bg-ink/10"   },
  white:  { base: "bg-paper text-ink",    line: "bg-ink/10"   },
  ivory:  { base: "bg-ivory text-ink",    line: "bg-ink/10"   },
  slate:  { base: "bg-slate text-cream",  line: "bg-cream/10" },
  forest: { base: "bg-forest text-cream", line: "bg-cream/10" },
  rust:   { base: "bg-rust text-cream",   line: "bg-cream/10" },
} as const;

const paddings = {
  slim:     "section-gutter px-6 py-16 sm:px-16 sm:py-24",
  default:  "section-gutter px-6 py-24 sm:px-16 sm:py-32",
  spacious: "section-gutter px-6 py-32 sm:px-16 sm:py-44",
  tall:     "section-gutter px-6 py-40 sm:px-16 sm:py-56",
} as const;

type SectionProps = {
  theme?: keyof typeof themes;
  /** Disable scroll reveals for sections that should stay visible. */
  animated?: boolean;
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
  animated = true,
  size = "default",
  topLine = false,
  className = "",
  children,
  ...motionProps
}: SectionProps) {
  const t = themes[theme];
  const sectionClassName = `relative ${paddings[size]} ${t.base} ${className}`;
  const content = (
    <>
      {topLine && (
        <div className={`section-gutter-inset absolute top-0 h-px ${t.line}`} />
      )}
      {children}
    </>
  );

  if (!animated) {
    return (
      <section id={motionProps.id} className={sectionClassName}>
        {content}
      </section>
    );
  }

  return (
    <AnimatedSection
      as="section"
      className={sectionClassName}
      {...motionProps}
    >
      {content}
    </AnimatedSection>
  );
}
