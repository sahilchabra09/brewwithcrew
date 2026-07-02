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

        // Kettle tips over its spout as the pour begins
        gsap.fromTo(
          ".jug-art",
          { rotation: 4, svgOrigin: "14 56" },
          {
            rotation: -17,
            svgOrigin: "14 56",
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

        // Refills: the pour accumulates as a rising, wavy pool
        const pool = root.querySelector<HTMLElement>(".refill-card");
        if (pool) {
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
              },
            },
          );
          // waves surface as soon as the pool starts rising
          gsap.fromTo(
            ".refill-wave.w1",
            { opacity: 0 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: pool,
                start: "top 78%",
                end: "top 72%",
                scrub: 0.5,
              },
            },
          );
          gsap.fromTo(
            ".refill-wave.w2",
            { opacity: 0 },
            {
              opacity: 0.55,
              ease: "none",
              scrollTrigger: {
                trigger: pool,
                start: "top 78%",
                end: "top 72%",
                scrub: 0.5,
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
        <svg aria-hidden fill="none" viewBox="0 0 130 95">
          <g className="jug-art">
            {/* body */}
            <path
              d="M36 34 H100 C110 34 116 42 116 52 V60 C116 74 106 84 92 84 H52 C40 84 32 74 32 62 Z"
              stroke="var(--crema)"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            {/* spout */}
            <path
              d="M36 38 L14 56 L34 61"
              stroke="var(--crema)"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            {/* lid + knob */}
            <path d="M54 34 V27 H86 V34" stroke="var(--crema)" strokeWidth="3" />
            <circle cx="70" cy="23" fill="var(--crema)" r="3.5" />
            {/* handle */}
            <path
              d="M116 48 h5 c9 0 9 20 0 20 h-7"
              stroke="var(--crema)"
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
