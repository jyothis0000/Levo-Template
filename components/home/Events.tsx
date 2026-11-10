"use client";

// Taken from /home2's "A selection of our work" (its staggered rows, the pinned pair and the image wipe), dressed in
// /home's own design: the label + giant-title head, the column rules, one card per column, square photos.
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { events } from "@/lib/home";
import { Button, Label, Lines, SplitTitle } from "./ui";

const ease = [0.14, 0.83, 0.4, 1] as const; // /home2's reveal curve
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
      <div className="ev-cap">
        <p className="mono-up muted">{p.place}</p>
        <h4>{p.title}</h4>
      </div>
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
    <section className="section soft events" id="events">
      <Lines />
      <div className="head cols">
        <div className="head-left">
          <Label title={events.label} />
          <p className="muted">{events.intro}</p>
          <Button href={events.all} external className="head-btn">
            {events.cta}
          </Button>
        </div>
        <SplitTitle className="giant" text={events.title} />
      </div>

      <div className="ev-bar">
        <span className="mono-up">{events.filtersLabel}</span>
        <ul className="tags">
          {events.filters.map((f) => (
            <li key={f.label}>
              <a href={events.all} {...ext}>
                {f.label}
                <sup>{f.count}</sup>
              </a>
            </li>
          ))}
        </ul>
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
