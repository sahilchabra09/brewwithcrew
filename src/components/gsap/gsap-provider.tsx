"use client";
import { ReactNode } from "react";
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

export function GsapProvider({ children }: { children: ReactNode }) {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <SmootherInit />
        {children}
      </div>
    </div>
  );
}
