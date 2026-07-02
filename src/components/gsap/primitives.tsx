"use client";
import {
  CSSProperties,
  ElementType,
  ReactNode,
  useRef,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const ENTER = "(prefers-reduced-motion: no-preference)";

/** Hero fires this once its entrance reveals the stats, so Counters tick then. */
export const STATS_REVEAL_EVENT = "bwc:stats-visible";

/** Fade-and-rise once when the element scrolls into view. */
export function Reveal({
  children,
  y = 28,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  y?: number;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(ENTER, () => {
        gsap.from(ref.current, {
          y,
          autoAlpha: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div className={className} ref={ref} style={style}>
      {children}
    </div>
  );
}

/** Children get a staggered rise; direct children are the stagger units. */
export function RevealStagger({
  children,
  className,
  stagger = 0.08,
  y = 32,
  style,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(ENTER, () => {
        const items = ref.current ? Array.from(ref.current.children) : [];
        gsap.from(items, {
          y,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger,
          clearProps: "all",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            once: true,
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div className={className} ref={ref} style={style}>
      {children}
    </div>
  );
}

/** SplitText line-mask reveal. `immediate` plays on mount (heroes). */
export function SplitHeading({
  children,
  as: Tag = "h2",
  className,
  immediate = false,
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  immediate?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const target = ref.current?.firstElementChild;
      if (!target) return;
      const mm = gsap.matchMedia();
      mm.add(ENTER, () => {
        const split = SplitText.create(target, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 0.9,
              delay,
              ease: "power4.out",
              stagger: 0.09,
              ...(immediate
                ? {}
                : {
                    scrollTrigger: {
                      trigger: target,
                      start: "top 85%",
                      once: true,
                    },
                  }),
            }),
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} style={{ display: "contents" }}>
      <Tag className={className}>{children}</Tag>
    </div>
  );
}

/**
 * Ticks each number from a low resting value (`from`) up to `value` when
 * the stats come into view. Because it rests at the low value, the jump is
 * visible whenever it fires — no dependence on screen size or scroll amount.
 * Reduced motion: the real `value` is shown statically.
 */
export function Counter({
  value,
  from,
  className,
}: {
  value: string;
  from?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const numbers = [...value.matchAll(/\d+/g)];
      if (!numbers.length) return;
      const targets = numbers.map((m) => parseInt(m[0], 10));
      const starts = from
        ? [...from.matchAll(/\d+/g)].map((m) => parseInt(m[0], 10))
        : targets.map(() => 0);

      const proxy = { p: 0 };
      const render = () => {
        let out = "";
        let last = 0;
        numbers.forEach((m, i) => {
          const start = starts[i] ?? 0;
          out += value.slice(last, m.index);
          out += String(Math.round(start + (targets[i] - start) * proxy.p));
          last = (m.index ?? 0) + m[0].length;
        });
        out += value.slice(last);
        el.textContent = out;
      };

      const mm = gsap.matchMedia();
      mm.add(ENTER, () => {
        render(); // snap to the low resting value before first paint

        let played = false;
        const spin = () => {
          if (played) return;
          played = true;
          gsap.to(proxy, {
            p: 1,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: render,
          });
        };

        // Fire the instant the bar enters view (short-screen / scroll case).
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 95%",
          onEnter: spin,
        });

        // Above the fold: the hero fires STATS_REVEAL_EVENT once its entrance
        // shows the stats. Only count if they're actually on screen.
        const onReveal = () => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) spin();
        };
        window.addEventListener(STATS_REVEAL_EVENT, onReveal);

        return () => {
          window.removeEventListener(STATS_REVEAL_EVENT, onReveal);
          st.kill();
        };
      });
    },
    { scope: ref },
  );

  return (
    <span className={className} ref={ref}>
      {value}
    </span>
  );
}

/**
 * Infinite horizontal ticker. Content is duplicated for the loop. The
 * scroll is a pure CSS animation (see .marquee-track) so it runs on every
 * device regardless of JS timing; reduced-motion CSS freezes it.
 */
export function Marquee({
  items,
  separator = "●",
  duration = 28,
  className,
}: {
  items: string[];
  separator?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="marquee-row">
      {items.map((item) => (
        <span key={item}>
          {item}
          <i>{separator}</i>
        </span>
      ))}
    </div>
  );

  return (
    <div className={className ? `marquee ${className}` : "marquee"} ref={ref}>
      <div
        className="marquee-track"
        style={{ animationDuration: `${duration}s` }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/** Pointer-follow "magnetic" hover on fine pointers. */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${ENTER} and (pointer: fine)`, () => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
        const move = (event: MouseEvent) => {
          const bounds = el.getBoundingClientRect();
          xTo((event.clientX - bounds.left - bounds.width / 2) * strength);
          yTo((event.clientY - bounds.top - bounds.height / 2) * strength);
        };
        const reset = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", reset);
        return () => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", reset);
        };
      });
    },
    { scope: ref },
  );

  return (
    <div className={className} ref={ref} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}

/**
 * Wavy gold underline. The wave is a tiled background on an absolutely
 * positioned line, revealed left-to-right by animating a clip-path inset
 * on scroll — no stroke-dash tricks, no layout reflow, robust under
 * ScrollSmoother. Reduced motion: the CSS default leaves it fully drawn.
 */
export function Squiggle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const line = ref.current?.querySelector<HTMLElement>(".squiggle-line");
      if (!line) return;
      const mm = gsap.matchMedia();
      mm.add(ENTER, () => {
        gsap.fromTo(
          line,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <span className={className ? `squiggle ${className}` : "squiggle"} ref={ref}>
      {children}
      <span aria-hidden className="squiggle-line" />
    </span>
  );
}

/**
 * Bold marker highlight: a solid gold block covering the word top to
 * bottom with dark text on top — the "text-selection" look. A duplicate
 * of the word sits above the base and is revealed left-to-right via a
 * clip-path wipe, so text stays cream before the sweep and dark after.
 * Use sparingly. Reduced motion: fully revealed, no animation.
 */
export function HighlightFill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mark = ref.current?.querySelector<HTMLElement>(".hl-mark");
      if (!mark) return;
      const mm = gsap.matchMedia();
      mm.add(ENTER, () => {
        gsap.fromTo(
          mark,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.75,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <span className={className ? `hl-fill ${className}` : "hl-fill"} ref={ref}>
      {children}
      <span aria-hidden className="hl-mark">
        {children}
      </span>
    </span>
  );
}

/** ScrollSmoother parallax via data-speed; inert (static) on touch devices. */
export function Parallax({
  children,
  speed = 0.85,
  className,
  style,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={className} data-speed={speed} style={style}>
      {children}
    </div>
  );
}
