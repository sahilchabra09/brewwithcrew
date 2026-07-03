import type { Metadata } from "next";
import {
  CtaSection,
  PageHero,
  PageShell,
  PrinciplesGrid,
  SectionIntro,
} from "@/components/site";
import { TestimonialCarousel } from "@/components/about/testimonial-carousel";
import { BeanField, CrewMark } from "@/components/decor";
import {
  HighlightFill,
  Reveal,
  Squiggle,
} from "@/components/gsap/primitives";

export const metadata: Metadata = {
  title: "About",
  description:
    "Brew with Crew is a small, senior product engineering team that embeds with founders to design, build, and scale software.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title={
          <>
            The <Squiggle>crew</Squiggle> behind the brew.
          </>
        }
        body="Brew with Crew is a small, senior product engineering team. We embed with founders and operating teams to design, build, and scale software that businesses actually rely on."
      >
        <CrewMark className="crew-mark" />
      </PageHero>
      <section className="section story-section">
        <div className="story-glow" />
        <BeanField count={6} interactive />
        <div className="container section-pad case-layout">
          <Reveal>
            <SectionIntro
              eyebrow="Our story"
              title={
                <>
                  Founders don&apos;t fail for lack of ideas. They fail for lack
                  of <HighlightFill>execution</HighlightFill>.
                </>
              }
            />
          </Reveal>
          <Reveal className="case-copy" delay={0.1}>
            <p>
              We started Brew with Crew because too many great ideas were
              getting stuck on the engineering side. Founders had funding,
              domain expertise, and conviction — but{" "}
              <span className="ink-strong">
                no team capable of turning the vision into a real, scalable
                product
              </span>
              .
            </p>
            <p>
              So we built one. A small, opinionated group of product engineers,
              designers, and operators who plug in as the technical arm of the
              business. We&apos;ve shipped hospital platforms, insurance SaaS, AI
              tooling, real-estate products, and commerce systems — for founders
              and operators across the spectrum.
            </p>
            <p>
              Businesses focus on growth.{" "}
              <span className="ink-strong">We handle technology.</span>{" "}
              That&apos;s the whole recipe.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container section-pad">
          <Reveal>
            <SectionIntro
              eyebrow="Principles"
              title={
                <>
                  What we <em>believe</em>.
                </>
              }
            />
          </Reveal>
          <Reveal style={{ marginTop: "3.5rem" }}>
            <PrinciplesGrid />
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container section-pad">
          <Reveal>
            <SectionIntro
              eyebrow="What partners say"
              title={
                <>
                  The work speaks. So do the people we{" "}
                  <HighlightFill>ship</HighlightFill> for.
                </>
              }
            />
          </Reveal>
          <TestimonialCarousel />
        </div>
      </section>
      <CtaSection
        title="Let's brew the next one together."
        body="Tell us what you're building — we'll bring the crew."
      />
    </PageShell>
  );
}
