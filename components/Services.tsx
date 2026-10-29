"use client";

import { services, servicesIntro } from "@/lib/content";
import { Button, Label, Lines, Reveal, SplitTitle } from "./ui";

export default function Services() {
  return (
    <section className="section soft services" id="services">
      <Lines />
      <div className="services-wrap cols">
        <aside className="services-side">
          <div className="services-sticky">
            <Label title="Services" sub="خدماتنا" />
            <SplitTitle className="services-title" text={"What\nWe Build"} />
            <p>{servicesIntro.text}</p>
            <div className="services-side-foot">
              <p className="mono-up">{servicesIntro.kicker}</p>
              <p>{servicesIntro.sub}</p>
              <Button>Discuss your project</Button>
            </div>
          </div>
        </aside>

        <div className="services-list">
          {services.map((s, i) => (
            <article key={s.title} className="service">
              <Reveal>
                <p className="service-no">
                  00{i + 1}. / <span className="muted">{s.sub}</span>
                </p>
                <h3>{s.title}</h3>
              </Reveal>
              <Reveal className="service-imgs" delay={0.1}>
                {s.images.map((src) => (
                  <div key={src} className="zoom">
                    <img src={src} alt={s.title} loading="lazy" />
                  </div>
                ))}
              </Reveal>
              <Reveal className="service-body" delay={0.15}>
                <div>
                  <p>{s.text}</p>
                  <p className="mono-up service-note">{s.note}</p>
                </div>
                <ul className="tags">
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Reveal>
            </article>
          ))}

          <Reveal className="booking">
            <div className="booking-meta mono-up">
              {servicesIntro.booking.map(([k, v]) => (
                <span key={k}>
                  <span className="muted">{k}</span> {v}
                </span>
              ))}
            </div>
            <h4>{servicesIntro.cta}</h4>
            <p className="muted">{servicesIntro.ctaSub}</p>
            <Button variant="red">Discuss your project</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
