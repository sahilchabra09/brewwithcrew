"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { BeanField, Steam } from "@/components/decor";
import {
  Counter,
  Magnetic,
  Squiggle,
  STATS_REVEAL_EVENT,
} from "@/components/gsap/primitives";
import { INTRO_DONE_EVENT, introIsPending } from "@/components/intro";
import { roastStats } from "@/lib/site-data";

gsap.registerPlugin(SplitText);

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".hero-headline", {
          type: "lines",
          mask: "lines",
        });
        const tl = gsap
          .timeline({
            defaults: { ease: "power3.out" },
            paused: introIsPending(),
          })
          // headline starts hidden via CSS (no first-paint blur flash);
          // reveal it here — masked lines keep it invisible until they rise
          .set(".hero-headline", { autoAlpha: 1 })
          .from(".hero-bloom", { scale: 0.6, autoAlpha: 0, duration: 1.2 })
          .from(
            split.lines,
            {
              yPercent: 118,
              rotationZ: 2,
              filter: "blur(12px)",
              duration: 1.1,
              ease: "power4.out",
              stagger: 0.12,
            },
            "-=0.35",
          )
          .from(
            ".hero-subtitle, .hero-copy",
            { y: 22, autoAlpha: 0, duration: 0.7, stagger: 0.12 },
            "-=0.55",
          )
          .from(
            ".button-row, .hero-stats",
            { y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.12 },
            "-=0.35",
          )
          .from(
            ".hero-beans .bean-drift",
            {
              scale: 0,
              autoAlpha: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
              stagger: { each: 0.06, from: "random" },
            },
            "-=0.7",
          )
          .from(".hero-steam", { autoAlpha: 0, duration: 0.9 }, "-=0.5")
          // stats are on screen now — let the counters tick
          .call(() =>
            window.dispatchEvent(new CustomEvent(STATS_REVEAL_EVENT)),
          );

        // gentle continuous breathing on the bloom once the entrance settles
        tl.to(".hero-bloom", {
          scale: 1.08,
          opacity: 0.85,
          duration: 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        const play = () => tl.play();
        if (introIsPending()) {
          window.addEventListener(INTRO_DONE_EVENT, play, { once: true });
        }
        return () => {
          window.removeEventListener(INTRO_DONE_EVENT, play);
          split.revert();
        };
      });

      // Pointer depth: layers lean toward the cursor at different rates
      mm.add(
        "(prefers-reduced-motion: no-preference) and (pointer: fine)",
        () => {
          const layers: Array<[string, number]> = [
            [".hero-steam", 26],
            [".hero-beans", 16],
            [".hero-bloom", 12],
            [".hero-bg", 8],
          ];
          const movers = layers
            .map(([sel, depth]) => {
              const el = ref.current?.querySelector(sel);
              if (!el) return null;
              return {
                depth,
                x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power2" }),
                y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power2" }),
              };
            })
            .filter(Boolean) as Array<{
            depth: number;
            x: (v: number) => void;
            y: (v: number) => void;
          }>;
          const move = (event: MouseEvent) => {
            const nx = event.clientX / window.innerWidth - 0.5;
            const ny = event.clientY / window.innerHeight - 0.5;
            movers.forEach((m) => {
              m.x(nx * m.depth);
              m.y(ny * m.depth * 0.7);
            });
          };
          window.addEventListener("mousemove", move);
          return () => window.removeEventListener("mousemove", move);
        },
      );
    },
    { scope: ref },
  );

  return (
    <section className="hero" ref={ref}>
      <div className="hero-bg grid-bg radial-fade" />
      <div aria-hidden className="hero-bloom" />
      <BeanField className="hero-beans" count={6} />
      <div className="container hero-inner">
        <div style={{ position: "relative" }}>
          <Steam className="hero-steam" />
          <h1 className="hero-headline">
            Serious software, <em>freshly brewed.</em>
          </h1>
        </div>
        <p className="hero-subtitle">
          Your technology partner for <span className="muted">startups</span>{" "}
          and <Squiggle>growing businesses</Squiggle>.
        </p>
        <p className="hero-copy">
          We build SaaS products, AI solutions, e-commerce platforms, and
          custom software that help founders move faster — from the{" "}
          <span className="ink">first shot</span> to the{" "}
          <span className="ink">full pour</span>.
        </p>
        <div className="button-row">
          <Magnetic>
            <Link className="button primary" href="/contact">
              Book a discovery call <span>→</span>
            </Link>
          </Magnetic>
          <Link className="button secondary" href="/work">
            View our work <span>→</span>
          </Link>
        </div>
        <div className="hero-stats">
          {roastStats.map((stat) => (
            <div key={stat.label}>
              <p className="eyebrow">{stat.label}</p>
              <strong>
                <Counter from={stat.from} value={stat.value} />
              </strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
