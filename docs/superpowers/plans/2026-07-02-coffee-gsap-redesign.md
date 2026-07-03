# Digital Roastery Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Brew with Crew site as an immersive GSAP-animated "digital roastery" — coffee-craft branding, playful copy, fully mobile-responsive — per `docs/superpowers/specs/2026-07-02-coffee-gsap-redesign-design.md`.

**Architecture:** Pages stay React Server Components; all animation lives in a small set of client components under `src/components/gsap/` (provider + primitives) and `src/components/decor.tsx` (SVG art). Copy stays centralized in `src/lib/site-data.ts`. Styling stays in `globals.css` custom classes (existing pattern), extended with the deepened espresso palette and new section styles.

**Tech Stack:** Next.js 15 (App Router, Turbopack), React 19, Tailwind CSS 4 (via custom classes), GSAP 3.13+ (`gsap`, `@gsap/react`) with ScrollTrigger, ScrollSmoother, SplitText. Bun as package manager.

## Global Constraints

- **NEVER run `git commit` or `git push`** — the user commits manually from a personal account.
- Package manager is **bun** (`bun add`, `bun run build`).
- All GSAP plugin registration happens **once** in `src/components/gsap/gsap-provider.tsx`; components import `gsap` and use registered plugins.
- Every scroll animation must respect `prefers-reduced-motion` via `gsap.matchMedia()` — reduced motion gets instant/opacity-only states, no pinning, no smoothing.
- Copy rule: positioning copy stays literal (SaaS/AI/custom software); garnish copy gets the coffee puns. Real service/process titles remain primary; coffee names are sublabels.
- Verification for every task: `bun run build` exits 0 plus rendering checks noted per task. (No unit-test infra exists; do not add one for visual work.)
- No raster image assets; all decorative art is inline SVG/CSS.
- Mobile: no horizontal overflow 360–768 px; hamburger nav must actually work.

---

### Task 1: Install GSAP and mount the provider/smooth-scroll shell

**Files:**
- Modify: `package.json` (via `bun add gsap @gsap/react`)
- Create: `src/components/gsap/gsap-provider.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `<GsapProvider>{children}</GsapProvider>` client component that (a) registers `ScrollTrigger`, `ScrollSmoother`, `SplitText`, `useGSAP` once, (b) wraps children in `#smooth-wrapper > #smooth-content`, (c) creates ScrollSmoother only when `prefers-reduced-motion: no-preference` and pointer is fine (skip on touch devices — native scroll is better there), (d) exports nothing else.

- [ ] **Step 1:** `bun add gsap @gsap/react` — expect both in `package.json` dependencies.
- [ ] **Step 2:** Write `gsap-provider.tsx`:

```tsx
"use client";
import { ReactNode, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, useGSAP);

export function GsapProvider({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference) and (pointer: fine)",
      () => {
        const smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.1,
          effects: true,
        });
        return () => smoother.kill();
      }
    );
    return () => mm.revert();
  });

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}
```

- [ ] **Step 3:** In `layout.tsx`, wrap `{children}` with `<GsapProvider>`. Note: the fixed header must render OUTSIDE `#smooth-content` (ScrollSmoother transforms content, breaking `position: fixed`) — this is handled in Task 6 by moving `<Header/>` into layout above the provider. For now just wrap children.
- [ ] **Step 4:** `bun run build` — exits 0.

### Task 2: Animation primitives

**Files:**
- Create: `src/components/gsap/primitives.tsx`

**Interfaces:**
- Produces (all client components, all accept `className` passthrough):
  - `Reveal({ children, y = 28, delay = 0, className })` — fade-rise once when scrolled to `top 82%`.
  - `SplitHeading({ children, as = "h2", className, delay })` — SplitText line mask reveal on scroll (or on mount when `immediate` prop true, for heroes).
  - `Counter({ value: string, className })` — parses leading number, counts up on enter; non-numeric values just fade.
  - `Marquee({ items: string[], separator = "●", speed = 40 })` — infinite horizontal loop, duplicated content, `aria-hidden` duplicate.
  - `Magnetic({ children, strength = 0.3 })` — pointer-follow translate on fine pointers only.
  - `Parallax({ children, speed = 0.8, className })` — `data-speed` for ScrollSmoother effects with ScrollTrigger fallback.
- All use `useGSAP({ scope })` and `gsap.matchMedia` so reduced-motion users get opacity-only or static rendering.

- [ ] **Step 1:** Implement the six primitives in one file (they share imports and are each < 60 lines).
- [ ] **Step 2:** `bun run build` — exits 0.

### Task 3: Decorative SVG system

**Files:**
- Create: `src/components/decor.tsx`

**Interfaces:**
- Produces (client components):
  - `Steam({ className })` — 3 wavy SVG paths animated with looping y-drift/opacity tweens (gsap, not scroll-bound).
  - `BeanField({ count = 8, className })` — deterministic pseudo-random scatter of bean SVG glyphs (seeded by index, NOT Math.random, to avoid hydration mismatch) with `data-speed` parallax.
  - `CoffeeRing({ className })` — static SVG ring-stain watermark (two imperfect concentric circles, low opacity).
  - `CupFill({ progress? })` — line-drawn cup whose inner "coffee" rect scales with a GSAP-controlled CSS var; used by the pinned Brew Method scene via a `.cup-fill` selector.

- [ ] **Step 1:** Implement the four components. Bean glyph: ellipse with center crease path. Cup: rounded-rect mug + handle, `<clipPath>` for fill.
- [ ] **Step 2:** `bun run build` — exits 0.

### Task 4: Espresso theme + mobile-responsive CSS overhaul

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces CSS classes consumed by Tasks 5–8: `.marquee`, `.mobile-nav`, `.mobile-nav-open`, `.brew-scene`, `.brew-steps`, `.blend-label`, `.grain-overlay`, `.steam-wrap`, `.hero-eyebrow`, plus revised `.hero`, `.service-card`, `.process-card`, `.cta-section`.
- Palette tokens (replace `:root` values): `--background: oklch(15% 0.012 60)` (espresso), `--surface: oklch(18% 0.014 60)`, `--surface-2: oklch(21% 0.016 60)`, `--brew` unchanged gold, add `--crema: oklch(88% 0.06 85)`, `--latte: oklch(75% 0.04 80)`.

- [ ] **Step 1:** Update `:root` tokens; add grain overlay (`body::after` with SVG feTurbulence data-URI, `opacity: .03`, `pointer-events: none`, `position: fixed`).
- [ ] **Step 2:** Add new component classes; audit every existing grid for mobile (`repeat(auto-fit, minmax(min(100%, Xpx), 1fr))` pattern or explicit breakpoints).
- [ ] **Step 3:** Mobile nav styles: full-screen overlay panel, large links, visible only under the desktop breakpoint; `.menu-button` gets open/close morph states.
- [ ] **Step 4:** `bun run build`; then `bun run dev` and check 375 px width for horizontal overflow on `/` (devtools emulation via curl-rendered HTML is insufficient — visual check happens in Task 9's sweep; here just confirm build).

### Task 5: Coffee copy overhaul in site-data

**Files:**
- Modify: `src/lib/site-data.ts`

**Interfaces:**
- Produces (consumed by pages in Tasks 6–8): existing exports keep their shapes; additions:
  - `serviceGroups[n].blend: string` + `.blendTag: string` (e.g. `"The Espresso Shot"`, `"fast · concentrated · precise"`).
  - `processSteps[n].brewLabel: string` (Sourcing / The Grind / Blooming / Brewing / The Pour / Refills).
  - `heroCopy = { kicker, title, sub }`, `ctaCopy = { title, body }`, `marqueeItems: string[]`.
  - `metrics` values re-flavored (e.g. label "Bean to cup" for MVP time).

- [ ] **Step 1:** Apply copy per spec (hero "Serious software, freshly brewed.", services blends, brew method sublabels, contact "First coffee's on us.", about "The crew behind the brew.", work "Fresh from the roastery.").
- [ ] **Step 2:** `bun run build` — type errors surface any missed consumers.

### Task 6: Header with working mobile nav + footer refresh

**Files:**
- Create: `src/components/nav.tsx` (client: `Header`, `MobileNav`)
- Modify: `src/components/site.tsx` (remove old Header, keep Logo/Footer; re-export Header from nav)
- Modify: `src/app/layout.tsx` (Header outside `#smooth-content`)

**Interfaces:**
- Produces: `Header` (client) — same visual pill bar; hamburger toggles GSAP-animated full-screen overlay (staggered link rise, backdrop fade); closes on route click and Escape; locks body scroll while open.
- `PageShell` no longer renders Header (layout does); Footer gains pun line "Powered by caffeine and clean code."

- [ ] **Step 1:** Build `nav.tsx` with `useGSAP` + `contextSafe` for open/close timeline.
- [ ] **Step 2:** Move `<Header/>` to layout above `<GsapProvider>`; strip from `PageShell`.
- [ ] **Step 3:** `bun run build`; dev-server check: hamburger opens/closes on mobile width, links navigate.

### Task 7: Home page rebuild with hero choreography + pinned Brew Method scene

**Files:**
- Create: `src/components/home/hero.tsx`, `src/components/home/brew-method.tsx` (client)
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: primitives (Task 2), decor (Task 3), copy (Task 5).
- `Hero` — load timeline: kicker fade → SplitText headline rise → sub + CTAs → code-window rise + steam start; total ≤ 1.2 s.
- `BrewMethod` — desktop fine-pointer: section pins for `+=<steps*70vh>` while cup fills and steps activate (scrub); mobile/reduced-motion: plain stacked cards with `Reveal`.
- Rest of home: `Reveal`/`SplitHeading`/`Marquee`/`Counter` applied to existing sections; industries strip becomes marquee.

- [ ] **Step 1:** Build `hero.tsx` (includes the existing CodeWindow, animated).
- [ ] **Step 2:** Build `brew-method.tsx` with `gsap.matchMedia` split.
- [ ] **Step 3:** Rewrite `page.tsx` composing new sections.
- [ ] **Step 4:** `bun run build`; dev check: pin engages and releases cleanly, no layout jump at pin start/end.

### Task 8: Inner pages — services, work, work/[slug], process, about, contact

**Files:**
- Modify: `src/app/services/page.tsx`, `src/app/work/page.tsx`, `src/app/work/[slug]/page.tsx`, `src/app/process/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`
- Modify: `src/components/site.tsx` (ProjectCard hover lift + image zoom via CSS, ProcessGrid gains brewLabel, CtaSection gets Steam + Magnetic CTA)

**Interfaces:**
- Consumes: primitives, decor, new site-data fields. Page heroes use `SplitHeading immediate`; card grids wrapped in `Reveal` with stagger; services show blend labels; process page shows brew sublabels + CoffeeRing watermarks; contact aside becomes "First coffee's on us."

- [ ] **Step 1:** Services + process (share blend/brew labels).
- [ ] **Step 2:** Work index + case-study page (mono "roast label" meta line: `BATCH <year> · <industry>`).
- [ ] **Step 3:** About + contact.
- [ ] **Step 4:** `bun run build`; dev check each route renders animated without console errors.

### Task 9: Metadata, polish, and full verification sweep

**Files:**
- Modify: `src/app/layout.tsx` (metadata: title template "Brew with Crew — Serious software, freshly brewed.", description, OpenGraph), per-page `metadata` exports.

**Interfaces:** none new.

- [ ] **Step 1:** Metadata + OG tags.
- [ ] **Step 2:** `bun run lint` and `bun run build` — both exit 0.
- [ ] **Step 3:** Dev-server sweep: all 6 routes at 1440 px and 375 px; verify no horizontal scroll, pin scene OK, mobile nav OK, reduced-motion (emulate via devtools) shows content without animation gates.
- [ ] **Step 4:** Report summary to user for their manual commit (per no-commit rule).
