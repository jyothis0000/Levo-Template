import { posts } from "@/lib/content";
import { Label, Lines, Reveal, SplitTitle } from "./ui";

export default function Blog() {
  return (
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
  );
}
