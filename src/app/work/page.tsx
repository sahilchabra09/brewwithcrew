import type { Metadata } from "next";
import { PageHero, PageShell, ProjectCard } from "@/components/site";
import { CoffeeRing } from "@/components/decor";
import { HighlightFill, RevealStagger } from "@/components/gsap/primitives";
import { industries, projects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A working portfolio across healthcare, insurance SaaS, real estate, AI tooling, e-commerce, and more.",
};

export default function WorkPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Fresh from the roastery"
        title={
          <>
            Products built for{" "}
            <HighlightFill>real businesses</HighlightFill>.
          </>
        }
        body="A working portfolio across healthcare, insurance SaaS, real estate, AI tooling, e-commerce, and more. Click any project for the full case."
      >
        <div className="chips">
          {industries.map((industry) => (
            <span key={industry}>{industry}</span>
          ))}
        </div>
      </PageHero>
      <section className="section" style={{ position: "relative", overflow: "hidden" }}>
        <CoffeeRing
          className="section-ring"
          size={360}
          style={{ top: "8%", right: "-130px" }}
        />
        <div className="container section-pad" style={{ position: "relative" }}>
          <RevealStagger className="work-grid" stagger={0.06}>
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </RevealStagger>
        </div>
      </section>
    </PageShell>
  );
}
