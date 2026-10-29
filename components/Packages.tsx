"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { packages } from "@/lib/content";
import { Button, Label, Lines, Reveal, SplitTitle } from "./ui";

const SQFT = 10.7639;

/** Odometer: every digit is a 0–9 column that slides to its value. */
function Rolling({ value }: { value: number }) {
  const chars = value.toLocaleString("en-US").split("");
  return (
    <span className="odo" aria-label={String(value)}>
      {chars.map((c, i) =>
        /\d/.test(c) ? (
          <span key={chars.length - i} className="odo-col" aria-hidden>
            <motion.span
              animate={{ y: `-${Number(c) * 10}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: i * 0.04 }}
            >
              {"0123456789".split("").map((d) => (
                <span key={d}>{d}</span>
              ))}
            </motion.span>
          </span>
        ) : (
          <span key={`s${i}`} aria-hidden>{c}</span>
        ),
      )}
    </span>
  );
}

export default function Packages() {
  const [ft, setFt] = useState(false);
  return (
    <section className="section soft packages" id="packages">
      <Lines />
      <div className="head cols">
        <div className="head-left">
          <Label title="Solutions" sub="حلولنا" />
          <p className="muted">{packages.intro}</p>
        </div>
        <div className="packages-title">
          <SplitTitle className="giant" text="Stand Types" />
          <div className="toggle mono-up">
            <span className={ft ? "muted" : ""}>SQM</span>
            <button className={`switch ${ft ? "is-on" : ""}`} onClick={() => setFt(!ft)} aria-label="Toggle units">
              <motion.i layout transition={{ type: "spring", stiffness: 500, damping: 30 }} />
            </button>
            <span className={ft ? "" : "muted"}>SQ FT</span>
            <span className="toggle-pill">Pick your unit</span>
          </div>
        </div>
      </div>

      <div className="plans cols">
        {packages.plans.map((p, i) => (
          <Reveal key={p.title} className={`plan ${p.badge ? "is-popular" : ""}`} delay={i * 0.1}>
            <p className="service-no">
              00{i + 1}. / <span className="muted">{p.sub}</span>
            </p>
            <h4>
              {p.title} {p.badge && <span className="popular mono-up">{p.badge}</span>}
            </h4>
            <p className="muted plan-text">{p.text}</p>
            <div className="plan-price">
              <span className="plan-from mono-up muted">Largest built</span>
              <Rolling value={Math.round(ft ? p.size * SQFT : p.size)} />
              <span className="mono-up muted">/{ft ? "sq ft" : "sqm"}</span>
            </div>
            <p className="mono-up muted plan-h">What&apos;s included</p>
            <ul className="checks">
              {p.includes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="mono-up muted plan-h">Extras</p>
            <ul className="checks checks-alt">
              {p.extras.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <Button variant={p.badge ? "red" : "light"} className="plan-btn">Request a quote</Button>
            <p className="plan-time muted">
              <b>Timeframe:</b> {p.time}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
