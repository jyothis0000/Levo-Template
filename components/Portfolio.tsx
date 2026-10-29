"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { highlights, portfolioIntro, projects } from "@/lib/content";
import { Button, Label, Lines, Reveal, SplitTitle } from "./ui";

type Project = (typeof projects)[number];

// The Levo "L" from logo-black.svg, normalised to its own box: the bar with its diagonally cut foot, then the foot.
const L = [[0, 0], [0.3282, 0], [0.3282, 0.8038], [1, 0.8038], [1, 1], [0.3282, 1], [0, 0.8325]];
// where each of those corners ends up once the window has opened to the whole frame
const FULL = [[0, 0], [1, 0], [1, 0], [1, 0], [1, 1], [0.3282, 1], [0, 1]];
const L_RATIO = 602.47 / 1060.41;
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2; // gentle at both ends
const pad = (k: number) => String(k).padStart(2, "0");
const REST = 115; // vh each case stays pinned before the next one slides over it (its margin; the last, a spacer)
const STEP = 100 + REST; // vh of scroll per case: its own height plus its rest
// the L stays an L until the card is nearly up (its top 25% down the screen), then opens over 95vh of scroll,
// done 70vh after it pins — leaving 45vh fully open before the next case arrives
const OPEN_FROM = 25;
const OPEN_TO = -70;

/** The photo's window: the logo's L, centred at 62% of the frame's height, opening into the full frame as t → 1. */
function lWindow(t: number, aspect: number) {
  const h = 0.62;
  const w = (h * L_RATIO) / aspect; // as a share of the frame's width, so the L keeps the logo's proportions
  const x0 = 0.5 - w / 2;
  const y0 = 0.5 - h / 2;
  const e = easeInOutSine(t);
  const pts = L.map(([x, y], k) => {
    const sx = x0 + x * w;
    const sy = y0 + y * h;
    return `${((sx + (FULL[k][0] - sx) * e) * 100).toFixed(2)}% ${((sy + (FULL[k][1] - sy) * e) * 100).toFixed(2)}%`;
  });
  return `polygon(${pts.join(", ")})`;
}

/**
 * One case in a pinned deck: it slides up over the one before, its photo seen first through the Levo "L", which opens
 * slowly to the whole frame as the card lands and settles; held at the top, it sinks back — smaller, tilted away,
 * darker — under the next case.
 */
function Work({ p, i, n, deck }: { p: Project; i: number; n: number; deck: React.RefObject<HTMLDivElement | null> }) {
  const frame = useRef<HTMLDivElement>(null);
  const aspect = useRef(2.3);
  const still = useReducedMotion();
  const last = i === n - 1;
  // measured against the deck, not the card: a pinned card always reads as "at the top". The card sits STEP·i vh into it.
  type Edge = `start ${number}vh`;
  const at = (k: number): Edge => `start ${-STEP * k}vh`; // the case k card has reached the top of the screen
  const enters = (k: number): Edge => `start ${100 - STEP * k}vh`; // …its top is at the bottom of the screen
  // arriving: from the bottom of the screen to the top, where it pins
  const { scrollYProgress: arrive } = useScroll({ target: deck, offset: [enters(i), at(i)] });
  // covered: the next case arriving over it, after its REST
  const { scrollYProgress: covered } = useScroll({ target: deck, offset: [enters(i + 1), at(i + 1)] });
  // held: from pinning until fully covered — or, for the last case, until it leaves after its rest
  const { scrollYProgress: held } = useScroll({ target: deck, offset: [at(i), last ? `start ${-STEP * i - REST}vh` : at(i + 1)] });
  // opening the L: a long stretch, through the pin and into the rest
  const { scrollYProgress: opening } = useScroll({
    target: deck,
    offset: [`start ${OPEN_FROM - STEP * i}vh`, `start ${OPEN_TO - STEP * i}vh`],
  });

  useEffect(() => {
    const el = frame.current!;
    const ro = new ResizeObserver(() => {
      if (el.clientHeight) aspect.current = el.clientWidth / el.clientHeight;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // a soft spring on top, so wheel steps glide rather than jump
  const open = useSpring(opening, { stiffness: 70, damping: 24, restDelta: 0.001 });
  const clip = useTransform(open, (t) => (still ? "none" : lWindow(t, aspect.current)));
  const radius = useTransform(arrive, [0.7, 1], [32, 0]);
  const scale = useTransform(covered, [0, 1], [1, last || still ? 1 : 0.88]);
  const tilt = useTransform(covered, [0, 1], [0, last || still ? 0 : 8]);
  const shade = useTransform(covered, [0, 1], [0, last ? 0 : 0.7]);

  return (
    // a sticky card can't stick inside its own margin, so the last one rests over a spacer instead (see Portfolio)
    <article className="work" style={{ marginBottom: last ? 0 : `${REST}vh` }}>
      <motion.div className="work-card" style={{ scale, rotateX: tilt, borderTopLeftRadius: radius, borderTopRightRadius: radius }}>
        <div className="work-bg" aria-hidden>
          <img src={p.img} alt="" loading="lazy" />
        </div>
        <Lines />

        <div className="work-top cols mono-up">
          <span>
            Case study <span className="muted">/{pad(i + 1)}</span>
          </span>
          <span className="muted">{p.show}</span>
          <span className="work-count">
            <b>{pad(i + 1)}</b> <span className="muted">— {pad(n)}</span>
          </span>
        </div>

        <motion.div ref={frame} className="work-frame" style={{ clipPath: clip }}>
          {/* shown at its own size: no zoom, which only blew the photos up past their resolution */}
          <img src={p.img} alt={`${p.client} stand at ${p.show}`} loading="lazy" />
        </motion.div>

        <div className="work-info">
          <SplitTitle as="h3" className="work-client" text={p.client} />
          <dl className="work-specs mono-up">
            <div>
              <dt className="muted">Size</dt>
              <dd>{p.size}</dd>
            </div>
            <div>
              <dt className="muted">Year</dt>
              <dd>{p.year}</dd>
            </div>
            <div>
              <dt className="muted">Venue</dt>
              <dd>{p.venue}</dd>
            </div>
          </dl>
        </div>

        {/* fills while the case is held, like a story timer */}
        <motion.i className="work-progress" style={{ scaleX: held }} aria-hidden />
        <motion.div className="work-shade" style={{ opacity: shade }} aria-hidden />
      </motion.div>
    </article>
  );
}

function MoreWorks() {
  const [hover, setHover] = useState<number | null>(null);
  const list = projects.slice(4, 9);
  return (
    <div className="more cols">
      <div className="head-left">
        <Label title="More cases" />
        <p className="muted">{portfolioIntro.more}</p>
        <Button variant="light" className="more-btn">All projects</Button>
      </div>
      <ul className="more-list" onMouseLeave={() => setHover(null)}>
        {list.map((p, i) => (
          <li key={p.client} onMouseEnter={() => setHover(i)} className={hover === i ? "is-active" : ""}>
            <span className="mono-up muted">{String(i + 1).padStart(2, "0")}</span>
            <div className="more-thumb">
              <AnimatePresence>
                {hover === i && (
                  <motion.img
                    src={p.img}
                    alt=""
                    initial={{ clipPath: "inset(50% 0 50% 0)" }}
                    animate={{ clipPath: "inset(0% 0 0% 0)" }}
                    exit={{ clipPath: "inset(50% 0 50% 0)" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </AnimatePresence>
            </div>
            <span className="mono-up muted">{p.year}</span>
            <div>
              <b>{p.client}</b>
              <span className="muted">{p.show}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Highlights() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.75], [3, 1]);
  const textO = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textS = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const capO = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

  return (
    <div ref={ref} className="reel">
      <div className="reel-sticky">
        <motion.div className="reel-grid" style={{ scale }}>
          {highlights.slice(0, 9).map((src, i) => (
            <div key={i} className="reel-cell">
              <img src={src} alt="" loading="lazy" />
              {i === 4 && (
                <motion.div className="reel-cap mono-up" style={{ opacity: capO }}>
                  <span>{portfolioIntro.count} projects</span>
                  <span className="reel-play">▶</span>
                  <span>Levo in action</span>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
        <motion.h3 className="reel-title" style={{ opacity: textO, scale: textS }}>
          {portfolioIntro.reel}
        </motion.h3>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const deck = useRef<HTMLDivElement>(null);
  return (
    <section className="section dark portfolio" id="projects">
      <Lines />
      <div className="head cols">
        <div className="head-left">
          <Label title="Portfolio" />
          <p className="muted">{portfolioIntro.text}</p>
        </div>
        <SplitTitle className="giant" text="Case studies." />
      </div>

      <div ref={deck} className="works">
        {projects.slice(0, 4).map((p, i) => (
          <Work key={p.client} p={p} i={i} n={4} deck={deck} />
        ))}
        {/* the last case stays pinned while this scrolls past, then leaves with the deck */}
        <div style={{ height: `${REST}vh` }} aria-hidden />
      </div>

      <MoreWorks />

      <div className="head cols">
        <div className="head-left">
          <Label title="Showreel" />
          <p className="muted">{portfolioIntro.reelText}</p>
        </div>
        <Reveal className="giant">
          <span className="glow">Highlights</span>
        </Reveal>
      </div>
      <Highlights />
    </section>
  );
}
