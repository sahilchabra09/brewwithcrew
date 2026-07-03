"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BrewCup } from "@/components/decor";
import { processSteps } from "@/lib/site-data";

gsap.registerPlugin(ScrollTrigger);

/**
 * Signature scene: the section pins while the cup fills and the six
 * steps "brew" in sequence. On touch, small screens, or reduced motion
 * it renders as a plain stacked list with a simple reveal.
 */
export function BrewMethod() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Pinned scene only where the whole stage fits: wide, TALL viewports
      // (short laptops used to start the fill before the cup was even
      // visible — they get the stacked version instead).
      mm.add(
        "(min-width: 900px) and (min-height: 760px) and (prefers-reduced-motion: no-preference) and (pointer: fine)",
        () => {
          const root = ref.current;
          if (!root) return;
          const steps = gsap.utils.toArray<HTMLElement>(".brew-step");
          const liquid = root.querySelector<SVGRectElement>(".cup-liquid");
          const steam = root.querySelector<SVGGElement>(".cup-steam");
          const readout = root.querySelector<HTMLElement>(".brew-readout");
          if (!liquid) return;

          // First 15% of the pin is a dead zone so the brewing only starts
          // once the scene has settled fully in view.
          const DEAD = 0.15;
          const brew = (p: number) =>
            Math.max(0, Math.min(1, (p - DEAD) / (1 - DEAD)));

          // animate the rect's geometry (not transforms — SVG transform
          // matrices at scale 0 produce NaN warnings in some browsers)
          gsap.set(liquid, { attr: { height: 0, y: 158 } });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: "top top+=96",
              end: "+=1800",
              pin: true,
              anticipatePin: 1,
              scrub: 0.4,
              onUpdate: (self) => {
                const p = brew(self.progress);
                const active =
                  p === 0
                    ? -1
                    : Math.min(steps.length - 1, Math.floor(p * steps.length));
                steps.forEach((step, i) =>
                  step.classList.toggle("active", i <= active),
                );
                if (steam) {
                  steam.style.opacity = String(Math.max(0, (p - 0.86) / 0.14));
                }
                if (readout) {
                  readout.textContent =
                    p >= 0.999
                      ? "extraction complete · ready to pour"
                      : `extraction ${Math.round(p * 100)}%`;
                }
              },
            },
          });
          tl.to({}, { duration: DEAD }).to(liquid, {
            attr: { height: 98, y: 60 },
            ease: "none",
            duration: 1 - DEAD,
          });
        },
      );

      // Everywhere else: simple stagger, every step fully styled
      mm.add(
        "(max-width: 899px), (max-height: 759px), (prefers-reduced-motion: reduce), (pointer: coarse)",
        () => {
          const steps = gsap.utils.toArray<HTMLElement>(".brew-step");
          steps.forEach((step) => step.classList.add("active"));
          // cup markup defaults to full; nothing to set here
          mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(steps, {
              y: 26,
              autoAlpha: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.08,
              clearProps: "all",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                once: true,
              },
            });
          });
        },
      );
    },
    { scope: ref },
  );

  return (
    <div className="brew-scene" ref={ref}>
      <div className="container section-pad">
        <div className="brew-stage">
          <div className="brew-left">
            <div className="section-intro">
              <div className="intro-kicker">
                <span />
                <p className="eyebrow">The Brew Method</p>
              </div>
              <h2>
                Six steps from <em>bean to cup</em> — no consulting theatre.
              </h2>
              <p>
                One tight process, weekly delivery, real software at the end of
                every cycle. Scroll to brew.
              </p>
            </div>
            <div className="brew-cup-wrap">
              <BrewCup />
              <p className="roast-label brew-progress">
                <span className="brew-readout">extraction 0%</span>
              </p>
            </div>
          </div>
          <div className="brew-steps">
            {processSteps.map((step) => (
              <article className="brew-step" key={step.title}>
                <div className="brew-step-top">
                  <span className="roast-label">
                    {step.number} · {step.brewLabel}
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{shortCopy[step.title]}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


const shortCopy: Record<string, string> = {
  Discovery: "Goals, constraints, risk, and the smallest valuable surface.",
  Strategy: "Architecture, roadmap, and the boring-but-critical decisions.",
  Design: "UX systems and interfaces built for clarity and speed.",
  Development: "Type-safe, observable, well-tested code in weekly cycles.",
  Launch: "Rollout, monitoring, and on-call coverage from day zero.",
  Growth: "Iterate, scale, and harden as the business evolves.",
};
