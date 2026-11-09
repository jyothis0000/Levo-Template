"use client";

// Ported from /home2's "A selection of our work" (components/home2/Sections.tsx → Work), renamed "Events".
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { events } from "@/lib/home";

const ease = [0.14, 0.83, 0.4, 1] as const; // /home2's house curve, so the reveals move as they do there
const ext = { target: "_blank", rel: "noreferrer noopener" };

type Item = (typeof events.rows)[number][number];

/** Image wipes up from a 40% inset while settling from a slight zoom. */
function Card({ p, i }: { p: Item; i: number }) {
  return (
    <motion.a
      href={events.all}
      {...ext}
      className={`ev-card ${p.big ? "ev-big" : ""}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-8% 0px" }}
    >
      {/* chamfer sits on a wrapper so the reveal's own clip-path doesn't overwrite it */}
      <div className={p.big ? "ev-cut" : undefined}>
        <motion.div
          className="ev-img"
          variants={{ hidden: { clipPath: "inset(40% 0% 0% 0%)", opacity: 0.2 }, shown: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 } }}
          transition={{ duration: 1.2, delay: i * 0.08, ease }}
        >
          <motion.img
            src={p.img}
            alt={p.title}
            loading="lazy"
            variants={{ hidden: { scale: 1.07 }, shown: { scale: 1 } }}
            transition={{ duration: 1.4, delay: i * 0.08, ease }}
          />
        </motion.div>
      </div>
      <p className="ev-title">{p.title}</p>
      <p className="ev-place">{p.place}</p>
    </motion.a>
  );
}

/** The small pair sticks at (85% of the viewport − its own height) while the tall photo scrolls past. */
function SmallPair({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const set = () => ref.current?.style.setProperty("--so", `${innerHeight * 0.85 - ref.current.offsetHeight}px`);
    set();
    addEventListener("resize", set);
    return () => removeEventListener("resize", set);
  }, []);
  return (
    <div ref={ref} className="ev-small">
      {items.map((p, i) => (
        <Card key={p.title} p={p} i={i + 1} />
      ))}
    </div>
  );
}

export default function Events() {
  return (
    <section className="section events" id="events">
      <motion.h2
        className="ev-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.2, ease }}
      >
        {events.title}
      </motion.h2>
      <div className="ev-bar">
        <a href={events.all} className="ev-link" {...ext}>
          <span className="ev-link-text">All events</span>
          <span className="ev-dot" aria-hidden>
            <svg viewBox="0 0 16 16" width="12" height="12">
              <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </span>
        </a>
        <div className="ev-filters">
          <span className="ev-filters-title">See our focus cases</span>
          {events.filters.map((f) => (
            <a key={f.label} href={events.all} {...ext}>
              {f.label}
              <sup>{f.count}</sup>
            </a>
          ))}
        </div>
      </div>

      {events.rows.map((row, r) => (
        <div key={r} className={`ev-row ${r % 2 ? "is-flip" : ""}`}>
          {row.filter((p) => p.big).map((p) => (
            <Card key={p.title} p={p} i={0} />
          ))}
          <SmallPair items={row.filter((p) => !p.big)} />
        </div>
      ))}
    </section>
  );
}
