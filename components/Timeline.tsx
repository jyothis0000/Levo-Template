"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { facts, timeline } from "@/lib/content";
import { Counter, Label, Lines, Reveal, SplitTitle } from "./ui";

function Item({ t }: { t: (typeof timeline.items)[number] }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "start 0.45"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  return (
    <motion.li ref={ref} style={{ opacity }}>
      <span className="tl-dot" />
      <span className="mono-up muted">{t.year}</span>
      <h4>{t.title}</h4>
      <p className="muted">{t.text}</p>
    </motion.li>
  );
}

export default function Timeline() {
  const ref = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <section className="section dark timeline" id="journey">
        <Lines />
        <div className="cols timeline-wrap">
          <div className="timeline-side">
            <div className="head-left">
              <Label title="Timeline" />
              <SplitTitle className="giant timeline-title" text={"The\nJourney"} />
              <p className="muted">{timeline.intro}</p>
            </div>
            <div className="process-quote">
              <span className="quote-mark">“</span>
              <p>{timeline.quote}</p>
            </div>
          </div>
          <div className="timeline-img">
            <Reveal>
              <img src={timeline.img} alt="" />
            </Reveal>
          </div>
          <ul ref={ref} className="tl">
            <motion.span className="tl-fill" style={{ height: fill }} />
            {timeline.items.map((t) => (
              <Item key={t.year} t={t} />
            ))}
          </ul>
        </div>
      </section>

      <section className="section facts">
        <Lines />
        <div className="cols">
          {facts.map((f, i) => (
            <div key={f.label} className="fact">
              <div className="fact-top mono-up">
                <span>0{i + 1}.</span>
                <span className="fact-label">{f.label}</span>
              </div>
              <span className="fact-value">
                <Counter to={f.value} suffix={f.suffix} duration={2.4} />
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
