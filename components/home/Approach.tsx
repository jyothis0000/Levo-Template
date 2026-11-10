"use client";

// Taken from /home2's "Our approach" (the pinned photo that cross-fades stage by stage), dressed in /home's own design:
// the label + giant-title head, the column rules, the photo in the first column and the stages across the other two.
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { approach } from "@/lib/home";
import Blueprint from "./Blueprint";
import { Label, Lines, SplitTitle } from "./ui";

const ease = [0.14, 0.83, 0.4, 1] as const; // /home2's house curve
const pad = (k: number) => String(k).padStart(2, "0");
// the stage number rolls like a counter: the new one comes from below going down the page, from above coming back
const roll = {
  enter: (d: number) => ({ y: d > 0 ? "100%" : "-100%" }),
  in: { y: "0%" },
  exit: (d: number) => ({ y: d > 0 ? "-100%" : "100%" }),
};

type Stage = (typeof approach.steps)[number];

function Step({ i, s, active }: { i: number; s: Stage; active: boolean }) {
  return (
    <li className={`ap-step ${active ? "is-on" : ""}`}>
      <span className="mono-up ap-no">{pad(i + 1)}.</span>
      <div>
        <h3>{s.title}</h3>
        <p className="muted">{s.text}</p>
      </div>
    </li>
  );
}

/** Sticky photograph on the left cross-fades as each stage passes the middle of the screen. */
export default function Approach() {
  // which stage is lit, and which way we got there (1 = scrolling down, -1 = back up), so the number rolls that way
  const [{ active, dir }, set] = useState({ active: 0, dir: 1 });
  const setActive = useCallback((i: number) => set((s) => (s.active === i ? s : { active: i, dir: i > s.active ? 1 : -1 })), []);
  // the lit stage is whichever sits nearest the middle of the screen — worked out from where the stages are, not from
  // one crossing the middle, so it is right even when the page lands mid-section (a refresh, a link, a fast jump)
  const list = useRef<HTMLOListElement>(null);
  const pick = useCallback(() => {
    const items = list.current?.children;
    if (!items) return;
    let best = 0;
    let gap = Infinity;
    Array.from(items).forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - innerHeight / 2);
      if (d < gap) [gap, best] = [d, i];
    });
    setActive(best);
  }, [setActive]);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", pick);
  useEffect(pick, [pick]);
  return (
    <section className="section ap" id="approach">
      <Lines />
      <div className="head cols">
        <div className="head-left">
          <Label title={approach.label} />
          <p className="muted">{approach.text}</p>
        </div>
        <SplitTitle className="giant" text={approach.title} />
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
        {/* behind the stages: a stand drawn as a blueprint, layer by layer, stage by stage */}
        <Blueprint list={list} caption={`Fig. ${pad(active + 1)} — ${approach.steps[active].title}`} />
        <ol ref={list} className="ap-steps">
          {approach.steps.map((s, i) => (
            <Step key={s.title} i={i} s={s} active={active === i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
