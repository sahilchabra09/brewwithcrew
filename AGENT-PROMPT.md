# Brew with Crew — Bug Fixes & Polish

## Context
This is a Next.js 15 site with GSAP (ScrollTrigger, ScrollSmoother, SplitText), Tailwind CSS v4, and a dark coffee-themed aesthetic. All animations use GSAP via `useGSAP` hook. The `prefers-reduced-motion` rule is already handled via `gsap.matchMedia()`.

Key files:
- `src/components/gsap/primitives.tsx` — Animation components (Counter, Squiggle, HighlightFill, Reveal, etc.)
- `src/components/home/hero.tsx` — Homepage hero with intro animation, SplitText headline, counters
- `src/components/intro.tsx` — One-time intro overlay (portafilter animation)
- `src/app/globals.css` — All custom styles (oklch color space, no tailwind.config.js)
- `src/app/page.tsx` — Homepage with Squiggle and HighlightFill usage
- `src/app/contact/page.tsx` — Contact form with send button
- `src/lib/site-data.ts` — Roast stats data for counters

---

## Fix 1: Counter Rework (Hero Stats)

### Current behavior
The `Counter` component (`primitives.tsx:172-243`) with `immediate` prop starts counting from zero on page load. The hero animation reveals the stats section ~1.7s into the timeline. There's a `gsap.delayedCall(1.8, spin)` that currently delays the count, but this results in the counters being hidden when the page first loads.

### Desired behavior
1. **Show default values on load** — Counter should display its `value` prop as-is initially (e.g., "6–10 weeks", "12+", "8", "72"). The `render()` function currently sets everything to zero on mount (line 206: `render(); // start at zero before first paint`). Remove this call so the default text renders.
2. **Activate on scroll** — Use ScrollTrigger instead of `immediate`. When the `.hero-stats` section scrolls into view, wait 1 second, then animate the numbers from zero up to their target values.
3. **Remove the `immediate` prop entirely** from the Counter usage in `hero.tsx:170`. The counter should just use scroll-triggered mode.
4. The animation duration can stay at 1.6s with `power2.out` easing.

### Implementation
In `primitives.tsx`, modify the Counter component:
- Remove the `render()` call on line 206 so the default value text is shown
- Remove the `immediate` branch entirely (lines 216-224)
- The scroll-triggered path (lines 226-232) already works — it uses ScrollTrigger with `start: "top 88%"`. Add a `delay: 1` to the `gsap.to` call so numbers start pumping 1 second after the scroll trigger fires.
- In `hero.tsx`, change `<Counter immediate value={stat.value} />` to just `<Counter value={stat.value} />`

---

## Fix 2: Highlight Fill Clipping Descenders & Punctuation

### Current CSS (globals.css:1558-1569)
```css
.hl-mark {
  position: absolute;
  inset: -0.12em -0.16em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.08em 0.16em;
  border-radius: 3px;
  background: var(--brew);
  color: var(--brew-foreground);
  clip-path: inset(0 0% 0 0);
}
```

### Problems
- The `.hl-mark` background doesn't extend far enough vertically. Letters with descenders (y, g, p) get their bottoms cut off by the highlight edge.
- Full stops/periods after highlighted words are hidden behind the highlight.

### Affected instances
- `src/app/services/page.tsx:29` — `<HighlightFill>where you&apos;re going</HighlightFill>.` (the "y" descender is cut)
- `src/app/page.tsx:42` — `<HighlightFill>extension of your team</HighlightFill>` (the "y" in "your" is cut)
- `src/app/page.tsx:112` — `<HighlightFill>shipped</HighlightFill>,` (the "p" descender is cut)
- `src/app/about/page.tsx:65` — `<HighlightFill>execution</HighlightFill>.` (full stop hidden)
- `src/app/about/page.tsx:121` — `<HighlightFill>ship</HighlightFill> for.` (full stop hidden)
- `src/app/contact/page.tsx:18` — `<HighlightFill>on us</HighlightFill>.` (full stop hidden)
- `src/app/work/page.tsx:21` — `<HighlightFill>real businesses</HighlightFill>.` (full stop hidden)

### Fix
Adjust the `.hl-mark` inset and padding so the gold background fully covers the text including descenders and any adjacent punctuation. The key is to increase the vertical inset (top/bottom) enough that the background extends past the descender zone.

**Important:** Review the recent changes to `primitives.tsx` (the HighlightFill component and its CSS in globals.css) — the current `.hl-mark` inset values were recently modified and may be the root cause of the regression. The original values before recent changes were `inset: -0.04em -0.14em` with `padding: 0 0.14em`. The goal is to find values that cover descenders without making the highlight look oversized.

---

## Fix 3: Squiggle Line Overlapping Cards

### Current CSS (globals.css:1538-1549)
```css
.squiggle-line {
  position: absolute;
  bottom: -0.18em;
  left: 0;
  width: 100%;
  height: 0.28em;
  ...
}
```

### Problem
On the homepage, the "Serious software for **serious businesses**." section uses `<Squiggle>serious businesses</Squiggle>`. The squiggle wavy underline extends below the text and visually overlaps with the principle cards that appear below after scrolling. There's no gap between the squiggle line and the content below it.

### Context
- The heading uses `.section-intro h2` which has `line-height: 1.1` (globals.css:540)
- The squiggle line sits at `bottom: -0.18em` with `height: 0.28em`
- Below the heading is a `<PrinciplesGrid />` with `marginTop: 3.5rem`

### Fix
The squiggle line's extension below the text baseline is causing the overlap. Options:
1. Reduce the `bottom` value (e.g., from `-0.18em` to `-0.12em`) and/or reduce `height`
2. Add `margin-bottom` or `padding-bottom` to the `.section-intro h2` element that contains a squiggle
3. Add `overflow: visible` and ensure the squiggle's parent has enough space

The cleanest fix is likely a combination: reduce the squiggle line extension slightly AND add a small bottom margin to headings that contain squiggles. Be careful not to break the "growing businesses" squiggle in the hero section.

---

## Fix 4: Homepage Blur Flash on Load

### Problem
When the homepage loads, a very small blur of the "Serious software, freshly brewed." text is visible before the GSAP animation fully loads. This happens specifically during initial page load (first paint), not when navigating directly to the site (client-side navigation).

### Cause
The hero headline uses SplitText with `mask: "lines"` which creates overflow:hidden wrappers. The GSAP timeline animates the headline from `filter: "blur(12px)"` and `yPercent: 118` (hero.tsx:36-38). Before GSAP initializes and takes control, the raw HTML renders with the headline at its default state — but the SplitText line masks may cause a brief flash of the text in a partially-clipped or blurred state before the animation begins.

### Fix approaches (agent's choice)
1. Start the hero headline with `opacity: 0` or `visibility: hidden` via CSS, then have GSAP reveal it. The `.from()` animation already handles `autoAlpha` but the initial CSS state might need to match.
2. Add a CSS rule like `.hero-headline { opacity: 0; }` that gets overridden by GSAP when the timeline plays.
3. Ensure the SplitText `mask: "lines"` wrappers don't cause a flash by setting initial clip states.

The key is: the headline should be invisible until GSAP takes over and plays the reveal animation. Check if the existing `.from(split.lines, { yPercent: 118, filter: "blur(12px)" })` properly sets the initial state before the first paint.

---

## Fix 5: Cursor Effects

### (a) Subtle cursor glow
Add a very small, soft glow that follows the mouse cursor across the site. This should be:
- A small radial gradient (maybe 200-300px diameter)
- Using the `--brew` gold color at very low opacity (0.06-0.10)
- Fixed to cursor position with CSS `pointer-events: none`
- Smooth following (CSS transition or GSAP quickTo)
- Only on desktop/fine pointer devices
- Respects `prefers-reduced-motion`

Implementation approach: Create a `<CursorGlow />` component in `src/components/decor.tsx` or a new file. Add it to the root layout. Use a `mousemove` listener with `gsap.quickTo` for smooth following.

### (b) Custom cursor
Change the default cursor to something coffee-related. Ideas to include in the prompt:
- A small coffee bean shape
- A tiny coffee cup with a code bracket (`{ }`) inside it
- A simple crosshair with a coffee-toned color
- Keep it subtle — should be small (16-24px), not distracting

Use CSS `cursor: url('...'), auto` with an SVG or PNG cursor image. Place the cursor file in `public/`. The hotspot should be centered or at the tip. Only apply on desktop (fine pointer).

---

## Fix 6: Send Button (Contact Page)

### Current state
The button currently says "Send it →". The user wants:
1. A short, unique coffee-themed pun (not generic — something creative that fits the brand)
2. A cool animation on the button

### Existing button styles (globals.css)
The `.button` class already has hover transitions. A `.send-btn` class was added with hover lift and active press effects.

### Suggestions for button text (agent's pick)
- "Brew it"
- "Pour it"
- "Pull the shot"
- "Start brewing"
- "Let's brew"

### Animation
The button already has CSS transitions (hover lift, active press). Consider adding:
- A small SVG icon (coffee cup or steam) that animates on hover
- A subtle shimmer/glow effect across the button on hover
- The arrow span already animates with `translateX(3px)` on hover

---

## Constraints
- GSAP only for animations — no new libraries
- All motion must respect `prefers-reduced-motion: reduce`
- No new npm dependencies
- Follow existing code patterns in `primitives.tsx` and `decor.tsx`
- Use `useGSAP` hook with `gsap.matchMedia()` for all GSAP components

## Testing
After making changes:
- Reload the homepage (hard refresh) and verify no blur flash on headline
- Check hero counters show default values on load, then animate on scroll
- Verify highlights fully cover descenders on "extension of your team", "shipped", "where you're going"
- Verify full stops are visible after highlighted words on about, work, contact, services pages
- Check "serious businesses" squiggle doesn't overlap with the principle cards below
- Test cursor glow on desktop
- Test send button animation on contact page
