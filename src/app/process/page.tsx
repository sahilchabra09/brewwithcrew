import type { Metadata } from "next";
import { ButtonRow, PageHero, PageShell } from "@/components/site";
import { CoffeeRing } from "@/components/decor";
import { PourFlow } from "@/components/process/pour-flow";
import { Squiggle } from "@/components/gsap/primitives";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Six phases from sourcing to refills. Weekly delivery. Real, working software at the end of every cycle.",
};

export default function ProcessPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Process · The Brew Method"
        title={
          <>
            A premium product process — without the{" "}
            <Squiggle>consulting theatre</Squiggle>.
          </>
        }
        body="Six phases, from sourcing to refills. Weekly delivery. Real, working software at the end of every cycle. Scroll to pour."
      />
      <section className="section" style={{ position: "relative", overflow: "hidden" }}>
        <CoffeeRing
          className="section-ring"
          size={420}
          style={{ top: "-120px", right: "-140px" }}
        />
        <CoffeeRing
          className="section-ring"
          size={340}
          style={{ bottom: "-100px", left: "-120px" }}
        />
        <div className="container section-pad">
          <PourFlow />
          <ButtonRow primary={["Start your discovery call", "/contact"]} />
        </div>
      </section>
    </PageShell>
  );
}
