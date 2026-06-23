import { ButtonRow, PageShell, ProcessGrid, SectionIntro } from "@/components/site";

export default function ProcessPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <div className="container">
          <SectionIntro
            eyebrow="Process"
            title="A premium product process — without the consulting theatre."
            body="Six phases. Weekly delivery. Real, working software at the end of every cycle."
          />
        </div>
      </section>
      <section className="section">
        <div className="container section-pad">
          <ProcessGrid detailed />
          <ButtonRow primary={["Start your discovery call", "/contact"]} />
        </div>
      </section>
    </PageShell>
  );
}
