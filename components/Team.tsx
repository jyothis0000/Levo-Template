"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { belief, brand, team } from "@/lib/content";
import { Label, Lines, Marquee, Reveal, ScrollWords } from "./ui";

export default function Team() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  return (
    <>
      <section className="section soft team" id="team">
        <Lines />
        <div className="head cols">
          <div className="head-left">
            <Label title="The team" />
            <p className="muted">{team.intro}</p>
          </div>
          <div className="team-marquee">
            <Marquee speed={28}>
              <span className="team-word">Behind Levo.&nbsp;</span>
              <span className="team-word">Behind Levo.&nbsp;</span>
            </Marquee>
          </div>
        </div>

        <div className="team-grid">
          {team.people.map((p, i) => (
            <Reveal key={p.name} className="member" delay={i * 0.08}>
              <div className="member-img">
                <img src={p.img} alt={p.name} loading="lazy" />
              </div>
              <b>{p.name}</b>
              <span className="muted">{p.role}</span>
            </Reveal>
          ))}
        </div>

        <div className="team-trades mono-up">
          <Marquee speed={35} reverse>
            {team.trades.map((t) => (
              <span key={t} className="trade">
                {t} <i>✦</i>
              </span>
            ))}
          </Marquee>
        </div>
        <p className="team-est mono-up muted">Est. {brand.est}</p>
      </section>

      <section ref={ref} className="section dark belief">
        <Lines />
        <motion.div className="belief-img" style={{ y }}>
          <img src={belief.img} alt="" />
        </motion.div>
        <div className="belief-body">
          <Label title="What we believe" />
          <ScrollWords className="belief-text" text={belief.text} />
          <div className="belief-foot">
            <div>
              <b>{belief.name}</b>
              <span className="muted">
                {belief.role} · {brand.group}
              </span>
            </div>
            <motion.span
              className="signature"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            >
              Levo
            </motion.span>
          </div>
        </div>
      </section>
    </>
  );
}
