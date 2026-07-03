# Brew with Crew — "Digital Roastery" Redesign

**Date:** 2026-07-02
**Status:** Approved direction (user granted full creative control; immersive-but-usable GSAP, coffee-themed brand, playful copy)

## Goal

Take the existing dark, minimal agency site over the top: GSAP-driven immersion within the first seconds of scrolling, a cohesive coffee-roastery brand identity, and coffee-flavored copy — without ever reading as a coffee company or becoming a scroll-jacking gimmick.

## Approaches considered

1. **Espresso Noir (chosen).** Evolve the existing warm dark theme into a rich "digital roastery" aesthetic. GSAP choreography everywhere it earns its keep, one signature pinned scene, all art code-drawn (SVG steam, beans, cup, coffee rings). Immersive, fast, usable.
2. **Full canvas/WebGL liquid experience.** Maximum spectacle, but heavy, fragile on mobile, and conflicts with the explicit "not unusably over the top" constraint. Rejected.
3. **Light "latte" rebrand.** Cream/paper light theme. Fresh but discards the premium dark equity the site already has and doubles visual-QA scope. Rejected.

## Brand concept

**"We brew software."** Brew with Crew is a *roastery for software* — craft language borrowed from specialty coffee, applied to product engineering. Coffee is the metaphor for craft, patience, and quality; the deliverables are unmistakably SaaS, AI, and custom software.

## Visual language

- **Palette:** deepen the existing hue-80 warm neutrals into espresso (background ~oklch 14–16%), roast-brown surfaces, the existing crema-gold accent (`--brew`) promoted to hero moments, plus a latte-cream tone for highlights. Subtle film-grain overlay for warmth.
- **Typography:** keep Inter Tight + JetBrains Mono. Mono becomes "roast label" language — e.g. `BATCH Nº 07 — INSURANCE SAAS`, `ROASTED 2025 · STILL HOT`.
- **Decorative system (all inline SVG/CSS, no raster assets):** animated steam wisps, coffee-ring stains as section watermarks, scattered bean glyphs with parallax drift, a line-drawn cup that fills during the process scene.

## Copy direction (coffee-flavored, tech-first)

- **Hero:** "Serious software, freshly brewed." Sub-copy keeps the real positioning (SaaS, AI, e-commerce, custom software for founders).
- **Industries ticker:** "What's brewing" marquee.
- **Services get blend names as flavor labels, real titles stay primary:** Startup Development = *The Espresso Shot* (fast, concentrated), Dedicated Product Teams = *The House Blend* (your daily driver), Business Solutions = *The Slow Brew* (custom, patiently crafted).
- **Process = "The Brew Method",** each step keeps its real title plus a coffee sublabel: Discovery/Sourcing, Strategy/The Grind, Design/Blooming, Development/Brewing, Launch/The Pour, Growth/Refills.
- **Work:** "Fresh from the roastery." Case studies keep factual statuses.
- **About:** "The crew behind the brew."
- **Contact:** "First coffee's on us." (the free 30-min discovery call). CTA "Let's grab a coffee →".
- **Metrics:** e.g. "Bean to cup: 6–10 weeks."
- Rule of thumb: every pun must survive the "would a CTO still take us seriously" test; positioning copy stays literal, garnish copy gets the puns.

## GSAP architecture

- **Deps:** `gsap@^3.13`, `@gsap/react` (all plugins free as of 3.13).
- **`src/components/gsap/` (client components):**
  - `gsap-provider.tsx` — registers plugins once, mounts ScrollSmoother (`#smooth-wrapper` / `#smooth-content`), wires `prefers-reduced-motion` via `gsap.matchMedia` (reduced motion → no pinning/scrub/smoothing, simple fades only).
  - Primitives: `Reveal` (fade-rise on ScrollTrigger, `start: "top 80%"`, play once), `SplitHeading` (SplitText line/word reveal), `Counter` (metric count-up), `Marquee` (industries ticker), `Magnetic` (buttons), `Parallax` (decor drift).
  - Decor: `Steam`, `BeanField`, `CoffeeRing`, `BrewCup` (DrawSVG-style fill).
- **Signature scene (home):** the Brew Method section pins while the six steps advance and the cup fills — scrubbed timeline, short pin distance, skippable and disabled on reduced motion/mobile-short viewports.
- **Hero choreography:** load timeline — nav fades, headline SplitText rises, steam starts drifting, CTAs get magnetic hover. Under ~1.2 s total so the site never feels gated.
- **Pages stay server components;** animation lands via client wrappers around existing markup. `site-data.ts` remains the single source of truth for copy.

## Scope

All six routes: home, services, work, work/[slug], process, about, contact. Header/footer/shared components. No new routes, no CMS, no image assets required (AI-image prompts optional later).

Additionally (user request): full mobile responsiveness — working mobile nav (the current hamburger button is inert), no overflow at 360–768 px widths, touch-friendly hit targets — plus general customer-facing polish: SEO metadata/OpenGraph, favicon-consistent branding, and a working feel for the contact form CTA.

## Testing

`bun run build` and lint pass; every route manually verified in dev; reduced-motion behavior verified; no horizontal overflow on mobile widths.
