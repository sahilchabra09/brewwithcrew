import {
  ButtonRow,
  CtaSection,
  PageShell,
  PrinciplesGrid,
  ProcessGrid,
  SectionIntro,
  WorkGrid,
} from "@/components/site";
import {
  industries,
  partnerBenefits,
  serviceGroups,
} from "@/lib/site-data";

export default function Home() {
  return (
    <PageShell>
      <section className="hero">
        <div className="hero-bg grid-bg radial-fade" />
        <div className="container hero-inner">
          <h1>
            Your technology partner for{" "}
            <span className="muted">startups</span> and{" "}
            <span className="underlined">growing businesses</span>.
          </h1>
          <p className="hero-copy">
            We build SaaS products, AI solutions, e-commerce platforms, and
            custom software that help founders and businesses move faster — from
            idea to MVP to scale.
          </p>
          <ButtonRow
            primary={["Book a discovery call", "/contact"]}
            secondary={["View our work", "/work"]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container section-pad">
          <p className="eyebrow" style={{ textAlign: "center" }}>
            Industries we&apos;ve shipped product into
          </p>
          <div className="industry-grid">
            {industries.map((industry) => (
              <div key={industry}>{industry}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-pad partner-layout">
          <SectionIntro
            eyebrow="Trusted partner"
            title="We become an extension of your team — not another vendor."
            body="Founders and operating teams bring us in when they need a real product organisation without months of hiring. We embed, we ship, and we stay."
          />
          <div className="card-grid">
            {partnerBenefits.map((benefit) => (
              <article className="surface-card" key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-pad">
          <SectionIntro
            eyebrow="Services"
            title="Three ways we build with you."
            body="From a first MVP to a full product organisation — engagements scoped to where you are and where you're going."
          />
          <div className="services-grid" style={{ marginTop: "3.5rem" }}>
            {serviceGroups.map((service) => (
              <article className="service-card" key={service.title}>
                <header>
                  <span>/{service.number}</span>
                  <span />
                </header>
                <h3>{service.title}</h3>
                <ul>
                  {service.items.map(([item]) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-pad">
          <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem", alignItems: "end", flexWrap: "wrap" }}>
            <SectionIntro
              eyebrow="Selected work"
              title="Products shipped, businesses scaled."
              body="A look at recent platforms we've built — across healthcare, SaaS, real estate, AI, and commerce."
            />
            <ButtonRow primary={["All work", "/work"]} />
          </div>
          <div style={{ marginTop: "3.5rem" }}>
            <WorkGrid limit={6} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-pad">
          <SectionIntro
            eyebrow="Process"
            title="A premium product process — without the consulting theatre."
            body="Six tight phases, weekly delivery, no surprises."
          />
          <div style={{ marginTop: "3.5rem" }}>
            <ProcessGrid />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-pad">
          <SectionIntro
            eyebrow="Why Brew with Crew"
            title={
              <>
                Serious software for{" "}
                <span className="muted">serious businesses</span>.
              </>
            }
          />
          <div style={{ marginTop: "3.5rem" }}>
            <PrinciplesGrid />
          </div>
        </div>
      </section>

      <CtaSection />
    </PageShell>
  );
}
