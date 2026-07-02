"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { processSteps } from "@/lib/site-data";

gsap.registerPlugin(ScrollTrigger);

const ENTER = "(prefers-reduced-motion: no-preference)";

function StepContent({ step }: { step: (typeof processSteps)[number] }) {
  return (
    <>
      <div className="process-card-top">
        <span>{step.number}</span>
        <span className="roast-label">{step.brewLabel}</span>
        <i />
      </div>
      <h3>{step.title}</h3>
      <p>{step.body}</p>
      <div className="outputs">
        <p className="eyebrow">Outputs</p>
        <ul>
          {step.outputs.map((output) => (
            <li key={output}>{output}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

/**
 * The Process page signature scene: a kettle tips as you scroll, coffee
 * streams down and wraps each step's border in gold (splitting around
 * both sides and meeting at the bottom), then pools into the final
 * "Refills" card as a rising, wavy liquid that inverts the text it
 * covers. Everything is scroll-scrubbed; reduced motion renders the
 * finished state statically.
 */
export function PourFlow() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(ENTER, () => {
        const cleanups: Array<() => void> = [];

        // Kettle tips over its spout tip as the pour begins
        gsap.fromTo(
          ".jug-art",
          { rotation: 3, svgOrigin: "15 45" },
          {
            rotation: -15,
            svgOrigin: "15 45",
            ease: "none",
            scrollTrigger: {
              trigger: ".pour-jug",
              start: "top 82%",
              end: "top 45%",
              scrub: 0.5,
            },
          },
        );

        // Streams extend downward as they reach the viewport
        gsap.utils.toArray<HTMLElement>(".pour-stream", root).forEach((seg) => {
          gsap.fromTo(
            seg,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: seg,
                start: "top 88%",
                end: "bottom 62%",
                scrub: 0.5,
              },
            },
          );
        });

        // Card borders: liquid enters top-center, splits around both
        // sides, and meets at bottom-center. Paths are measured per card.
        gsap.utils.toArray<HTMLElement>(".pour-card", root).forEach((card) => {
          const svg = card.querySelector<SVGSVGElement>(".pour-border");
          if (!svg) return;
          const paths = svg.querySelectorAll("path");
          const setGeometry = () => {
            const w = card.offsetWidth;
            const h = card.offsetHeight;
            const r = 16;
            const cx = w / 2;
            svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
            paths[0].setAttribute(
              "d",
              `M ${cx} 0 H ${r} A ${r} ${r} 0 0 0 0 ${r} V ${h - r} A ${r} ${r} 0 0 0 ${r} ${h} H ${cx}`,
            );
            paths[1].setAttribute(
              "d",
              `M ${cx} 0 H ${w - r} A ${r} ${r} 0 0 1 ${w} ${r} V ${h - r} A ${r} ${r} 0 0 1 ${w - r} ${h} H ${cx}`,
            );
          };
          setGeometry();
          const ro = new ResizeObserver(setGeometry);
          ro.observe(card);
          cleanups.push(() => ro.disconnect());

          gsap.fromTo(
            paths,
            { strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 84%",
                end: "top 42%",
                scrub: 0.5,
              },
            },
          );
        });

        // Refills: the pour accumulates as a rising, wavy pool. Wave
        // opacity is derived from the same fill progress — fades in as the
        // pool starts rising, fades back out as it tops out (a full
        // container has a still surface, and nothing overlays the card).
        const pool = root.querySelector<HTMLElement>(".refill-card");
        if (pool) {
          const w1 = pool.querySelector<HTMLElement>(".refill-wave.w1");
          const w2 = pool.querySelector<HTMLElement>(".refill-wave.w2");
          const ramp = (v: number) => Math.max(0, Math.min(1, v));
          gsap.fromTo(
            pool,
            { "--fill": "0%" },
            {
              "--fill": "100%",
              ease: "none",
              scrollTrigger: {
                trigger: pool,
                start: "top 78%",
                end: "top 22%",
                scrub: 0.5,
                onUpdate: (self) => {
                  const alpha =
                    ramp(self.progress / 0.1) *
                    ramp((1 - self.progress) / 0.1);
                  if (w1) w1.style.opacity = String(alpha);
                  if (w2) w2.style.opacity = String(alpha * 0.55);
                },
              },
            },
          );
          // surface waves drift in opposite directions, endlessly
          gsap.to(".refill-wave.w1", {
            backgroundPositionX: "+=48px",
            duration: 1.7,
            ease: "none",
            repeat: -1,
          });
          gsap.to(".refill-wave.w2", {
            backgroundPositionX: "-=48px",
            duration: 2.6,
            ease: "none",
            repeat: -1,
          });
        }

        return () => cleanups.forEach((fn) => fn());
      });
    },
    { scope: ref },
  );

  const last = processSteps.length - 1;

  return (
    <div className="pour-flow" ref={ref}>
      <div className="pour-jug">
        <svg aria-hidden fill="none" viewBox="0 0 150 100">
          <g className="jug-art">
            {/* kettle body */}
            <path
              d="M60 44 H114 C125 44 133 52 133 62 V64 C133 76 124 86 110 86 H74 C62 86 56 76 58 64 Z"
              stroke="var(--crema)"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            {/* gooseneck spout: rises from low on the body, hooks over, tip points down */}
            <path
              d="M60 62 C40 60 32 48 31 36 C30 26 24 22 18 27 C14 31 13 38 15 45"
              stroke="var(--crema)"
              strokeLinecap="round"
              strokeWidth="4.5"
            />
            {/* lid + knob */}
            <path d="M72 44 V36 H102 V44" stroke="var(--crema)" strokeWidth="3" />
            <circle cx="87" cy="32" fill="var(--crema)" r="3.5" />
            {/* overhead handle */}
            <path
              d="M74 36 C74 16 100 16 100 36"
              stroke="var(--crema)"
              strokeLinecap="round"
              strokeWidth="3"
            />
          </g>
        </svg>
      </div>
      <span aria-hidden className="pour-stream stream-head" />
      {processSteps.map((step, i) => (
        <div className="pour-unit" key={step.title}>
          {i > 0 ? <span aria-hidden className="pour-stream" /> : null}
          <article
            className={
              i === last
                ? "process-card pour-card refill-card"
                : "process-card pour-card"
            }
          >
            <StepContent step={step} />
            {i === last ? (
              <>
                <div aria-hidden className="refill-liquid" />
                <span aria-hidden className="refill-wave w2" />
                <span aria-hidden className="refill-wave w1" />
                <div aria-hidden className="refill-clone">
                  <StepContent step={step} />
                </div>
              </>
            ) : null}
            <svg aria-hidden className="pour-border" preserveAspectRatio="none">
              <path pathLength="1" strokeDasharray="1" strokeDashoffset="1" />
              <path pathLength="1" strokeDasharray="1" strokeDashoffset="1" />
            </svg>
          </article>
        </div>
      ))}
    </div>
  );
}
