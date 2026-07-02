"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const ENTER = "(prefers-reduced-motion: no-preference)";

/**
 * A soft gold glow that trails the cursor. Fine pointers only, reduced
 * motion disables it. Purely decorative — never intercepts pointer events.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${ENTER} and (pointer: fine)`, () => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
        const move = (event: MouseEvent) => {
          xTo(event.clientX);
          yTo(event.clientY);
        };
        const show = () => gsap.to(el, { autoAlpha: 1, duration: 0.4 });
        const hide = () => gsap.to(el, { autoAlpha: 0, duration: 0.4 });

        // On click the cursor "becomes" a little cup that fills bottom-up and
        // follows the pointer for a beat, then fades. The real cursor is
        // hidden (body.brewing) while any cup is brewing.
        let seq = 0;
        let active = 0;
        const brew = (event: MouseEvent) => {
          const id = `cf-${seq++}`;
          const burst = document.createElement("div");
          burst.className = "click-brew";
          const body = "M7 10 H23 V22 c0 3 -2 5 -5 5 H12 c-3 0 -5 -2 -5 -5 Z";
          // fill rect: bottom pinned at y=27, grows upward as height increases
          burst.innerHTML = `<svg viewBox="0 0 32 32" fill="none" width="34" height="34">
            <clipPath id="${id}"><path d="${body}"/></clipPath>
            <g clip-path="url(#${id})"><rect class="cf" x="7" y="27" width="16" height="0" fill="var(--brew)"/></g>
            <path d="${body}" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M23 13 h3 c2.5 0 4 1.6 4 3.5 s-1.5 3.5 -4 3.5 h-3" stroke="currentColor" stroke-width="2"/>
          </svg>`;
          document.body.appendChild(burst);

          active++;
          document.body.classList.add("brewing");

          // follow the pointer so it reads as the cursor
          gsap.set(burst, { x: event.clientX, y: event.clientY });
          const qx = gsap.quickTo(burst, "x", { duration: 0.18, ease: "power2" });
          const qy = gsap.quickTo(burst, "y", { duration: 0.18, ease: "power2" });
          const follow = (e: MouseEvent) => {
            qx(e.clientX);
            qy(e.clientY);
          };
          window.addEventListener("mousemove", follow);

          const cleanup = () => {
            window.removeEventListener("mousemove", follow);
            burst.remove();
            active = Math.max(0, active - 1);
            if (active === 0) document.body.classList.remove("brewing");
          };

          const fill = burst.querySelector(".cf");
          gsap
            .timeline({ onComplete: cleanup })
            .fromTo(
              burst,
              { scale: 0.5, autoAlpha: 0 },
              { scale: 1, autoAlpha: 1, duration: 0.18, ease: "back.out(2)" },
            )
            // fill bottom→top: bottom stays at 27, top rises 27→11
            .fromTo(
              fill,
              { attr: { y: 27, height: 0 } },
              { attr: { y: 11, height: 16 }, duration: 0.55, ease: "power1.inOut" },
              0.1,
            )
            // fade + puff; don't touch y (quickTo owns it for following)
            .to(burst, { autoAlpha: 0, scale: 1.3, duration: 0.28, ease: "power1.in" }, "+=0.12");
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("click", brew);
        document.addEventListener("mouseenter", show);
        document.addEventListener("mouseleave", hide);
        return () => {
          window.removeEventListener("mousemove", move);
          window.removeEventListener("click", brew);
          document.removeEventListener("mouseenter", show);
          document.removeEventListener("mouseleave", hide);
          document.body.classList.remove("brewing");
        };
      });
    },
    { scope: ref },
  );

  return <div aria-hidden className="cursor-glow" ref={ref} />;
}

/** The crew: three cups clustered together — a little team mark. */
export function CrewMark({ className }: { className?: string }) {
  // draw back-to-front; front cups are filled so they occlude cleanly
  const cups = [
    { x: 30, y: 8, o: 0.55 },
    { x: 8, y: 5, o: 0.8 },
    { x: 19, y: 2, o: 1 },
  ];
  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 76 44">
      {cups.map((c) => (
        <g key={c.x} opacity={c.o}>
          {/* steam tick */}
          <path
            d={`M${c.x + 9} ${c.y - 2} q -3 -4 0 -8`}
            stroke="var(--latte)"
            strokeLinecap="round"
            strokeWidth="1.6"
          />
          {/* handle (behind the body) */}
          <path
            d={`M${c.x + 18} ${c.y + 12} h3 c3 0 5 2 5 4 s-2 4 -5 4 h-3`}
            stroke="currentColor"
            strokeWidth="2.2"
          />
          {/* cup body — filled to occlude the cup behind it */}
          <path
            d={`M${c.x} ${c.y + 6} H${c.x + 18} V${c.y + 18} c0 4 -3 7 -7 7 h-4 c-4 0 -7 -3 -7 -7 Z`}
            fill="var(--background)"
            stroke="currentColor"
            strokeWidth="2.2"
          />
        </g>
      ))}
    </svg>
  );
}

/** Three wisps of steam that drift upward on a loop. */
export function Steam({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(ENTER, () => {
        gsap.utils.toArray<SVGPathElement>(".steam-path").forEach((path, i) => {
          gsap
            .timeline({ repeat: -1, delay: i * 0.8 })
            .fromTo(
              path,
              { y: 16, opacity: 0 },
              { y: 0, opacity: 0.65, duration: 1.3, ease: "sine.out" },
            )
            .to(path, {
              y: -22,
              opacity: 0,
              duration: 1.6 + i * 0.4,
              ease: "sine.in",
            });
        });
      });
    },
    { scope: ref },
  );

  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      ref={ref}
      viewBox="0 0 60 80"
    >
      <path
        className="steam-path"
        d="M18 66 C14 56, 24 50, 20 40 C16 30, 24 24, 21 14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <path
        className="steam-path"
        d="M32 70 C28 58, 38 52, 33 40 C29 30, 37 22, 33 10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <path
        className="steam-path"
        d="M46 66 C42 56, 52 50, 47 40 C43 32, 50 26, 47 16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}

/** A single coffee-bean glyph. */
export function Bean({
  size = 22,
  rotate = 0,
  className,
}: {
  size?: number;
  rotate?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      height={size}
      style={{ transform: `rotate(${rotate}deg)` }}
      viewBox="0 0 24 24"
      width={size}
    >
      <ellipse
        cx="12"
        cy="12"
        fill="currentColor"
        opacity="0.9"
        rx="7.5"
        ry="10.5"
      />
      <path
        d="M12 2.5 C8.5 8, 15.5 16, 12 21.5"
        stroke="var(--background)"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

/**
 * Deterministic scatter of beans with a slow ambient drift. On fine
 * pointers the field also leans gently toward the cursor (`interactive`).
 */
export function BeanField({
  count = 7,
  className,
  interactive = false,
}: {
  count?: number;
  className?: string;
  interactive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(ENTER, () => {
        gsap.utils.toArray<HTMLElement>(".bean-drift", root).forEach((el, i) => {
          gsap.to(el, {
            y: 8 + (i % 3) * 4,
            rotation: i % 2 ? 6 : -6,
            duration: 4 + (i % 4),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: (i * 0.6) % 2,
          });
        });
      });

      if (interactive) {
        mm.add(`${ENTER} and (pointer: fine)`, () => {
          const xTo = gsap.quickTo(root, "x", { duration: 1.2, ease: "power2" });
          const yTo = gsap.quickTo(root, "y", { duration: 1.2, ease: "power2" });
          const move = (event: MouseEvent) => {
            const nx = event.clientX / window.innerWidth - 0.5;
            const ny = event.clientY / window.innerHeight - 0.5;
            xTo(nx * 24);
            yTo(ny * 18);
          };
          window.addEventListener("mousemove", move);
          return () => window.removeEventListener("mousemove", move);
        });
      }
    },
    { scope: ref, dependencies: [interactive] },
  );

  // Deterministic pseudo-random layout (no Math.random → no hydration drift)
  const beans = Array.from({ length: count }, (_, i) => {
    const seed = (i * 137.508) % 360;
    return {
      left: `${(i * 89 + 13) % 97}%`,
      top: `${(i * 53 + 7) % 90}%`,
      rotate: seed,
      size: 14 + ((i * 7) % 12),
      speed: 0.75 + ((i * 13) % 40) / 100,
      opacity: 0.1 + ((i * 11) % 12) / 100,
    };
  });

  return (
    <div
      aria-hidden
      className={className ? `bean-field ${className}` : "bean-field"}
      ref={ref}
    >
      {beans.map((bean, i) => (
        <span
          className="bean-drift"
          data-speed={bean.speed}
          key={i}
          style={{
            position: "absolute",
            left: bean.left,
            top: bean.top,
            opacity: bean.opacity,
            color: "var(--brew)",
          }}
        >
          <Bean rotate={bean.rotate} size={bean.size} />
        </span>
      ))}
    </div>
  );
}

/** Faint ring stain, like a mug left on the design. */
export function CoffeeRing({
  size = 280,
  className,
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      height={size}
      style={style}
      viewBox="0 0 200 200"
      width={size}
    >
      <circle
        cx="100"
        cy="100"
        opacity="0.5"
        r="88"
        stroke="currentColor"
        strokeDasharray="230 40 120 18"
        strokeWidth="7"
      />
      <circle
        cx="100"
        cy="100"
        opacity="0.35"
        r="78"
        stroke="currentColor"
        strokeDasharray="60 26 300 30"
        strokeWidth="3"
      />
    </svg>
  );
}

/**
 * Line-drawn cup whose fill level is driven externally: the Brew Method
 * timeline tweens the `.cup-liquid` element's scaleY from 0 → 1.
 */
export function BrewCup({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 200 190"
    >
      <defs>
        <clipPath id="cup-clip">
          <path d="M40 60 H150 V128 C150 146 136 158 118 158 H72 C54 158 40 146 40 128 Z" />
        </clipPath>
      </defs>
      {/* liquid — scaleY driven by GSAP, origin at the cup floor */}
      <g clipPath="url(#cup-clip)">
        <rect
          className="cup-liquid"
          fill="var(--brew)"
          height="98"
          opacity="0.85"
          width="110"
          x="40"
          y="60"
        />
      </g>
      {/* cup outline */}
      <path
        d="M40 60 H150 V128 C150 146 136 158 118 158 H72 C54 158 40 146 40 128 Z"
        stroke="currentColor"
        strokeWidth="4"
      />
      {/* handle */}
      <path
        d="M150 78 H162 C176 78 184 88 184 100 C184 112 176 122 162 122 H150"
        stroke="currentColor"
        strokeWidth="4"
      />
      {/* saucer */}
      <path
        d="M28 172 H162"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="4"
      />
      {/* steam above the cup */}
      <g className="cup-steam" opacity="0">
        <path
          d="M78 44 C74 36, 82 30, 78 20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <path
          d="M96 48 C92 38, 100 32, 96 20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <path
          d="M114 44 C110 36, 118 30, 114 20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
}
