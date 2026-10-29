"use client";

import { motion, type MotionValue, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { approach } from "@/lib/home3";

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
