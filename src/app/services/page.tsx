import { ButtonRow, PageShell, SectionIntro } from "@/components/site";
import { serviceGroups } from "@/lib/site-data";

export default function ServicesPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <div className="container">
          <SectionIntro
            eyebrow="Services"
            title="Engagements scoped to where you are — and where you're going."
            body="From a first MVP to a long-term product organisation. Pick the shape that fits the moment."
          />
        </div>
      </section>
      {serviceGroups.map((group) => (
        <section className="section" key={group.title}>
          <div className="container section-pad">
            <SectionIntro
              eyebrow={`/${group.number}`}
              title={group.title}
              body={group.intro}
            />
            <div className="card-grid" style={{ marginTop: "3.5rem" }}>
              {group.items.map(([title, body]) => (
                <article className="surface-card" key={title}>
                  <p className="eyebrow">Capability</p>
                  <h3 style={{ marginTop: "1rem" }}>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
      <section className="cta-section">
        <div className="container">
          <SectionIntro
            title="Tell us about your product."
            body="We’ll help shape the engagement around the outcome you need."
            centered
          />
          <ButtonRow primary={["Tell us about your product", "/contact"]} />
        </div>
      </section>
    </PageShell>
  );
}
