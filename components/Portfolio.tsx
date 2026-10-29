"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { highlights, portfolioIntro, projects } from "@/lib/content";
import { Button, Label, Lines, Reveal, SplitTitle } from "./ui";

type Project = (typeof projects)[number];

function Work({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const clip = useTransform(scrollYProgress, [0, 0.4], ["inset(18% 12% 18% 12%)", "inset(0% 0% 0% 0%)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.35]);

  return (
    <div ref={ref} className="work">
      <div className="work-bg" aria-hidden>
        <motion.img src={p.img} alt="" style={{ scale: bgScale }} />
      </div>
      <motion.div className="work-frame" style={{ clipPath: clip }}>
        <motion.img src={p.img} alt={`${p.client} stand at ${p.show}`} style={{ scale }} loading="lazy" />
      </motion.div>
      <div className="work-meta cols">
        <span className="mono-up">/{String(i + 1).padStart(2, "0")}</span>
        <h3 className="mono-up">{p.client}</h3>
        <ul className="mono-up">
          <li>{p.show}</li>
          <li>{p.venue}</li>
        </ul>
      </div>
      <div className="work-foot cols mono-up">
        <span>
          <span className="muted">Size</span> {p.size}
        </span>
        <span>
          <span className="muted">Year</span> {p.year}
        </span>
        <span>
          <span className="muted">Client</span> {p.client}
        </span>
      </div>
    </div>
  );
}

function MoreWorks() {
  const [hover, setHover] = useState<number | null>(null);
  const list = projects.slice(4, 9);
  return (
    <div className="more cols">
      <div className="head-left">
        <Label title="More cases" />
        <p className="muted">{portfolioIntro.more}</p>
        <Button variant="light" className="more-btn">All projects</Button>
      </div>
      <ul className="more-list" onMouseLeave={() => setHover(null)}>
        {list.map((p, i) => (
          <li key={p.client} onMouseEnter={() => setHover(i)} className={hover === i ? "is-active" : ""}>
            <span className="mono-up muted">{String(i + 1).padStart(2, "0")}</span>
            <div className="more-thumb">
              <AnimatePresence>
                {hover === i && (
                  <motion.img
                    src={p.img}
                    alt=""
                    initial={{ clipPath: "inset(50% 0 50% 0)" }}
                    animate={{ clipPath: "inset(0% 0 0% 0)" }}
                    exit={{ clipPath: "inset(50% 0 50% 0)" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </AnimatePresence>
            </div>
            <span className="mono-up muted">{p.year}</span>
            <div>
              <b>{p.client}</b>
              <span className="muted">{p.show}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Highlights() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.75], [3, 1]);
  const textO = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textS = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const capO = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

  return (
    <div ref={ref} className="reel">
      <div className="reel-sticky">
        <motion.div className="reel-grid" style={{ scale }}>
          {highlights.slice(0, 9).map((src, i) => (
            <div key={i} className="reel-cell">
              <img src={src} alt="" loading="lazy" />
              {i === 4 && (
                <motion.div className="reel-cap mono-up" style={{ opacity: capO }}>
                  <span>{portfolioIntro.count} projects</span>
                  <span className="reel-play">▶</span>
                  <span>Levo in action</span>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
        <motion.h3 className="reel-title" style={{ opacity: textO, scale: textS }}>
          {portfolioIntro.reel}
        </motion.h3>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section className="section dark portfolio" id="projects">
      <Lines />
      <div className="head cols">
        <div className="head-left">
          <Label title="Portfolio" />
          <p className="muted">{portfolioIntro.text}</p>
        </div>
        <SplitTitle className="giant" text="Case studies." />
      </div>

      <div className="works">
        {projects.slice(0, 4).map((p, i) => (
          <Work key={p.client} p={p} i={i} />
        ))}
      </div>

      <MoreWorks />

      <div className="head cols">
        <div className="head-left">
          <Label title="Showreel" />
          <p className="muted">{portfolioIntro.reelText}</p>
        </div>
        <Reveal className="giant">
          <span className="glow">Highlights</span>
        </Reveal>
      </div>
      <Highlights />
    </section>
  );
}
