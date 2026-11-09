"use client";

// Ported from /home2's "Our approach" (components/home2/Sections.tsx → Approach).
import { AnimatePresence, motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { approach } from "@/lib/home";

const ease = [0.14, 0.83, 0.4, 1] as const; // /home2's house curve
const pad = (k: number) => String(k).padStart(2, "0");
// the stage number rolls like a counter: the new one comes from below going down the page, from above coming back
const roll = {
  enter: (d: number) => ({ y: d > 0 ? "100%" : "-100%" }),
  in: { y: "0%" },
  exit: (d: number) => ({ y: d > 0 ? "-100%" : "100%" }),
};

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 1.2, delay, ease },
});

type Stage = (typeof approach.steps)[number];

function Step({ i, s, active, onActive }: { i: number; s: Stage; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" }); // "in view" = crossing the middle tenth of the screen
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  return (
    <li ref={ref} className={`ap-step ${active ? "is-on" : ""}`}>
      <span className="ap-no">{pad(i + 1)}</span>
      <div>
        <h3>{s.title}</h3>
        <p>{s.text}</p>
      </div>
    </li>
  );
}

/** Sticky photograph on the left cross-fades as each stage passes the middle of the screen. */
export default function Approach() {
  // which stage is lit, and which way we got there (1 = scrolling down, -1 = back up), so the number rolls that way
  const [{ active, dir }, set] = useState({ active: 0, dir: 1 });
  const setActive = useCallback((i: number) => set((s) => (s.active === i ? s : { active: i, dir: i > s.active ? 1 : -1 })), []);
  return (
    <section className="section ap" id="approach">
      <div className="ap-head">
        <motion.p className="ap-label" {...rise()}>
          {approach.label}
        </motion.p>
        <motion.h2 className="ap-title" {...rise(0.05)}>
          {approach.title}
        </motion.h2>
        <motion.p className="ap-lead" {...rise(0.1)}>
          {approach.text}
        </motion.p>
      </div>
      <div className="ap-grid">
        <div className="ap-media">
          <div className="ap-frame">
            {approach.steps.map((s, i) => (
              <motion.img
                key={s.title}
                src={s.img}
                alt={s.title}
                loading="lazy"
                initial={false}
                animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.08 }}
                transition={{ duration: 1.1, ease }}
              />
            ))}
            <span className="ap-count">
              {/* the mask: a positioned, clipping box, so the outgoing number (popped out of the flow) is clipped too */}
              <span className="ap-num">
                <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                  <motion.span key={active} custom={dir} variants={roll} initial="enter" animate="in" exit="exit" transition={{ duration: 0.6, ease }}>
                    {pad(active + 1)}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span>/ {pad(approach.steps.length)}</span>
            </span>
          </div>
        </div>
        <ol className="ap-steps">
          {approach.steps.map((s, i) => (
            <Step key={s.title} i={i} s={s} active={active === i} onActive={setActive} />
          ))}
        </ol>
      </div>
    </section>
  );
}
