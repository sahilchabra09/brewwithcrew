"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export const INTRO_DONE_EVENT = "bwc:intro-done";

declare global {
  interface Window {
    __bwcIntroPending?: boolean;
  }
}

/** True while the intro overlay still has to play this session. */
export function introIsPending() {
  return typeof window !== "undefined" && window.__bwcIntroPending === true;
}

/*
 * Runs synchronously before paint (inline script): reduced-motion users
 * never see the overlay; everyone else gets it on every load. Everything
 * else happens in useGSAP after hydration.
 */
const PREPAINT_SCRIPT = `(function () {
  try {
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      var el = document.getElementById("bwc-intro");
      if (el) el.style.display = "none";
    } else {
      window.__bwcIntroPending = true;
    }
  } catch (e) {}
})();`;

/**
 * Intro (plays on every load): a line-art portafilter draws itself in,
 * pulls a double shot into a cup, steam rises, the wordmark appears, and
 * the overlay fades to reveal the hero (which waits for INTRO_DONE_EVENT).
 */
export function IntroOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const finish = () => {
        window.__bwcIntroPending = false;
        window.dispatchEvent(new CustomEvent(INTRO_DONE_EVENT));
      };

      if (!window.__bwcIntroPending) {
        // hidden by the pre-paint script (reduced motion)
        root.style.display = "none";
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          root.style.display = "none";
          finish();
        },
      });

      tl.fromTo(
        ".intro-draw",
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.6, stagger: 0.09 },
      )
        .fromTo(
          ".intro-stream",
          { attr: { height: 0 } },
          { attr: { height: 78 }, duration: 0.42, ease: "power1.in" },
          0.62,
        )
        .fromTo(
          ".intro-liquid",
          { attr: { y: 214, height: 0 } },
          { attr: { y: 188, height: 26 }, duration: 0.7, ease: "none" },
          0.8,
        )
        .to(
          ".intro-stream",
          { attr: { y: 170, height: 0 }, duration: 0.28, ease: "power1.in" },
          1.28,
        )
        .fromTo(
          ".intro-steam path",
          { y: 10, opacity: 0 },
          { y: -6, opacity: 0.7, duration: 0.5, stagger: 0.12 },
          1.5,
        )
        .fromTo(
          ".intro-wordmark",
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55 },
          1.55,
        )
        .fromTo(
          ".intro-tagline",
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.45 },
          1.75,
        )
        .to(root, { autoAlpha: 0, duration: 0.55, ease: "power2.inOut" }, 2.45);

      // Belt and braces: never trap the page if the tab is backgrounded
      // and timers throttle — force-finish shortly after the planned end.
      const failsafe = window.setTimeout(() => {
        if (window.__bwcIntroPending) {
          tl.progress(1);
        }
      }, 4500);
      return () => window.clearTimeout(failsafe);
    },
    { scope: ref },
  );

  return (
    // suppressHydrationWarning: the pre-paint script legitimately mutates
    // style before hydration (same pattern as theme switchers)
    <div
      className="intro-overlay"
      id="bwc-intro"
      ref={ref}
      suppressHydrationWarning
    >
      <script dangerouslySetInnerHTML={{ __html: PREPAINT_SCRIPT }} />
      <div className="intro-inner">
        <svg aria-hidden fill="none" viewBox="25 0 240 260">
          {/* portafilter body */}
          <path
            className="intro-draw"
            d="M78 42 H162 V56 C162 64 156 70 148 70 H92 C84 70 78 64 78 56 Z"
            pathLength="1"
            stroke="var(--crema)"
            strokeDasharray="1"
            strokeDashoffset="1"
            strokeLinejoin="round"
            strokeWidth="3.5"
          />
          {/* handle */}
          <path
            className="intro-draw"
            d="M162 50 H216"
            pathLength="1"
            stroke="var(--crema)"
            strokeDasharray="1"
            strokeDashoffset="1"
            strokeLinecap="round"
            strokeWidth="7"
          />
          {/* funnel collar under the basket */}
          <path
            className="intro-draw"
            d="M107 70 C108 77 132 77 133 70"
            pathLength="1"
            stroke="var(--crema)"
            strokeDasharray="1"
            strokeDashoffset="1"
            strokeLinecap="round"
            strokeWidth="3"
          />
          {/* twin spouts curve apart from the funnel — the classic split pour */}
          <path
            className="intro-draw"
            d="M117 75.5 C114 80 106.5 81.5 104.5 87"
            pathLength="1"
            stroke="var(--crema)"
            strokeDasharray="1"
            strokeDashoffset="1"
            strokeLinecap="round"
            strokeWidth="3"
          />
          <path
            className="intro-draw"
            d="M123 75.5 C126 80 133.5 81.5 135.5 87"
            pathLength="1"
            stroke="var(--crema)"
            strokeDasharray="1"
            strokeDashoffset="1"
            strokeLinecap="round"
            strokeWidth="3"
          />
          {/* espresso streams (grow downward from the spout tips) */}
          <rect className="intro-stream" fill="var(--brew)" height="0" rx="1.5" width="3" x="103" y="89" />
          <rect className="intro-stream" fill="var(--brew)" height="0" rx="1.5" width="3" x="134" y="89" />
          {/* cup */}
          <path
            className="intro-draw"
            d="M84 172 H156 V196 C156 208 147 216 134 216 H106 C93 216 84 208 84 196 Z"
            pathLength="1"
            stroke="var(--crema)"
            strokeDasharray="1"
            strokeDashoffset="1"
            strokeLinejoin="round"
            strokeWidth="3.5"
          />
          <path
            className="intro-draw"
            d="M156 180 H164 C173 180 178 186 178 194 C178 202 173 208 164 208 H156"
            pathLength="1"
            stroke="var(--crema)"
            strokeDasharray="1"
            strokeDashoffset="1"
            strokeWidth="3"
          />
          <path
            className="intro-draw"
            d="M74 238 H166"
            pathLength="1"
            stroke="var(--crema)"
            strokeDasharray="1"
            strokeDashoffset="1"
            strokeLinecap="round"
            strokeWidth="3.5"
          />
          {/* espresso in the cup */}
          <clipPath id="intro-cup-clip">
            <path d="M84 172 H156 V196 C156 208 147 216 134 216 H106 C93 216 84 208 84 196 Z" />
          </clipPath>
          <g clipPath="url(#intro-cup-clip)">
            <rect className="intro-liquid" fill="var(--brew)" height="0" opacity="0.9" width="72" x="84" y="214" />
          </g>
          {/* steam */}
          <g className="intro-steam" opacity="0.9">
            <path d="M104 158 C100 150, 108 144, 104 134" opacity="0" stroke="var(--latte)" strokeLinecap="round" strokeWidth="2.5" />
            <path d="M120 162 C116 152, 124 146, 120 134" opacity="0" stroke="var(--latte)" strokeLinecap="round" strokeWidth="2.5" />
            <path d="M136 158 C132 150, 140 144, 136 134" opacity="0" stroke="var(--latte)" strokeLinecap="round" strokeWidth="2.5" />
          </g>
        </svg>
        <p className="intro-wordmark">
          Brew <span>with</span> Crew
        </p>
        <p className="intro-tagline roast-label">serious software, freshly brewed</p>
      </div>
    </div>
  );
}
