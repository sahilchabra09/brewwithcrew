import type { Metadata } from "next";
import {
  CtaSection,
  PageHero,
  PageShell,
  SectionIntro,
} from "@/components/site";
import {
  HighlightFill,
  Reveal,
  RevealStagger,
} from "@/components/gsap/primitives";
import { serviceGroups } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Startup development, dedicated product teams, and custom business solutions — engagements scoped to where you are.",
};

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Services · Pick your blend"
        title={
          <>
            Engagements scoped to where you are — and{" "}
            <HighlightFill>where you&apos;re going</HighlightFill>.
          </>
        }
        body="From a first MVP to a long-term product organisation. Three blends, one standard of craft — pick the shape that fits the moment."
      />
      {serviceGroups.map((group) => (
        <section className="section" key={group.title}>
          <div className="container section-pad">
            <Reveal>
              <SectionIntro
                eyebrow={`/${group.number} · ${group.blendTag}`}
                title={
                  <>
                    {group.title}{" "}
                    <span className="blend-label">— {group.blend}</span>
                  </>
                }
                body={group.intro}
              />
            </Reveal>
            <RevealStagger className="card-grid" style={{ marginTop: "3.5rem" }}>
              {group.items.map(([title, body]) => (
                <article className="surface-card" key={title}>
                  <p className="eyebrow">Capability</p>
                  <h3 style={{ marginTop: "1rem" }}>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </RevealStagger>
          </div>
        </section>
      ))}
      <CtaSection
        title="Not sure which blend fits?"
        body="Tell us about your product — we'll help shape the engagement around the outcome you need."
      />
    </PageShell>
  );
}
