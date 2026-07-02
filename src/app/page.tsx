import {
  ButtonRow,
  CtaSection,
  PageShell,
  PrinciplesGrid,
  SectionIntro,
  WorkGrid,
} from "@/components/site";
import { BrewMethod } from "@/components/home/brew-method";
import { Hero } from "@/components/home/hero";
import {
  HighlightFill,
  Marquee,
  Reveal,
  RevealStagger,
  Squiggle,
} from "@/components/gsap/primitives";
import { marqueeItems, partnerBenefits, serviceGroups } from "@/lib/site-data";

export default function Home() {
  return (
    <PageShell>
      <Hero />

      <section className="section">
        <div style={{ paddingBlock: "2.5rem" }}>
          <p className="eyebrow" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            What&apos;s brewing — industries we&apos;ve shipped into
          </p>
          <Marquee items={marqueeItems} />
        </div>
      </section>

      <section className="section">
        <div className="container section-pad partner-layout">
          <Reveal>
            <SectionIntro
              eyebrow="Trusted partner"
              title={
                <>
                  We become an{" "}
                  <HighlightFill>extension of your team</HighlightFill> — not
                  another vendor.
                </>
              }
              body="Founders and operating teams bring us in when they need a real product organisation without months of hiring. We embed, we ship, and we stay."
            />
          </Reveal>
          <RevealStagger className="card-grid">
            {partnerBenefits.map((benefit) => (
              <article className="surface-card" key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </article>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="section">
        <div className="container section-pad">
          <Reveal>
            <SectionIntro
              eyebrow="Pick your blend"
              title={
                <>
                  Three ways we <Squiggle>build</Squiggle> with you.
                </>
              }
              body="From a first MVP to a full product organisation — engagements scoped to where you are and where you're going."
            />
          </Reveal>
          <RevealStagger className="services-grid" style={{ marginTop: "3.5rem" }}>
            {serviceGroups.map((service) => (
              <article className="service-card" key={service.title}>
                <header>
                  <span>/{service.number}</span>
                  <span />
                </header>
                <p className="roast-label" style={{ marginTop: "2rem" }}>
                  {service.blendTag}
                </p>
                <h3 style={{ marginTop: "0.5rem" }}>{service.title}</h3>
                <span className="blend-label">{service.blend}</span>
                <ul>
                  {service.items.map(([item]) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="section">
        <div className="container section-pad">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "2rem",
              alignItems: "end",
              flexWrap: "wrap",
            }}
          >
            <Reveal>
              <SectionIntro
                eyebrow="Fresh from the roastery"
                title={
                  <>
                    Products <HighlightFill>shipped,</HighlightFill> businesses
                    scaled.
                  </>
                }
                body="A look at recent platforms we've built — across healthcare, SaaS, real estate, AI, and commerce."
              />
            </Reveal>
            <ButtonRow primary={["All work", "/work"]} />
          </div>
          <div style={{ marginTop: "3.5rem" }}>
            <WorkGrid limit={6} />
          </div>
        </div>
      </section>

      <section className="section">
        <BrewMethod />
      </section>

      <section className="section">
        <div className="container section-pad">
          <Reveal>
            <SectionIntro
              eyebrow="Why Brew with Crew"
              title={
                <>
                  Serious software for{" "}
                  <Squiggle>serious businesses</Squiggle>.
                </>
              }
            />
          </Reveal>
          <Reveal style={{ marginTop: "3.5rem" }}>
            <PrinciplesGrid />
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </PageShell>
  );
}
