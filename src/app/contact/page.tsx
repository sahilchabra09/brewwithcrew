import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/site";
import { HighlightFill, Reveal } from "@/components/gsap/primitives";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about what you're building. We'll get back within one business day — the first coffee's on us.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            First coffee&apos;s <HighlightFill>on us</HighlightFill>.
          </>
        }
        body="Tell us a little about what you're building. We'll get back within one business day with next steps — and a free 30-minute discovery call."
      />
      <section className="section">
        <div className="container section-pad contact-grid">
          <Reveal>
            <form className="contact-form">
              <div className="form-row">
                <label>
                  Your name
                  <input name="name" type="text" />
                </label>
                <label>
                  Company
                  <input name="company" type="text" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Work email
                  <input name="email" type="email" />
                </label>
                <label>
                  Budget (optional)
                  <input name="budget" placeholder="$25k — $250k+" type="text" />
                </label>
              </div>
              <label>
                What are you building?
                <textarea
                  name="message"
                  placeholder="A few sentences about the product, timeline, and what you'd like to ship first."
                />
              </label>
              <button className="button primary send-btn" type="submit">
                <span className="send-btn-label">Pull the shot</span>
                <span className="send-arrow">→</span>
              </button>
            </form>
          </Reveal>
          <Reveal className="contact-aside" delay={0.15}>
            <div>
              <p className="eyebrow">Direct</p>
              <strong>Email</strong>
              <p>hello@brewwithcrew.com</p>
            </div>
            <div>
              <p className="eyebrow">Discovery call</p>
              <strong>30 minutes · free · on us</strong>
            </div>
            <div>
              <p className="eyebrow">What happens next</p>
              <p>01 · We review your note within one business day.</p>
              <p>02 · We schedule a 30-minute call to understand the goals.</p>
              <p>03 · You receive a written plan, scope, and timeline.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
