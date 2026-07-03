"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const REVIEWS: Array<[quote: string, role: string, company: string]> = [
  [
    "They became our product team. Inside two months we were shipping faster than we'd managed in the previous year.",
    "Founder",
    "Insurance SaaS · Confidential",
  ],
  [
    "Cleanest engineering org we've worked with. Specs in, working product out — every Friday.",
    "CTO",
    "Healthcare platform",
  ],
  [
    "They cared about the business outcome, not the ticket. That's rare and it changed how we shipped.",
    "COO",
    "E-commerce",
  ],
  [
    "Our reconciliation used to take a full day per broker. Now it's three seconds. I still don't fully believe it.",
    "Operations Head",
    "Insurance SaaS",
  ],
  [
    "We handed them a spreadsheet and a dream. They handed back a platform our whole team runs on daily.",
    "Managing Director",
    "Real Estate",
  ],
  [
    "The demos every Friday kept everyone honest — us included. Best vendor cadence we've ever had.",
    "Product Lead",
    "Healthcare platform",
  ],
  [
    "Zero drama, zero surprises, and the handover docs were cleaner than our own codebase.",
    "Engineering Manager",
    "Sales Intelligence",
  ],
];

const VISIBLE = 2; // cards shown on each side of the active one
const AUTO_MS = 7000;

/** Signed shortest circular distance from active to index. */
function circularOffset(index: number, active: number, length: number) {
  let d = index - active;
  if (d > length / 2) d -= length;
  if (d < -length / 2) d += length;
  return d;
}

/**
 * 3D testimonial ring: the active card faces you, neighbours tilt away
 * like shelved records. Auto-advances, pausable by hover; arrows, dots,
 * and swipe all work. Reduced motion snaps instead of animating.
 */
export function TestimonialCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  const step = useCallback((dir: number) => {
    setActive((a) => (a + dir + REVIEWS.length) % REVIEWS.length);
  }, []);

  // auto-advance, paused while the pointer is over the carousel
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!pausedRef.current) step(1);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [step]);

  // position every card relative to the active one
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const instant = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const cards = gsap.utils.toArray<HTMLElement>(".tc-card", root);
      cards.forEach((card, i) => {
        const off = circularOffset(i, active, cards.length);
        const shown = Math.abs(off) <= VISIBLE;
        const vars = {
          // -50 centers the card on the stage; offsets fan out from there
          xPercent: -50 + off * 62,
          rotationY: off * -32,
          z: -Math.abs(off) * 150,
          scale: off === 0 ? 1 : 0.88,
          autoAlpha: shown ? (off === 0 ? 1 : 0.45) : 0,
          zIndex: 10 - Math.abs(off),
          duration: instant ? 0 : 0.75,
          ease: "power3.out",
        };
        gsap.to(card, vars);
        card.classList.toggle("is-active", off === 0);
        card.toggleAttribute("inert", off !== 0);
      });
    },
    { scope: ref, dependencies: [active] },
  );

  // swipe on touch / drag on desktop
  const dragX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    dragX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current === null) return;
    const delta = e.clientX - dragX.current;
    dragX.current = null;
    if (Math.abs(delta) > 40) step(delta < 0 ? 1 : -1);
  };

  return (
    <div
      aria-roledescription="carousel"
      className="tcarousel"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      ref={ref}
    >
      <div
        className="tc-stage"
        onPointerCancel={() => (dragX.current = null)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {REVIEWS.map(([quote, role, company]) => (
          <article className="tc-card" key={role + company}>
            <p className="tc-quote">“{quote}”</p>
            <p className="eyebrow tc-role">{role}</p>
            <p className="tc-company">{company}</p>
          </article>
        ))}
      </div>
      <div className="tc-controls">
        <button
          aria-label="Previous testimonial"
          className="tc-arrow"
          onClick={() => step(-1)}
          type="button"
        >
          ←
        </button>
        <div className="tc-dots">
          {REVIEWS.map((_, i) => (
            <button
              aria-label={`Go to testimonial ${i + 1}`}
              className={i === active ? "tc-dot on" : "tc-dot"}
              key={i}
              onClick={() => setActive(i)}
              type="button"
            />
          ))}
        </div>
        <button
          aria-label="Next testimonial"
          className="tc-arrow"
          onClick={() => step(1)}
          type="button"
        >
          →
        </button>
      </div>
    </div>
  );
}
