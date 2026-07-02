"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BeanField, Steam } from "@/components/decor";
import { Magnetic, Reveal } from "@/components/gsap/primitives";
import {
  ctaCopy,
  navItems,
  principles,
  processSteps,
  projects,
  type Project,
} from "@/lib/site-data";

export function Logo() {
  return (
    <Link className="logo" href="/">
      <span className="flex items-center gap-2 text-xl font-semibold tracking-tighter text-foreground/95">
        <span className="whitespace-nowrap">
          Brew <span className="text-foreground/70">with</span> Crew
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileNavId = "mobile-navigation";

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div onClick={closeMenu}>
          <Logo />
        </div>
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="pill-link desktop-cta" href="/contact">
          Book a call <span>→</span>
        </Link>
        <button
          aria-controls={mobileNavId}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="menu-button"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          aria-label="Mobile navigation"
          className={isMenuOpen ? "mobile-nav open" : "mobile-nav"}
          id={mobileNavId}
        >
          {navItems.map((item) => (
            <Link href={item.href} key={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}
          <Link className="mobile-nav-cta" href="/contact" onClick={closeMenu}>
            Book a call <span>→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>
            Your external engineering organisation. We help founders and
            businesses ship serious software — from MVP to scale.
          </p>
        </div>
        <FooterColumn
          title="Company"
          links={[
            ["About", "/about"],
            ["Process", "/process"],
            ["Work", "/work"],
          ]}
        />
        <FooterColumn
          title="Services"
          links={[
            ["Startup development", "/services"],
            ["Product teams", "/services"],
            ["Business solutions", "/services"],
          ]}
        />
        <FooterColumn
          title="Contact"
          links={[
            ["Book a discovery call", "/contact"],
            ["hello@brewwithcrew.com", "/contact"],
          ]}
        />
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 Brew with Crew. All rights reserved.</p>
          <p className="mono">brewed with intent · powered by caffeine &amp; clean code</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<[string, string]>;
}) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="footer-links">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container" style={{ position: "relative" }}>
        <Reveal y={20}>
          <SectionIntro eyebrow={eyebrow} title={title} body={body} />
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  body,
  centered = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "section-intro centered" : "section-intro"}>
      {eyebrow ? (
        <div className="intro-kicker">
          <span />
          <p className="eyebrow">{eyebrow}</p>
        </div>
      ) : null}
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}

export function ButtonRow({
  primary,
  secondary,
}: {
  primary: [string, string];
  secondary?: [string, string];
}) {
  return (
    <div className="button-row">
      <Link className="button primary" href={primary[1]}>
        {primary[0]} <span>→</span>
      </Link>
      {secondary ? (
        <Link className="button secondary" href={secondary[1]}>
          {secondary[0]} <span>→</span>
        </Link>
      ) : null}
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const statusClass =
    project.status === "Live"
      ? "status live"
      : project.status === "Archived"
        ? "status archived"
        : "status muted";

  return (
    <Link className="project-card" href={`/work/${project.slug}`}>
      <div className="project-art">
        {project.previewImage ? (
          <div className="project-art-image">
            <Image
              src={project.previewImage}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : null}
        <div className="grid-overlay" />
        <div className="project-art-meta">
          <span>{project.industry}</span>
          <span>{project.code}</span>
        </div>
        <div className="dot-grid">
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>
      <div className="project-body">
        <div className="project-topline">
          <p className="eyebrow">{project.type}</p>
          <span className={statusClass}>{project.status}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="tags">
          {project.stack.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="project-footer">
          <span>{project.industry}</span>
          <span>View case →</span>
        </div>
      </div>
    </Link>
  );
}

export function WorkGrid({ limit }: { limit?: number }) {
  return (
    <div className="work-grid">
      {projects.slice(0, limit).map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}

export function ProcessCards({ detailed = false }: { detailed?: boolean }) {
  return (
    <>
      {processSteps.map((step) => (
        <article className="process-card" key={step.title}>
          <div className="process-card-top">
            <span>{step.number}</span>
            <span className="roast-label">{step.brewLabel}</span>
            <i />
          </div>
          <h3>{step.title}</h3>
          <p>{detailed ? step.body : shortProcessCopy[step.title]}</p>
          {detailed ? (
            <div className="outputs">
              <p className="eyebrow">Outputs</p>
              <ul>
                {step.outputs.map((output) => (
                  <li key={output}>{output}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>
      ))}
    </>
  );
}

export function ProcessGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className={detailed ? "process-list" : "process-grid"}>
      <ProcessCards detailed={detailed} />
    </div>
  );
}

const shortProcessCopy: Record<string, string> = {
  Discovery: "Goals, constraints, risk, and the smallest valuable surface.",
  Strategy: "Architecture, roadmap, and the boring-but-critical decisions.",
  Design: "UX systems and interfaces built for clarity and speed.",
  Development: "Type-safe, observable, well-tested code shipped in weekly cycles.",
  Launch: "Rollout, monitoring, and on-call coverage from day zero.",
  Growth: "Iterate, scale, and harden as the business evolves.",
};

export function PrinciplesGrid() {
  return (
    <div className="principles-grid">
      {principles.map(([title, body]) => (
        <article className="principle-card" key={title}>
          <div className="intro-kicker">
            <span />
            <p className="eyebrow">Principle</p>
          </div>
          <h3>{title}</h3>
          <p>{body}</p>
        </article>
      ))}
    </div>
  );
}

export function CtaSection({
  title = ctaCopy.title,
  body = ctaCopy.body,
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="cta-section">
      <BeanField count={5} interactive />
      <div className="container">
        <Reveal>
          <Steam className="cta-steam" />
          <SectionIntro eyebrow="Let's brew" title={title} body={body} centered />
          <div className="button-row" style={{ justifyContent: "center" }}>
            <Magnetic>
              <Link className="button primary" href="/contact">
                Let&apos;s grab a coffee <span>→</span>
              </Link>
            </Magnetic>
            <Link className="button secondary" href="/work">
              See recent work <span>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <main>{children}</main>
      <Footer />
    </div>
  );
}
