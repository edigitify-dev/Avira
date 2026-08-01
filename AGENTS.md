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

## Brand system — Ako

Colors and fonts are global theme tokens (`src/app/globals.css` `@theme`), not one-off Tailwind classes. Use them by name:

- `bg-ink` / `text-ink` — #202e2a, darkest section background / body text on light sections
- `bg-slate` / `text-slate` — #4f6b6c, secondary dark background, muted accents
- `bg-forest` / `text-forest` — #3e4a34, alternate dark background
- `bg-rust` / `text-rust` — #8b4b34, single accent color — CTAs and highlights only, never a background wash
- `bg-cream` / `text-cream` — #ede6d8, primary light background
- `bg-paper` — #ffffff, card surfaces sitting on a cream section

Hex values are read off the brand board image, not exact brand-guide values — replace in `globals.css` if precise hex codes are ever supplied.

**Fonts**: `font-serif` (headings, brand name, pull quotes) and `font-sans` (body copy, eyebrow labels, buttons). `font-serif` currently resolves to **Fraunces** as a free stand-in for the brand's actual "Butler" typeface — swap the `next/font/google` import in `src/app/layout.tsx` for `next/font/local` the moment real Butler font files are available; nothing else in the codebase needs to change since everything references the `font-serif` token, not the font name.

**Section-wise theming**: pages are built from `<Section theme="dark" | "light" | "white" | "slate" | "forest">` (`src/components/Section.tsx`), alternating backgrounds down the page per the brand board — never one flat background for the whole page, and never two of the same theme back to back. `light` (cream) and `white` (paper) are both "light" tonally but read as visually distinct — fine to sit adjacent, unlike repeating the exact same theme twice. `Section` already wraps `AnimatedSection`, so enter/exit motion is automatic; pass `variant`, `stagger`, etc. straight through.

Eyebrow labels follow the brand board's style: `font-sans text-sm font-medium uppercase tracking-[0.2em]`, colored to contrast at ~70% opacity against whichever section background it sits on.

**Icons**: `lucide-react` for general UI icons (see `WhyChooseUsSection.tsx`). It no longer ships brand/social marks (LinkedIn, X/Twitter, Instagram, Facebook — trademark reasons) — `Footer.tsx` hand-rolls minimal SVGs matched to lucide's stroke style (24×24 viewBox, `strokeWidth={1.5}`, round caps) for those. Reuse those three (`LinkedInIcon`/`XIcon`/`InstagramIcon`) rather than re-adding a brand-icon package.

**Stock photography**: team/testimonial photos are real Pexels URLs (`images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg`) verified to resolve, not guessed IDs — `next.config.ts` allowlists `images.pexels.com` for `next/image`. Team photos are rendered `grayscale` to unify photos shot in different styles/lighting into one cohesive treatment — keep that filter if more team photos are added.

## Scroll-linked pinned sections (e.g. process/steps)

For a step-by-step section (not a simple grid), the signature pattern is a pinned horizontal scroll-through rather than per-card whileInView reveals — see `src/components/ProcessSection.tsx`:

- A tall wrapper (`height: ${n * 100}vh`) holds a `lg:sticky lg:top-0 h-screen overflow-hidden` inner viewport. A flex row of `n` full-viewport-width panels sits inside; `useScroll({ target: pinRef, offset: ["start start", "end end"] })` drives a `useTransform`'d `x` on that row, `-(n-1)*100%` at full scroll.
- **The percentage-of-own-width gotcha**: `translateX(%)` resolves against the *track's own rendered width*, which — because the track is a normal block-level flex container — equals its containing block (one viewport width), not the sum of its overflowing children. The correct target is `-(n-1)*100%` (one full container-width per remaining panel), **not** `-(n-1)/n*100%`. Got this wrong once; verify by checking the computed inline `transform` in a browser at scroll-end matches `-(n-1) * viewportWidth` in px, not a smaller fraction of it.
- **The container-padding gotcha**: this pinned wrapper must cancel `Section`'s own `px-6 sm:px-16` (e.g. `-mx-6 sm:-mx-16`) or the sticky viewport is narrower than the real viewport, throwing off every width-relative calculation above. Verify with `getBoundingClientRect().width` on the sticky element — it must equal `window.innerWidth`, not something ~100–130px short.
- `useMotionValueEvent(scrollYProgress, "change", ...)` maps progress to a discrete `active` step index in React state for the dot indicator / "0X / 0N" counter — don't try to derive discrete UI state from a motion value without this hook.
- This pattern is desktop-only (`hidden lg:block`) — on mobile it collapses to a plain numbered stacked list (`StepsFallback` in the same file), since pinned-scroll effects add complexity without benefit at that viewport. Respect `useReducedMotion()` and fall back to the same stacked list rather than force the pin on users who've opted out.
- When verifying this pattern works, screenshots alone aren't enough — instrument the actual scroll numbers (`getBoundingClientRect`, computed `transform`, the live motion value) and check the arithmetic, since a visually-plausible mid-scroll screenshot can still hide a completely wrong end-state.

