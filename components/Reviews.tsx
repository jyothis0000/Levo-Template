"use client";

import { clients, reviews } from "@/lib/content";
import { Counter, Label, Lines, Reveal, ScrollWords, SplitTitle } from "./ui";

export default function Reviews() {
  const f = reviews.featured;
  return (
    <section className="section reviews" id="reviews">
      <Lines />
      <div className="head cols">
        <div className="head-left">
          <Label title="Selected review" />
          <p className="muted">{reviews.intro}</p>
        </div>
        <SplitTitle className="giant" text="True Stories." />
      </div>

      <div className="featured cols">
        <Reveal className="featured-img">
          <img src={f.img} alt="" />
        </Reveal>
        <div className="featured-card">
          <div className="featured-top">
            <span className="mono-up">Services:</span>
            <span className="muted featured-services">{f.services}</span>
          </div>
          <span className="quote-mark big">“</span>
          <ScrollWords className="featured-quote" text={f.quote} />
          <div className="featured-foot">
            <div>
              <b>{f.name}</b>
              <span className="muted">{f.role}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="review-stats cols">
        <div className="review-score">
          <div className="avatars">
            {clients.slice(4, 8).map((c) => (
              <span key={c.name}>
                <img src={c.logo} alt={c.name} />
              </span>
            ))}
          </div>
          <div>
            <p className="stars">★★★★★ <b>{reviews.score}</b></p>
            <p className="mono-up muted">{reviews.basedOn}</p>
          </div>
        </div>
        {reviews.stats.map((s) => (
          <Reveal key={s.label} className="stat-card dark">
            <span className="mono-up stat-label">{s.label}</span>
            <span className="mono-up muted">↑ {s.note}</span>
            <span className="stat-value">
              <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
            </span>
          </Reveal>
        ))}
      </div>

      <div className="more-reviews cols">
        <div className="head-left">
          <Label title="Reviews" />
          <SplitTitle className="more-reviews-title" text={"More\nReviews"} />
          <p className="muted">{reviews.moreIntro}</p>
        </div>
        {reviews.more.map((r, i) => (
          <Reveal key={r.name} className="review-card" delay={i * 0.1}>
            <div className="review-card-top">
              <b className="mono-up">{r.company}</b>
              <span className="stars">★★★★★</span>
            </div>
            <p>{r.quote}</p>
            <div className="person">
              <img src={r.logo} alt="" />
              <div>
                <b>{r.name}</b>
                <span className="muted">{r.role}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
