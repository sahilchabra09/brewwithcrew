# Polish Pass: Intro, Emphasis Typography, Ambient Motion, Interaction Language

**Goal:** Implement the user's polish brief — one-time intro animation, animated word emphasis, ambient background motion, interactive chips/cards, richer process page, elevated hero, and a global hover language. GSAP only, reduced-motion safe, no new dependencies.

## Decisions (delegated to agent by the brief)

1. **Intro concept: A) The Espresso Pull + wordmark reveal.** Line-art portafilter draws itself in, twin espresso streams pour into a small cup, steam puffs, the "Brew with Crew" wordmark rises, overlay fades. Distinct from the scroll-driven `BrewCup` mug scene (different object, different motion grammar: line-draw + pour vs. fill-on-scrub). Concept B (latte-art logo) is blocked on the logo SVG — noted for the user; the intro is built so a logo can replace the wordmark later.
   - Once per session via `sessionStorage("bwc-intro")`; an inline synchronous script hides the SSR-rendered overlay pre-paint for repeat visits and reduced-motion users (no FOUC either direction).
   - Hero timeline starts paused while the intro is pending and plays on a `bwc:intro-done` window event.
2. **Emphasis techniques:** `<Squiggle>` (SVG wavy underline, stroke-dashoffset draw-in on ScrollTrigger, brew gold) and `<HighlightFill>` (translucent gold `background-size` 0→100% left-to-right on ScrollTrigger). Applied to garnish words sitewide ("freshly brewed", "crew", "execution", "on us", etc.).
3. **Ambient motion: Hybrid.** `BeanField` gains slow looping drift + optional pointer parallax (fine pointers). Rich on home hero/CTA and About; subtle (CoffeeRing only) on Process/Contact.
4. **Chips + global hover language:** CSS transitions (cheaper than GSAP for simple hovers): chips warm to brew gold and lift; project cards lift with image zoom and arrow nudge; buttons lift with arrow slide; footer links get slide-in underlines; tags/outputs warm on hover. Grid-cell cards (1px-gap grids) use background/inner feedback instead of transforms to avoid exposing gaps.
5. **Process page:** stagger reveal for step cards, hover feedback (surface shift, brew-colored labels, divider grows), second CoffeeRing.
6. **Hero wow:** pointer-tracking depth (steam, bean layer, grid at different depths via `gsap.quickTo`), slightly more dramatic line stagger, ambient bean layer.

## Files

- Create: `src/components/intro.tsx`
- Modify: `src/components/gsap/primitives.tsx` (add `Squiggle`, `HighlightFill`)
- Modify: `src/components/decor.tsx` (BeanField drift + pointer parallax)
- Modify: `src/components/home/hero.tsx` (intro handoff, pointer depth, beans)
- Modify: `src/app/globals.css` (intro overlay, emphasis styles, hover language, process/chips hovers)
- Modify: pages (`page.tsx`, `about`, `services`, `work`, `process`, `contact`) to apply emphasis + ambient elements
- Modify: `src/components/site.tsx` (footer link underlines markup if needed, process card structure already fine)

## Verification (Playwright, as previous pass)

- Intro plays on first load, sets sessionStorage, does NOT replay on reload; skipped entirely under reduced motion.
- Hero starts only after intro completes (paused-timeline handoff).
- No horizontal overflow at 375px; no console errors on all routes.
- Reduced motion: all content visible immediately, no pin/smoothing.
- Hover probes: chip, project card, process card state changes.
- `bun run build` + `bun run lint` clean. No commits (user commits manually).
