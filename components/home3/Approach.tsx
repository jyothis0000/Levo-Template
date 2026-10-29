"use client";

import { AnimatePresence, motion, type MotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { approach } from "@/lib/home3";
import { ease } from "./Chrome";

const quadOut = (t: number) => 1 - (1 - t) * (1 - t);

// gsap.to(words, { x: 0, stagger: 0.1 }) scrubbed: each word 0.5 long, starting 0.1 after the last
function Verb({ i, n, p, word }: { i: number; n: number; p: MotionValue<number>; word: string }) {
  const total = 0.5 + (n - 1) * 0.1;
  const x = useTransform(p, [(i * 0.1) / total, (i * 0.1 + 0.5) / total], ["100%", "0%"], { ease: quadOut });
  return <motion.span style={{ x }}>{word}</motion.span>;
}

/**
 * As santalarch.com: "WE" stays on the horizon while the section scrolls; on the right each verb
 * slides in from the edge, one after another, across the whole scroll of the section.
 */
export function Approach() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end end"] });

  return (
    <section ref={ref} className="ap3">
      <div className="ap3-title">
        <h2 className="ap3-we">WE</h2>
        <p className="ap3-label">Our Approach</p>
      </div>
      <div className="ap3-wrap">
        <div className="ap3-verbs">
          {approach.verbs.map((v, i) => (
            <Verb key={v} i={i} n={approach.verbs.length} p={p} word={v} />
          ))}
        </div>
        <div className="ap3-desc">
          <p className="ap3-big">
            {approach.lead.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
          <p className="ap3-sub">{approach.sub}</p>
        </div>
      </div>
    </section>
  );
}

function Layer({ i, p, src }: { i: number; p: MotionValue<number>; src: string }) {
  // a closed stack that opens up like an exploded drawing, back layers travelling furthest
  const x = useTransform(p, [0.05, 0.55], ["0rem", `${(i - 1.5) * 9}rem`]);
  const z = useTransform(p, [0.05, 0.55], [i * -4, i * -120]);
  return (
    <motion.figure className="ly" style={{ x, z, zIndex: 10 - i }}>
      <img src={src} alt="" loading="lazy" />
    </motion.figure>
  );
}

/**
 * Stand-in for the reference's 3D door: four photos of one Levo build — finished stand, structure,
 * assembly, workshop — exploded in 3D, while four principles take turns on the right.
 */
export function Layers() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = approach.principles.length;
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(p, "change", (v) => setIdx(Math.min(n - 1, Math.floor(v * n))));
  const ry = useTransform(p, [0, 1], [-34, -12]);
  const rx = useTransform(p, [0, 1], [10, 4]);
  const draw = useTransform(p, [0.18, 0.5], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]);
  const linesO = useTransform(p, [0.18, 0.28, 0.48, 0.56], [0, 1, 1, 0]);
  const s = approach.principles[idx];

  return (
    <section ref={ref} className="ly3">
      <div className="ly3-sticky">
        {/* construction lines that draw themselves during "System" */}
        <motion.svg className="ly3-lines" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ opacity: linesO, clipPath: draw }} aria-hidden>
          {[
            [0, 0, 100, 100],
            [100, 0, 0, 100],
            [38, 0, 62, 100],
            [62, 0, 38, 100],
            [50, 10, 30, 50],
            [50, 10, 70, 50],
            [30, 50, 50, 90],
            [70, 50, 50, 90],
          ].map(([x1, y1, x2, y2], k) => (
            <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
        </motion.svg>

        <div className="ly3-stage">
          <motion.div className="ly3-stack" style={{ rotateY: ry, rotateX: rx }}>
            {approach.layers.map((src, i) => (
              <Layer key={src} i={i} p={p} src={src} />
            ))}
          </motion.div>
        </div>

        <div className="ly3-copy">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease }}
            >
              <h3>
                {s.title[0]}
                <br />
                {s.title[1]}
              </h3>
              <p>{s.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="ly3-index">
          <span>{s.label}</span>
          <b>0{idx + 1}</b>
          <span className="sep" />
          <b>0{n}</b>
        </p>
      </div>
    </section>
  );
}
