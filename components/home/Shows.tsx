"use client";

// Ported from /home2's "Upcoming shows" (components/home2/Sections.tsx → Shows).
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react";
import { useState } from "react";
import { shows } from "@/lib/home";

const ease = [0.14, 0.83, 0.4, 1] as const; // /home2's house curve

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 1.2, delay, ease },
});

const Arrow = () => (
  <svg viewBox="0 0 16 16" width="12" height="12">
    <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

/** A list of shows; with a mouse, that show's photo follows the pointer, tilting with its speed. */
export default function Shows() {
  const [hover, setHover] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 26, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 26, mass: 0.5 });
  const rotate = useTransform(useVelocity(x), [-1500, 1500], [-8, 8], { clamp: true });
  const cur = hover === null ? null : shows.list[hover];

  return (
    <section className="sh" id="shows">
      <motion.h2 className="ev-heading" {...rise()}>
        {shows.title}
      </motion.h2>
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
              <span className="sh-title">{s.title}</span>
              <span className="sh-text">{s.text}</span>
              <span className="sh-date">{s.date}</span>
              <span className="ev-dot" aria-hidden>
                <Arrow />
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
      <a href={shows.all} className="ev-link" target="_blank" rel="noreferrer noopener">
        <span className="ev-link-text">All events</span>
        <span className="ev-dot" aria-hidden>
          <Arrow />
        </span>
      </a>

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
        {cur && <figcaption>{cur.cap}</figcaption>}
      </motion.figure>
    </section>
  );
}
