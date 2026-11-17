"use client";

// /home's Upcoming events as a show calendar. The section holds still while the page scrolls through the shows, one per
// step: a desk calendar turns to each show's month (its days flip in like a departures board, then the show's dates draw
// across them), the stand we built there is revealed beside it, the days to go roll over, and a rail along the foot maps
// the months ahead with a playhead that follows the scroll. The rail's dots jump straight to a show.
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { dateRange, fullDate, place, type LevoEvent } from "@/lib/events";
import { contact, shows } from "@/lib/home";
import { scrollToY } from "./SmoothScroll";
import { Button, Label, Lines, SplitTitle } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;
const DAY = 864e5;
const WEEK = ["M", "T", "W", "T", "F", "S", "S"];
const monthOf = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  timeZone: "UTC",
});
const utc = (iso: string) => Date.parse(`${iso}T00:00:00Z`);
const two = (k: number) => String(k).padStart(2, "0");
const monthNo = (iso: string) => +iso.slice(0, 4) * 12 + +iso.slice(5, 7) - 1;

/** Six Monday-first weeks around the month a show opens, each day marked if the show runs then. */
function monthGrid(e: LevoEvent) {
  const s = utc(e.start);
  const end = utc(e.end ?? e.start);
  const d0 = new Date(s);
  const first = Date.UTC(d0.getUTCFullYear(), d0.getUTCMonth(), 1);
  const lead = (new Date(first).getUTCDay() + 6) % 7;
  return Array.from({ length: 42 }, (_, k) => {
    const t = first + (k - lead) * DAY;
    return {
      t,
      day: new Date(t).getUTCDate(),
      out: new Date(t).getUTCMonth() !== d0.getUTCMonth(),
      on: t >= s && t <= end,
    };
  });
}

export default function ShowCalendar({ events }: { events: LevoEvent[] }) {
  const track = useRef<HTMLDivElement>(null);
  const n = events.length;
  const [{ i, turn }, setStep] = useState({ i: 0, turn: 0 }); // turn: counts every change, so the newest photo lies on top
  const [today, setToday] = useState<number | null>(null); // the visitor's date, read after mount (the page is cached)
  useEffect(() => {
    const d = new Date();
    setToday(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  }, []);

  const { scrollYProgress: p } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(p, "change", (v) => {
    const k = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    setStep((s) => (s.i === k ? s : { i: k, turn: s.turn + 1 }));
  });

  // the rail: one tick per month from the first show to the last; each show sits at its day within its month
  const m0 = monthNo(events[0]?.start ?? "2000-01-01");
  const span = (n ? monthNo(events[n - 1].start) : m0) - m0 + 1;
  const at = (e: LevoEvent) =>
    (monthNo(e.start) - m0 + (+e.start.slice(8, 10) - 1) / 31) / span;
  // the playhead rests on each show at the middle of its step and travels between them
  const only = n ? at(events[0]) : 0;
  const head = useTransform(
    p,
    n > 1 ? events.map((_, k) => (k + 0.5) / n) : [0, 1],
    n > 1 ? events.map(at) : [only, only],
  );
  const headLeft = useTransform(head, (v) => `${v * 100}%`);

  // days to go, rolling from the last show's count to this one's
  const count = useMotionValue(0);
  const shown = useTransform(count, (v) =>
    Math.round(v).toLocaleString("en-GB"),
  );
  const e = events[i];
  const days =
    today === null || !e ? null : Math.round((utc(e.start) - today) / DAY);
  const live = days !== null && days <= 0;
  useEffect(() => {
    if (days === null) return;
    const c = animate(count, Math.max(days, 0), { duration: 1.1, ease });
    return () => c.stop();
  }, [days, count]);

  if (!e) return null;

  // picking a show by hand (the arrows, or a dot on the rail) glides the page to the middle of that show's step, so the
  // calendar and the scroll never disagree
  const go = (k: number) => {
    const el = track.current;
    if (!el || k < 0 || k >= n) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    scrollToY(top + ((k + 0.5) / n) * (el.offsetHeight - window.innerHeight));
  };

  // the month and year rolls: each month (and year) the shows fall in, stacked in a strip that slides to the current
  // one, like an odometer. A fast scroll just rolls further, so two titles can never sit on top of each other.
  const months = [...new Set(events.map((ev) => ev.start.slice(0, 7)))];
  const years = [...new Set(events.map((ev) => ev.start.slice(0, 4)))];
  const roll = (list: string[], key: string) => ({ y: `${(-list.indexOf(key) / list.length) * 100}%` });

  const grid = monthGrid(e);
  let band = 0; // order of the show's days, so its dates draw across the grid one after another

  return (
    <section className="section cal-sec" id="shows">
      <Lines />
      <div className="head cols">
        <div className="head-left">
          <Label title={shows.label} />
          <p className="muted">{shows.intro}</p>
          <Button href="/home/events" className="head-btn">
            {shows.cta}
          </Button>
        </div>
        <SplitTitle className="giant" text={shows.title} />
      </div>

      <div
        ref={track}
        className="cal-track"
        style={{ "--n": n } as React.CSSProperties}
      >
        <div className="cal-stage">
          {/* the desk calendar: its month and days are left out for screen readers (the dates are in the text beside it),
              its arrows are not */}
          <div className="cal-card">
            <div className="cal-top">
              <span className="cal-roll cal-month" aria-hidden>
                <motion.span className="cal-strip" initial={false} animate={roll(months, e.start.slice(0, 7))} transition={{ duration: 0.7, ease }}>
                  {months.map((m) => (
                    <span key={m}>{monthOf.format(utc(`${m}-01`))}</span>
                  ))}
                </motion.span>
              </span>
              <div className="cal-nav">
                <span className="cal-roll cal-year mono-up" aria-hidden>
                  <motion.span className="cal-strip" initial={false} animate={roll(years, e.start.slice(0, 4))} transition={{ duration: 0.7, ease }}>
                    {years.map((y) => (
                      <span key={y}>{y}</span>
                    ))}
                  </motion.span>
                </span>
                {/* turn the calendar by hand, a show at a time */}
                {[-1, 1].map((d) => (
                  <button
                    key={d}
                    type="button"
                    className="cal-arrow"
                    onClick={() => go(i + d)}
                    disabled={!events[i + d]}
                    aria-label={events[i + d] ? `${d < 0 ? "Previous" : "Next"} show: ${events[i + d].title}` : d < 0 ? "Previous show" : "Next show"}
                  >
                    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden>
                      <path d={d < 0 ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"} fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            <div className="cal-week mono-up" aria-hidden>
              {WEEK.map((w, k) => (
                <span key={k}>{w}</span>
              ))}
            </div>
            <div className="cal-pages" aria-hidden>
              {/* one page at a time: the old one lifts away before the next flips in, so a fast scroll skips the pages
                  between rather than piling them up */}
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={i}
                  className="cal-grid"
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.18 } }}
                >
                  {grid.map((c, k) => {
                    const order = c.on ? band++ : 0;
                    return (
                      <motion.span
                        key={k}
                        className={`cal-day${c.out ? " is-out" : ""}${c.on ? " is-on" : ""}${c.t === today ? " is-today" : ""}`}
                        initial={{ rotateX: -90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: ((k % 7) + Math.floor(k / 7)) * 0.022,
                          ease,
                        }}
                      >
                        {c.on && (
                          <motion.i
                            className="cal-band"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.5 + order * 0.07,
                              ease,
                            }}
                          />
                        )}
                        <b>{c.day}</b>
                      </motion.span>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* the stand we built at this show, uncovered from the foot up over the last one */}
          <figure className="cal-photo">
            <div className="cal-shots">
              <AnimatePresence initial={false}>
                <motion.img
                  key={e.img}
                  src={e.img}
                  alt={e.cap}
                  style={{ zIndex: turn }}
                  initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { delay: 0.8, duration: 0.2 },
                  }}
                  transition={{ duration: 0.9, ease }}
                />
              </AnimatePresence>
            </div>
            <figcaption className="mono-up">{e.cap}</figcaption>
          </figure>

          <div className="cal-info">
            <p className="cal-count">
              {live ? (
                <span className="cal-live">
                  <i aria-hidden /> Live
                </span>
              ) : (
                <motion.span>{shown}</motion.span>
              )}
              <span className="mono-up muted">
                {live
                  ? `On now, until ${fullDate(e.end ?? e.start)}`
                  : days === 1
                    ? "day to go"
                    : "days to go"}
              </span>
            </p>
            {/* announced as it changes; the rolling count above is kept out of this, or it would be read out every frame */}
            <div aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={i}
                  className="cal-detail"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <p className="cal-meta mono-up muted">
                    <span>
                      {two(i + 1)} / {two(n)}
                    </span>
                    <span>
                      {e.region} · {e.industry}
                    </span>
                  </p>
                  <h3 className="cal-title">{e.title}</h3>
                  <p className="cal-when mono-up">{dateRange(e)}</p>
                  <p className="cal-where">
                    {place(e)}, {e.country}
                  </p>
                  <p className="cal-text muted">{e.text}</p>
                  <div
                    className="sh-clients"
                    aria-label={`Built here for ${e.clients.map((c) => c.name).join(", ")}`}
                  >
                    <span
                      className="sh-clients-label mono-up muted"
                      aria-hidden
                    >
                      Built here for
                    </span>
                    <span className="sh-tiles" aria-hidden>
                      {e.clients.map((c) => (
                        <span key={c.name} className="sh-tile">
                          {c.logo ? (
                            <img src={c.logo} alt="" loading="lazy" />
                          ) : (
                            <b>{c.name}</b>
                          )}
                        </span>
                      ))}
                    </span>
                  </div>
                  <a
                    href={`mailto:${contact.email}?subject=${encodeURIComponent(`A stand at ${e.title}`)}`}
                    className="evp-link mono-up"
                  >
                    Plan your stand here <span aria-hidden>+</span>
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* the months ahead: a tick a month, the year at each January, a dot per show, and the playhead */}
          <div className="cal-rail">
            <div className="cal-line">
              <motion.i className="cal-fill" style={{ scaleX: head }} />
              {Array.from({ length: span }, (_, k) => {
                const m = (m0 + k) % 12;
                return (
                  <span
                    key={k}
                    className={`cal-tick${m === 0 || k === 0 ? " is-year" : ""}`}
                    style={{ left: `${(k / span) * 100}%` }}
                    aria-hidden
                  >
                    {(m === 0 || k === 0) && (
                      <em className="mono-up">{Math.floor((m0 + k) / 12)}</em>
                    )}
                  </span>
                );
              })}
              {events.map((ev, k) => (
                <button
                  key={ev.title}
                  type="button"
                  className={`cal-dot${k === i ? " is-on" : ""}${k < i ? " is-past" : ""}`}
                  style={{ left: `${at(ev) * 100}%` }}
                  onClick={() => go(k)}
                  aria-label={`${ev.title}, ${dateRange(ev)}`}
                  aria-current={k === i ? "step" : undefined}
                >
                  <span className="mono-up">{two(k + 1)}</span>
                  <em className="cal-tip mono-up" aria-hidden>
                    {ev.title}
                  </em>
                </button>
              ))}
              <motion.i
                className="cal-head"
                style={{ left: headLeft }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
