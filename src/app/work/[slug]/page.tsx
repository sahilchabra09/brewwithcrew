import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ButtonRow,
  PageShell,
  ProjectCard,
  SectionIntro,
} from "@/components/site";
import { projects } from "@/lib/site-data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  return {
    title: project ? `${project.title} — Brew with Crew` : "Work — Brew with Crew",
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const related = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);
  const overview =
    project.overview ??
    `${project.summary} This project was shaped as a focused product engagement with clean implementation, responsive UI, and a maintainable modern stack.`;
  const built = project.built ?? [
    "Premium responsive frontend",
    "Content and conversion-focused page structure",
    "Modern component architecture",
    "Performance-conscious delivery",
  ];
  const outcomes = project.outcomes ?? [
    ["Delivery", "Shipped"],
    ["Experience", "Responsive"],
    ["Stack", "Modern"],
  ];

  return (
    <PageShell>
      <section className="page-hero">
        <div className="container detail-hero-grid">
          <div>
            <Link className="pill-link" href="/work">
              ← All work
            </Link>
            <SectionIntro
              eyebrow={project.type}
              title={project.title}
              body={project.summary}
            />
            {project.website ? (
              <div className="button-row" style={{ marginTop: "1.5rem" }}>
                <Link
                  className="button secondary"
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  View live <span>↗</span>
                </Link>
              </div>
            ) : null}
          </div>
          <div className="case-meta">
            <div>
              <p className="eyebrow">Industry</p>
              <strong>{project.industry}</strong>
            </div>
            <div>
              <p className="eyebrow">Status</p>
              <strong>{project.status}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-pad">
          <div className="project-art" style={{ border: "1px solid var(--hairline)", borderRadius: "1rem" }}>
            <div className="grid-overlay grid-bg" />
            <div className="project-art-meta">
              <span>{project.industry}</span>
              <span>{project.code}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-pad case-layout">
          <div className="case-copy">
            <h2>Overview</h2>
            <p>{overview}</p>
            <h2 style={{ marginTop: "3rem" }}>What we built</h2>
            <ul className="built-list" style={{ marginTop: "1.5rem" }}>
              {built.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <aside>
            <p className="eyebrow">Stack</p>
            <div className="tags" style={{ marginTop: "1rem" }}>
              {project.stack.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container section-pad">
          <p className="eyebrow">Outcomes</p>
          <div className="outcome-grid" style={{ marginTop: "1rem" }}>
            {outcomes.map(([label, value]) => (
              <div key={label}>
                <p className="eyebrow">{label}</p>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-pad">
          <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem", alignItems: "end", flexWrap: "wrap" }}>
            <SectionIntro eyebrow="Continue exploring" title="Continue exploring" />
            <ButtonRow primary={["All work", "/work"]} />
          </div>
          <div className="work-grid" style={{ marginTop: "3.5rem" }}>
            {related.map((item) => (
              <ProjectCard key={item.slug} project={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <SectionIntro
            title="Have a product in mind?"
            body="Tell us about it — we'll come back with a plan."
            centered
          />
          <ButtonRow primary={["Book a discovery call", "/contact"]} />
        </div>
      </section>
    </PageShell>
  );
}
