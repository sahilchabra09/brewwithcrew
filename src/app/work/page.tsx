import { PageShell, ProjectCard, SectionIntro } from "@/components/site";
import { industries, projects } from "@/lib/site-data";

export default function WorkPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <div className="container">
          <SectionIntro
            eyebrow="Selected work"
            title="Products built for real businesses."
            body="A working portfolio across healthcare, insurance SaaS, real estate, AI tooling, e-commerce, and more. Click any project for the full case."
          />
          <div className="chips">
            {industries.map((industry) => (
              <span key={industry}>{industry}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container section-pad">
          <div className="work-grid">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
