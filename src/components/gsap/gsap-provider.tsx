"use client";
import { ReactNode, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, useGSAP);

/**
 * Leaf component rendered FIRST inside the provider: React commits child
 * effects before parents and earlier siblings before later ones, so this
 * guarantees ScrollSmoother exists before any page ScrollTrigger is
 * created (triggers created before the smoother get re-initialized with
 * broken start values).
 */
function SmootherInit() {
  useGSAP(() => {
    // SPA routing: never let ScrollTrigger restore the previous page's
    // scroll position after a refresh (each route starts at the top)
    ScrollTrigger.clearScrollMemory("manual");
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
      },
    );
    return () => mm.revert();
  });
  return null;
}

/**
 * Every route change starts at the very top, instantly. Without this,
 * ScrollSmoother glides from the old scroll position up to 0 on the new
 * page, firing every scroll animation along the way.
 */
function ScrollReset() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Guard the first moments after a route change: ScrollTrigger refreshes
    // (and any other late writer) can restore the old scroll position, and
    // the global `scroll-behavior: smooth` would turn the correction into a
    // visible glide that fires every scroll animation on the way up.
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const toTop = () => {
      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(0, false);
        smoother.scrollTop(0);
      }
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };
    toTop();

    let raf = 0;
    const until = performance.now() + 500;
    const guard = () => {
      toTop();
      if (performance.now() < until) {
        raf = requestAnimationFrame(guard);
      } else {
        html.style.scrollBehavior = prevBehavior;
      }
    };
    raf = requestAnimationFrame(guard);

    return () => {
      cancelAnimationFrame(raf);
      html.style.scrollBehavior = prevBehavior;
    };
  }, [pathname]);

  return null;
}

export function GsapProvider({ children }: { children: ReactNode }) {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <SmootherInit />
        <ScrollReset />
        {children}
      </div>
    </div>
  );
}
