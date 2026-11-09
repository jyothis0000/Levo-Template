"use client";

// Taken from /home2's "Upcoming shows" (the list with a photo that follows the pointer), dressed in /home's own design:
// the label + giant-title head, the column rules, and rows set like the FAQ's.
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react";
import { useState } from "react";
import { shows } from "@/lib/home";
import { Button, Label, Lines, SplitTitle } from "./ui";

const ease = [0.14, 0.83, 0.4, 1] as const; // /home2's reveal curve

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 1.2, delay, ease },
});

/** A list of shows; with a mouse, that show's photo follows the pointer, tilting with its speed. */
export default function Shows() {
  const [hover, setHover] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 26, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 26, mass: 0.5 });
  const rotate = useTransform(useVelocity(x), [-1500, 1500], [-8, 8], { clamp: true });
  const cur = hover === null ? null : shows.list[hover];

  return (
    <section className="section soft sh" id="shows">
      <Lines />
      <div className="head cols">
        <div className="head-left">
          <Label title={shows.label} />
          <p className="muted">{shows.intro}</p>
          <Button href={shows.all} external className="head-btn">
            {shows.cta}
          </Button>
        </div>
        <SplitTitle className="giant" text={shows.title} />
      </div>

      <ul
        className="sh-list"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          x.set(e.clientX);
          y.set(e.clientY);
        }}
        onPointerLeave={() => setHover(null)}
      >
        {shows.list.map((s, i) => (
          <motion.li key={s.title} {...rise(i * 0.05)} onPointerEnter={(e) => e.pointerType === "mouse" && setHover(i)}>
            <a href="/home#contact" className={`sh-link ${hover === i ? "is-on" : ""}`}>
              <span className="sh-name">
                <span className="mono-up muted">0{i + 1}.</span>
                <span className="sh-title">{s.title}</span>
              </span>
              <span className="sh-text muted">{s.text}</span>
              <span className="sh-meta">
                <span className="mono-up">{s.date}</span>
                <span className="sh-icon" aria-hidden>
                  +
                </span>
              </span>
            </a>
          </motion.li>
        ))}
      </ul>

      <motion.figure
        className="sh-peek"
        style={{ left: x, top: y, rotate }}
        animate={{ scale: cur ? 1 : 0, opacity: cur ? 1 : 0 }}
        transition={{ duration: 0.45, ease }}
        aria-hidden
      >
        <AnimatePresence initial={false}>
          {cur && (
            <motion.img
              key={cur.img}
              src={cur.img}
              alt=""
              initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease }}
            />
          )}
        </AnimatePresence>
        {cur && <figcaption className="mono-up">{cur.cap}</figcaption>}
      </motion.figure>
    </section>
  );
}
