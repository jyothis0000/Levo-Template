"use client";

import { motion, type MotionValue, useTransform } from "motion/react";
import { hero, principles } from "@/lib/home3";
import { useIntroDone } from "@/components/home2/Chrome";
import { ease } from "./Chrome";

/** First screen; it scrolls away as the tagline (in the cube stage below) climbs in. */
export function Hero() {
  const ready = useIntroDone(); // enter once the loader has handed over
  return (
    <section className="hero3">
      {/* drawn by a clip wipe: pathLength dashes break on a stretched, non-scaling-stroke SVG */}
      <motion.svg
        className="diag"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
        initial={{ clipPath: "inset(0% 100% 100% 0%)" }}
        animate={ready ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ delay: 0.6, duration: 2.2, ease }}
      >
        <line x1="0" y1="0" x2="100" y2="100" />
      </motion.svg>

      <motion.p className="hero3-cap" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : undefined} transition={{ delay: 1 }}>
        {hero.caption[0]}
        <br />
        {hero.caption[1]}
      </motion.p>

      <h1 className="hero3-desc">
        {hero.description.map((l, i) => (
          <span key={l} className="line-mask">
            <motion.span initial={{ y: "105%" }} animate={ready ? { y: "0%" } : undefined} transition={{ delay: 0.7 + i * 0.1, duration: 1.2, ease }}>
              {l}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.a href="#principles" className="hero3-scroll" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : undefined} transition={{ delay: 1.4 }}>
        <i />
        Scroll to discover
      </motion.a>
    </section>
  );
}

function Panel({ i, p, n }: { i: number; p: MotionValue<number>; n: number }) {
  const s = principles[i];
  const start = i / n;
  // every panel after the first wipes up over the previous one; the first sits on the dive photo
  const clip = useTransform(p, [start - 0.1, start + 0.04], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const wordY = useTransform(p, [start, start + 0.14], ["105%", "0%"]);
  const textO = useTransform(p, [start + 0.04, start + 0.16], [0, 1]);
  return (
    <motion.div className={`pr-panel ${s.img ? "is-dark" : ""} ${i ? "" : "is-clear"}`} style={i ? { clipPath: clip } : undefined}>
      {s.img && i > 0 && <img src={s.img} alt="" className="pr-bg" />}
      <h2 className="pr-word">
        <span className="line-mask">
          <motion.span style={{ y: wordY }}>{s.word}</motion.span>
        </span>
      </h2>
      <motion.p className="pr-text" style={{ opacity: textO }}>
        {s.text}
      </motion.p>
      <motion.p className="pr-index" style={i ? undefined : { opacity: textO }}>
        <span>Our Principles</span>
        <b>0{i + 1}</b>
        <span className="sep" />
        <b>0{n}</b>
      </motion.p>
    </motion.div>
  );
}

/** Bold / Engineered / On Time, played inside the cube stage once the dive lands. */
export function PrinciplePanels({ p }: { p: MotionValue<number> }) {
  return principles.map((_, i) => <Panel key={i} i={i} p={p} n={principles.length} />);
}
