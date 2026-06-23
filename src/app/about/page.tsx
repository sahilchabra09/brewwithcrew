import { ButtonRow, PageShell, PrinciplesGrid, SectionIntro } from "@/components/site";

const testimonials = [
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
];

export default function AboutPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <div className="container">
          <SectionIntro
            eyebrow="About"
            title="A technology partner helping founders turn ideas into products."
            body="Brew with Crew is a small, senior product engineering team. We embed with founders and operating teams to design, build, and scale software that businesses actually rely on."
          />
        </div>
      </section>
      <section className="section">
        <div className="container section-pad case-layout">
          <SectionIntro
            eyebrow="Our story"
            title="Founders don't fail for lack of ideas. They fail for lack of execution."
          />
          <div className="case-copy">
            <p>
              We started Brew with Crew because too many great ideas were
              getting stuck on the engineering side. Founders had funding,
              domain expertise, and conviction — but no team capable of turning
              the vision into a real, scalable product.
            </p>
            <p>
              So we built one. A small, opinionated group of product engineers,
              designers, and operators who plug in as the technical arm of the
              business. We&apos;ve shipped hospital platforms, insurance SaaS, AI
              tooling, real-estate products, and commerce systems — for founders
              and operators across the spectrum.
            </p>
            <p>Businesses focus on growth. We handle technology.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container section-pad">
          <SectionIntro eyebrow="Principles" title="What we believe." />
          <div style={{ marginTop: "3.5rem" }}>
            <PrinciplesGrid />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container section-pad">
          <SectionIntro eyebrow="What partners say" title="The work speaks. So do the people we ship for." />
          <div className="card-grid" style={{ marginTop: "3.5rem" }}>
            {testimonials.map(([quote, role, company]) => (
              <article className="surface-card" key={quote}>
                <p style={{ color: "var(--foreground)", fontSize: "1rem" }}>
                  “{quote}”
                </p>
                <p className="eyebrow" style={{ marginTop: "1.5rem" }}>
                  {role}
                </p>
                <p>{company}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="container">
          <SectionIntro title="Let's build the next one together." centered />
          <ButtonRow primary={["Book a discovery call", "/contact"]} />
        </div>
      </section>
    </PageShell>
  );
}
