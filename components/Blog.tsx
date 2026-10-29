import { brand, contact, posts } from "@/lib/content";
import { Label, Lines, Reveal, SplitTitle } from "./ui";

export default function Blog() {
  return (
    <>
      <section className="section soft blog" id="insights">
        <Lines />
        <div className="head cols">
          <div className="head-left">
            <Label title="Insights" />
            <p className="muted">Notes from the show floor — design, build and the shows we work at.</p>
          </div>
          <SplitTitle className="giant" text="Insights." />
        </div>
        <div className="posts cols">
          {posts.map((p, i) => (
            <Reveal key={p.href} delay={i * 0.1}>
              <a href={p.href} target="_blank" rel="noreferrer" className="post">
                <div className="zoom post-img">
                  <img src={p.img} alt="" loading="lazy" />
                </div>
                <p className="mono-up muted">
                  {p.date} <span>·</span> Levo journal
                </p>
                <h4>{p.title}</h4>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section profile">
        <Lines />
        <div className="cols profile-row">
          <div className="head-left">
            <Label title="Our profile" />
            <h3 className="profile-title">Company Profile</h3>
            <p className="muted">Projects, capabilities and clients — the Levo company profile 2026.</p>
          </div>
          {/* ponytail: mailto form, no backend. Swap action for an API route when one exists. */}
          <form className="profile-form" action={`mailto:${contact.email}?subject=Company%20profile%20request`} method="post" encType="text/plain">
            <label className="mono-up" htmlFor="profile-email">Enter your email</label>
            <div className="profile-input">
              <input id="profile-email" name="email" type="email" required placeholder="you@company.com" />
              <button type="submit" aria-label="Request profile">→</button>
            </div>
            {/* GDPR Art. 13: say what happens to the address where it is collected */}
            <p className="form-note">
              We use your address only to send the profile — no newsletter. <a href="/home1/privacy">Privacy notice</a>
            </p>
          </form>
          <p className="profile-note muted">
            Prefer to read it now?{" "}
            <a href={brand.profile} target="_blank" rel="noreferrer">
              <b>Open the PDF</b>
            </a>{" "}
            or <b>WhatsApp us</b> for a printed copy.
          </p>
        </div>
      </section>
    </>
  );
}
