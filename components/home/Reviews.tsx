"use client";

// /home's reviews as a pile of reference letters. Turning the pile (drag the top letter either way, the arrows, or the
// list of clients) slides the top letter out to one side and tucks it in at the back of the pile, while the next one
// steps up to the front and its words come up one by one; going back pulls the last letter out from the bottom and lays
// it on top. While nobody is reading (not pointed at, focused or dragged, and on screen), the pile turns itself; the line
// under the arrows is that timer. The numbers under the pile roll into place like an odometer once they are in view.
import { motion, useInView, type PanInfo } from "motion/react";
import { memo, useRef, useState, type CSSProperties } from "react";
import { clients, reviews } from "@/lib/home";
import { Label, Lines, SplitTitle } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;
// a letter going round: out beside the pile and straight back in, easing through the turn without hanging there
const swingOut = [0.33, 0.7, 0.55, 1] as const;
const swingIn = [0.45, 0, 0.35, 1] as const;
const LETTERS = reviews.letters;
const N = LETTERS.length;
const two = (k: number) => String(k).padStart(2, "0");
const mod = (k: number) => ((k % N) + N) % N;

// a letter's place in the pile: 0 on top, the others behind it, each a little lower, smaller and askew. The letters are
// layered by z (the pile is a 3D context, sorted by depth), because z can be animated and zIndex can't.
const place = (d: number) => {
  const k = Math.min(d, 3);
  return { x: 0, y: k * 12, z: -d * 10, scale: 1 - k * 0.04, rotate: [0, -2.4, 2, -1.2][k], opacity: 1 };
};

// a letter going round the pile, from place a to place b: out to one side, then in again at the other end of the pile.
// Going to the back it leaves over the pile and comes back under it; coming up from the bottom, the other way round.
const round = (a: number, b: number, side: number, w: number) => {
  const to = place(b);
  return {
    x: [null, side * Math.min(w * 0.3, 150), 0], // just out from the pile, not across the page
    y: [null, -34, to.y],
    z: b > a ? [null, 60 - a * 10, -60, to.z] : [null, -60, 60 - b * 10, to.z],
    rotate: [null, side * 7, to.rotate],
    scale: [null, 1, to.scale],
    opacity: [null, 0.1, 1], // all but gone as it changes layer, so the change doesn't show
  };
};

// n: how many letters the pile turned (minus: back); side: which way they went out; w: the pile's width, in px
type Turn = { i: number; from: number; n: number; side: 1 | -1; w: number };

/** A number whose digits roll into place, like an odometer, the first time it is fully in view. */
function RollNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const on = useInView(ref, { once: true, amount: 1 });
  let d = 0;
  return (
    <span ref={ref} className="roll-num">
      <span className="roll-text">{value}</span>
      {[...value].map((c, k) => {
        if (!/\d/.test(c))
          return (
            <span key={k} aria-hidden>
              {c}
            </span>
          );
        const delay = d++ * 0.12;
        return (
          <span key={k} className="roll-digit" aria-hidden>
            {/* the final digit, unseen, sizes the slot, so a "1" sits as close as in plain text */}
            <span className="roll-size">{c}</span>
            {/* 0–9 twice: each digit spins once round before it settles */}
            <motion.span className="roll-strip" initial={{ y: "0%" }} animate={on ? { y: `${(-(10 + +c) / 20) * 100}%` } : undefined} transition={{ duration: 1.9, delay, ease }}>
              {[..."01234567890123456789"].map((x, j) => (
                <span key={j}>{x}</span>
              ))}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

/** What is written on a letter. It never changes, so turning the pile doesn't re-render it. */
const LetterBody = memo(function LetterBody({ l, k }: { l: (typeof LETTERS)[number]; k: number }) {
  return (
    <div className="rv-card-in">
      <div className="rv-card-top">
        <span className="rv-logo">
          <img src={l.logo} alt="" draggable={false} />
        </span>
        <div>
          <b className="mono-up">{l.company}</b>
          <span className="muted">{l.role}</span>
        </div>
        <span className="stars" aria-label="Five stars">
          ★★★★★
        </span>
      </div>
      <span className="rv-mark" aria-hidden>
        “
      </span>
      <blockquote className="rv-quote">
        {l.quote.split(" ").map((w, j) => (
          <span key={j}>
            <span style={{ "--j": j } as CSSProperties}>{w}</span>{" "}
          </span>
        ))}
      </blockquote>
      <div className="rv-card-foot mono-up">
        <span className="muted">Reference letter</span>
        <span>
          {two(k + 1)} / {two(N)}
        </span>
      </div>
    </div>
  );
});

/** The pile of letters with its list, arrows and timer: a component of its own, so turning it re-renders only this. */
function Pile() {
  const box = useRef<HTMLDivElement>(null);
  const deck = useRef<HTMLDivElement>(null);
  const seen = useInView(box, { amount: 0.35 });
  const [turn, setTurn] = useState<Turn>({ i: 0, from: 0, n: 0, side: -1, w: 0 });
  const [held, setHeld] = useState(false);

  // turn the pile n letters (minus: back)
  const step = (n: number, side: 1 | -1 = -1) => {
    const w = deck.current?.offsetWidth ?? 0;
    if (n) setTurn((t) => ({ i: mod(t.i + n), from: t.i, n, side, w }));
  };
  // to letter k, the shorter way round
  const go = (k: number) => {
    const s = mod(k - turn.i);
    step(s > N / 2 ? s - N : s);
  };

  const letGo = (_: unknown, info: PanInfo) => {
    setHeld(false);
    if (Math.abs(info.offset.x) > 110 || Math.abs(info.velocity.x) > 600) step(1, info.offset.x < 0 ? -1 : 1);
  };

  return (
    <div
      ref={box}
      className={`rv cols${seen ? "" : " is-idle"}${held ? " is-held" : ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Reference letters from clients"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
    >
      <div className="rv-side">
        {/* which letter, rolling like the calendar's month (its odometer styles are shared) */}
        <p className="rv-no" aria-hidden>
          <span className="cal-roll">
            <motion.span className="cal-strip" initial={false} animate={{ y: `${(-turn.i / N) * 100}%` }} transition={{ duration: 0.7, ease }}>
              {LETTERS.map((_, k) => (
                <span key={k}>{two(k + 1)}</span>
              ))}
            </motion.span>
          </span>
          <span className="muted">/ {two(N)}</span>
        </p>

        <ol className="rv-list">
          {LETTERS.map((l, k) => (
            <li key={l.company}>
              <button type="button" className={k === turn.i ? "is-on" : undefined} aria-current={k === turn.i || undefined} onClick={() => go(k)}>
                {k === turn.i && <motion.i layoutId="rv-bar" className="rv-bar" transition={{ duration: 0.5, ease }} />}
                <span className="mono-up">{two(k + 1)}</span>
                {l.company}
              </button>
            </li>
          ))}
        </ol>

        <div className="rv-controls">
          {[-1, 1].map((d) => (
            <button key={d} type="button" className="cal-arrow" onClick={() => step(d)} aria-label={d < 0 ? "Previous letter" : "Next letter"}>
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden>
                <path d={d < 0 ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"} fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          ))}
          {/* the timer: when this line fills, the pile turns (CSS pauses it while the slider is in use or off screen) */}
          <span className="rv-progress" aria-hidden>
            <i key={turn.i} onAnimationEnd={() => step(1)} />
          </span>
        </div>
      </div>

      <div ref={deck} className="rv-deck" style={{ "--rv-words": turn.n < 0 ? "0.35s" : "0.15s" } as CSSProperties}>
        {LETTERS.map((l, k) => {
          const d = mod(k - turn.i); // where letter k is in the pile now
          const was = mod(k - turn.from); // and where it was before this turn
          const top = d === 0;
          // the letters that went round the pile this turn, one after another; the rest step up (or down) a place
          const goesRound = turn.n > 0 ? d > was : turn.n < 0 && d < was;
          const delay = goesRound ? (turn.n > 0 ? was : -turn.n - 1 - d) * 0.1 : 0;
          // a label per turn, so a letter going round twice in a row plays its (same) keyframes again
          const label = goesRound ? `round${turn.from}-${turn.i}` : `place${d}`;
          return (
            <motion.article
              key={l.company}
              className={`rv-card${top ? " is-front" : ""}`}
              initial={false}
              variants={{ [label]: goesRound ? round(was, d, turn.side, turn.w) : place(d) }}
              animate={label}
              transition={
                goesRound
                  ? {
                      duration: 0.85,
                      delay,
                      times: [0, 0.4, 1],
                      ease: [swingOut, swingIn],
                      // it changes layer in a blink, while it is out beside the pile
                      z: { duration: 0.85, delay, times: [0, 0.39, 0.41, 1], ease: [swingOut, "linear", swingIn] },
                    }
                  : { duration: 0.85, delay, ease }
              }
              drag={top ? "x" : false}
              dragSnapToOrigin
              dragElastic={0.6}
              onDragStart={() => setHeld(true)}
              onDragEnd={letGo}
              aria-roledescription="slide"
              aria-label={`${k + 1} of ${N}: ${l.company}`}
              aria-hidden={!top}
              inert={!top}
            >
              <LetterBody l={l} k={k} />
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="section reviews" id="reviews">
      <Lines />
      <div className="head cols">
        <div className="head-left">
          <Label title="Client reviews" />
          <p className="muted">{reviews.intro}</p>
        </div>
        <SplitTitle className="giant" text="True Stories." />
      </div>

      <Pile />

      <div className="review-stats cols">
        <div className="review-score">
          <div className="avatars">
            {clients.slice(4, 8).map((c) => (
              <span key={c.name}>
                <img src={c.logo} alt={c.name} />
              </span>
            ))}
          </div>
          <div className="rv-score">
            <p className="rv-rating">
              <RollNumber value={String(reviews.rating)} />
              <span className="muted">/5</span>
            </p>
            {/* the stars fill as the rating rolls in, to 4.7 of 5 */}
            <span className="rv-stars" aria-hidden>
              <motion.i
                initial={{ width: "0%" }}
                whileInView={{ width: `${(reviews.rating / 5) * 100}%` }}
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 1.9, ease }}
              />
            </span>
            <p className="mono-up muted">
              From <RollNumber value={String(reviews.count)} /> client reviews
            </p>
          </div>
        </div>
        {reviews.stats.map((s) => (
          <div key={s.label} className="stat-card dark">
            <span className="mono-up stat-label">{s.label}</span>
            <span className="mono-up muted">↑ {s.note}</span>
            <span className="stat-value">
              <RollNumber value={`${s.prefix}${s.value.toLocaleString("en-GB")}${s.suffix}`} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
