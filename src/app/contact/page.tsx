import { PageShell, SectionIntro } from "@/components/site";

export default function ContactPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <div className="container">
          <SectionIntro
            eyebrow="Contact"
            title="Let's discuss your product."
            body="Tell us a little about what you're building. We'll get back within one business day with next steps."
          />
        </div>
      </section>
      <section className="section">
        <div className="container section-pad contact-grid">
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
            <button className="button primary" type="submit">
              Send message <span>→</span>
            </button>
          </form>
          <aside className="contact-aside">
            <div>
              <p className="eyebrow">Direct</p>
              <strong>Email</strong>
              <p>hello@brewwithcrew.com</p>
            </div>
            <div>
              <p className="eyebrow">Discovery call</p>
              <strong>30 minutes · free</strong>
            </div>
            <div>
              <p className="eyebrow">What happens next</p>
              <p>01 · We review your note within one business day.</p>
              <p>02 · We schedule a 30-minute call to understand the goals.</p>
              <p>03 · You receive a written plan, scope, and timeline.</p>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
