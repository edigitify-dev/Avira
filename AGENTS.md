<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Design conventions

## Section headings

Do not put a horizontal rule (`<hr>` / `border-b`) under section head labels (e.g. "Features", "Pricing", eyebrow/section titles). Let spacing and typography separate sections instead of a divider line.

## Avoid the generic "AI-generated" look

Do not default to these unless the supplied UI/typography spec calls for them:

- Purple-to-blue (or pink-to-purple) gradient backgrounds, blobs, or gradient text
- `shadow-lg`/`shadow-xl` + `rounded-xl` slapped on every card by default
- Centered hero with emoji icons in circular gradient badges
- Generic Inter-only type scale with no distinct heading personality
- Glassmorphism (`backdrop-blur` + translucent white panels) as a default treatment
- Overuse of `animate-pulse`/bounce micro-animations on load

Wait for the actual UI and typography spec before styling components — treat the above as defaults to actively avoid, not fill in ahead of time.

## Scroll animations (Framer Motion)

Every top-level section must reveal on enter and reverse on exit — use `<AnimatedSection>` from `src/components/motion/AnimatedSection.tsx`, never raw `motion.section` inline.

- Timing: `easePremium` = `[0.16, 1, 0.3, 1]` (expo-out), 0.8s. No spring/bounce, no elastic overshoot — that reads as a toy, not premium.
- Distance: subtle (24–32px translate, or 0.96 scale). Big travel distances feel cheap.
- `viewport.once` stays `false` (the default) so leaving the viewport reverses back to hidden — that reversal *is* the exit animation. Don't set `once: true` unless a section should only ever play once (e.g. a one-time success state).
- Grouped content (heading + copy + cards) uses `stagger` + `<StaggerItem>` children instead of animating the whole block as one unit — sequenced reveals read as premium, simultaneous ones read as default.
- `MotionConfig reducedMotion="user"` is wired at the root layout — don't bypass it with raw CSS transitions that ignore `prefers-reduced-motion`.
- Reference implementation: `src/lib/motion.ts` (variants) + `src/app/page.tsx` (usage demo).

