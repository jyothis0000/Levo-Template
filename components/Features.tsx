"use client";

import { motion } from "motion/react";
import { brand, features } from "@/lib/content";
import { Counter, Label, Lines, Reveal, SplitTitle } from "./ui";

export default function Features() {
  const [a, b, c] = features.cards;
  return (
    <section className="section soft features">
      <Lines />
      <div className="head cols">
        <div className="head-left">
          <Label title="Features" />
          <p className="muted">{features.intro}</p>
        </div>
        <SplitTitle className="giant" text="How We Work" />
      </div>

      <div className="bento cols">
        <Reveal className="bento-card">
          <div className="bento-brand">
            <img src={brand.logo} alt={brand.name} className="bento-logo" />
          </div>
          <div>
            <h4>{features.title}</h4>
            <p className="muted">{features.text}</p>
            <ul className="checks">
              {features.checklist.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="bento-card bento-visual">
          <span className="bento-ghost" aria-hidden>{brand.short}</span>
          <Reveal className="bento-photo" y={80}>
            <img src={features.visual} alt="" />
          </Reveal>
          {features.chips.map((ch, i) => (
            <motion.div
              key={ch.label}
              className={`chip chip-${i}`}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 200, damping: 18 }}
            >
              <span className="chip-icon">{ch.icon}</span>
              <span>
                <b>{ch.value}</b>
                <small>{ch.label}</small>
              </span>
            </motion.div>
          ))}
        </div>

        <Reveal className="bento-card bento-red">
          <span className="mono-up">[ Expertise ]</span>
          <div>
            <span className="bento-big">
              <Counter to={features.years} suffix="+" />
            </span>
            <p className="bento-years">
              Years
              <br />
              Industry
              <br />
              Experience
            </p>
          </div>
        </Reveal>

        {[a, b, c].map((card, i) => (
          <Reveal key={card.title} className={`bento-card bento-img ${i === 1 ? "dark" : ""}`} delay={i * 0.1}>
            <div className="bento-img-top">
              <b>{card.kicker}</b>
              {card.badge && <span className="chip chip-static">{card.badge}</span>}
            </div>
            <div className="zoom bento-pic">
              <img src={card.img} alt="" loading="lazy" />
            </div>
            <div>
              {card.value > 0 && (
                <span className="bento-num">
                  <Counter to={card.value} suffix={card.suffix} />
                </span>
              )}
              <h4>{card.title}</h4>
              <p className="muted">{card.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
