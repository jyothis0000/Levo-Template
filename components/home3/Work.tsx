"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { company, process, services, works } from "@/lib/home3";
import { land } from "@/lib/worldDots";
import { ease } from "./Chrome";

/** A dark band opens from the centre column to full width, then three columns drift at different speeds. */
export function Works() {
  const intro = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const { scrollYProgress: a } = useScroll({ target: intro, offset: ["start start", "end end"] });
  const band = useTransform(a, [0.05, 0.85], ["inset(0% 33.4% 0% 33.4%)", "inset(0% 0% 0% 0%)"]);
  const titleO = useTransform(a, [0.6, 0.95], [1, 0]);

  const { scrollYProgress: b } = useScroll({ target: grid, offset: ["start end", "end start"] });
  const speeds = [useTransform(b, [0, 1], ["6%", "-8%"]), useTransform(b, [0, 1], ["18%", "-22%"]), useTransform(b, [0, 1], ["2%", "-4%"])];

  return (
    <section className="wk" id="works">
      <div ref={intro} className="wk-intro">
        <div className="wk-intro-sticky">
          <motion.div className="wk-band" style={{ clipPath: band }}>
            <motion.p style={{ opacity: titleO }}>
              Our Featured
              <br />
              Projects
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div ref={grid} className="wk-grid">
        {works.columns.map((col, c) => (
          <motion.div key={c} className="wk-col" style={{ y: speeds[c] }}>
            {col.map((w) => (
              <a key={w.title} href={works.all} target="_blank" rel="noreferrer noopener" className="wk-item">
                <img src={w.img} alt={`${w.title}, ${w.meta}`} loading="lazy" />
                <span className="wk-cap">
                  <b>{w.title}</b>
                  {w.meta}
                </span>
              </a>
            ))}
          </motion.div>
        ))}
      </div>
      <div className="wk-more">
        <a href={works.all} target="_blank" rel="noreferrer noopener">
          See all 220 projects
        </a>
      </div>
    </section>
  );
}

/**
 * Service names ride a horizontal rail through a bright "window" column: the same rail is drawn twice,
 * dim everywhere and bright inside the window, so a name lights up exactly as it crosses.
 */
export function Services() {
  const ref = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [stops, setStops] = useState<number[]>([0, 0]);
  const [idx, setIdx] = useState(0);
  const n = services.length;

  useEffect(() => {
    const measure = () => {
      const el = rail.current;
      if (!el) return;
      const win = document.documentElement.clientWidth * 0.625; // window centre: middle of columns 5–6
      setStops(Array.from(el.children, (c) => win - ((c as HTMLElement).offsetLeft + (c as HTMLElement).offsetWidth / 2)));
    };
    measure();
    document.fonts.ready.then(measure);
    addEventListener("resize", measure);
    return () => removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const keys = stops.map((_, i) => (stops.length > 1 ? i / (stops.length - 1) : 0));
  const x = useTransform(p, keys, stops);
  const stripX = useTransform(p, [0, 1], ["0%", `${(-(n - 1) * 100) / n}%`]);
  useMotionValueEvent(p, "change", (v) => setIdx(Math.round(v * (n - 1))));

  const titles = (r?: React.Ref<HTMLDivElement>) => (
    <motion.div ref={r} className="sv-rail" style={{ x }}>
      {services.map((s) => (
        <span key={s.title}>{s.title}</span>
      ))}
    </motion.div>
  );

  return (
    <section ref={ref} className="sv" id="services">
      <div className="sv-sticky">
        <p className="sv-we" aria-hidden>
          we
          <br />
          do
        </p>
        <div className="sv-dim">{titles(rail)}</div>
        <div className="sv-window" aria-hidden>
          <div className="sv-bright">{titles()}</div>
          <div className="sv-media">
            <motion.div className="sv-strip" style={{ x: stripX, width: `${n * 100}%` }}>
              {services.map((s) => (
                <img key={s.title} src={s.img} alt="" loading="lazy" />
              ))}
            </motion.div>
          </div>
        </div>
        <div className="sv-text">
          <AnimatePresence mode="wait">
            <motion.p key={idx} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease }}>
              {services[idx].text}
            </motion.p>
          </AnimatePresence>
        </div>
        <p className="sv-index">
          <span>{services[idx].title}</span>
          <b>0{idx + 1}</b>
          <span className="sep" />
          <b>0{n}</b>
        </p>
      </div>
    </section>
  );
}

/** Stages as an accordion; each row fades up as it enters, one open at a time. */
export function Process() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="ps" id="process">
      <p className="ps-lead">{process.lead}</p>
      <ul className="ps-list">
        {process.stages.map((s, i) => {
          const on = open === i;
          return (
            <motion.li
              key={s.title.join(" ")}
              className={on ? "is-open" : ""}
              initial={{ opacity: 0.15, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-15% 0px -15% 0px" }}
              transition={{ duration: 0.8, ease }}
            >
              <button onClick={() => setOpen(on ? null : i)} aria-expanded={on}>
                <span className="ps-title">
                  {s.title[0]}
                  <br />
                  {s.title[1]}
                </span>
                <span className="ps-plus" aria-hidden />
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    className="ps-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease }}
                  >
                    <div className="ps-inner">
                      <p>{s.text}</p>
                      <div>
                        <p className="ps-cap">Scope</p>
                        <ul>
                          {s.scope.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}

/** Crew row, then "Working ⟷ Worldwide" closing in on a dotted globe that turns from Germany to each market. */
export function Company() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const START = 0.1; // Germany alone until here
  const DONE = 0.8; // the words meet here
  const lx = useTransform(p, [0, DONE], ["-30vw", "0vw"]);
  const rx = useTransform(p, [0, DONE], ["30vw", "0vw"]);
  // Germany (first) stays lit; scrolling then steps through the other markets, the last arriving as the words meet
  const others = company.countries.length - 1;
  const [c, setC] = useState(0);
  useMotionValueEvent(p, "change", (v) =>
    setC(v < START ? 0 : 1 + Math.min(others - 1, Math.floor(((v - START) / (DONE - START)) * others))),
  );

  return (
    <section className="co" id="company">
      <p className="co-lead">{company.lead}</p>
      <div className="co-crew">
        {company.crew.map((m, i) => (
          <motion.figure
            key={m.name}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.2, delay: i * 0.12, ease }}
          >
            <img src={m.img} alt={`${m.name} — ${m.role}`} loading="lazy" />
            <figcaption>
              <b>{m.name}</b>
              {m.role}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div ref={ref} className="co-world">
        <div className="co-sticky">
          <motion.h2 style={{ x: lx }}>Working</motion.h2>
          <Globe active={c} />
          <motion.h2 style={{ x: rx }}>Worldwide</motion.h2>
          <ul className="co-countries">
            {company.countries.map((n, i) => (
              <li key={n.name} className={i === 0 ? "is-focus" : i === c ? "is-on" : ""}>
                {n.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const RAD = Math.PI / 180;
type Vec = [number, number, number];
const toVec = (lat: number, lon: number): Vec => [Math.cos(lat * RAD) * Math.sin(lon * RAD), Math.sin(lat * RAD), Math.cos(lat * RAD) * Math.cos(lon * RAD)];
const LAND = Array.from({ length: land.length / 2 }, (_, i) => toVec(land[i * 2] / 10, land[i * 2 + 1] / 10));
const PINS = company.countries.map((n) => toVec(n.lat, n.lon));
const HUB = PINS[0]; // Germany: the focus market
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeInOut = (s: number) => (s < 0.5 ? 4 * s * s * s : 1 - (-2 * s + 2) ** 3 / 2);
// along the great circle from a to b, s = 0..1
const slerp = (a: Vec, b: Vec, s: number): Vec => {
  const om = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const f1 = Math.sin((1 - s) * om) / Math.sin(om), f2 = Math.sin(s * om) / Math.sin(om);
  return [a[0] * f1 + b[0] * f2, a[1] * f1 + b[1] * f2, a[2] * f1 + b[2] * f2];
};
// where the view settles for each step: on Germany alone, then two thirds of the way along each route, so the
// market comes near the centre while Germany stays on the near side (even for the USA)
const VIEW = PINS.map((v, i) => {
  const [x, y, z] = i ? slerp(HUB, v, 0.65) : HUB;
  return [Math.asin(y) / RAD, Math.atan2(x, z) / RAD]; // lat, lon
});
const W = 2.4; // the turn's spring: critically damped, so it eases in and out and settles in ~1.7s

/**
 * Dotted world in orthographic projection (canvas, ~2.7k dots). Faint great-circle arcs fan out from Germany to
 * every other market. On each step the globe turns to the market highlighted in the list, its route draws out once
 * the turn is under way, and then it is named. It can be dragged; let go and it glides back. Draws only on screen.
 */
function Globe({ active }: { active: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const cv = ref.current!;
    const g = cv.getContext("2d")!;
    let raf = 0;
    let [lat, lon] = VIEW[0];
    let vLat = 0;
    let vLon = 0;
    let drag: { x: number; y: number } | null = null;
    let shown = -1;
    let prev = -1;
    let since = 0;
    let colour = "#f0f0f0";
    let ground = "#022439"; // the section behind the globe, for the label halo
    let blue = "#0070b8"; // the logo's blue, for the routes and pins
    let family = "sans-serif";
    let frame = 0;
    let last = performance.now();

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const dpr = Math.min(devicePixelRatio, 2);
      const w = Math.round(cv.clientWidth * dpr);
      if (cv.width !== w) cv.width = cv.height = w;
      if (frame++ % 30 === 0) {
        // follows "invert color"
        const s = getComputedStyle(cv);
        ({ color: colour, fontFamily: family } = s);
        ground = s.getPropertyValue("--ink").trim();
        blue = s.getPropertyValue("--route").trim();
      }
      const a = activeRef.current;
      if (a !== shown) {
        prev = shown;
        shown = a;
        since = now;
      }
      const t = (now - since) / 1000;
      const grow = easeInOut(clamp01((t - 0.5) / 1.6)); // the route draws once the turn is under way
      const arrive = clamp01((t - 1.8) / 0.5); // then the market is named
      const leave = clamp01(1 - t / 0.6); // the previous route and name fade back

      // turn towards the step's view the short way round, unless it is being dragged
      if (!drag) {
        const [tLat, tLon] = VIEW[a];
        const dLon = tLon - lon - 360 * Math.round((tLon - lon) / 360);
        vLon += (dLon * W * W - vLon * 2 * W) * dt;
        vLat += ((tLat - lat) * W * W - vLat * 2 * W) * dt;
        lon += vLon * dt;
        lat += vLat * dt;
      }

      const sl = Math.sin(lon * RAD), cl = Math.cos(lon * RAD), sp = Math.sin(lat * RAD), cp = Math.cos(lat * RAD);
      const R = w * 0.46, c = w / 2;
      const proj = ([x, y, z]: Vec) => {
        const x1 = x * cl - z * sl;
        const z1 = x * sl + z * cl;
        return [c + x1 * R, c - (y * cp - z1 * sp) * R, y * sp + z1 * cp] as const; // screen x, y, depth (>0 faces us)
      };

      g.clearRect(0, 0, w, w);
      g.fillStyle = g.strokeStyle = colour;

      // rim + a 30° graticule, front half only
      g.globalAlpha = 0.22;
      g.lineWidth = dpr * 0.8;
      g.beginPath();
      g.arc(c, c, R, 0, Math.PI * 2);
      g.stroke();
      g.globalAlpha = 0.08;
      g.beginPath();
      const line = (pt: (t: number) => Vec) => {
        let on = false;
        for (let t = 0; t <= 360; t += 4) {
          const [x, y, z] = proj(pt(t));
          if (z > 0) on ? g.lineTo(x, y) : g.moveTo(x, y);
          on = z > 0;
        }
      };
      for (let m = 0; m < 180; m += 30) line((t) => toVec(t - 180, m));
      for (let p = -60; p <= 60; p += 30) line((t) => toVec(p, t));
      g.stroke();

      // land: back dots as a faint ghost, front dots brighter towards the centre
      const r = dpr * 1.15;
      const buckets: Path2D[] = Array.from({ length: 5 }, () => new Path2D());
      for (const v of LAND) {
        const [x, y, z] = proj(v);
        const b = z < 0 ? 0 : 1 + Math.min(3, Math.floor(z * 4));
        buckets[b].moveTo(x + r, y);
        buckets[b].arc(x, y, z < 0 ? r * 0.7 : r, 0, Math.PI * 2);
      }
      [0.06, 0.28, 0.45, 0.65, 0.9].forEach((o, b) => {
        g.globalAlpha = o;
        g.fill(buckets[b]);
      });

      // great-circle arc out of Germany, lifted off the surface; the far half stays hidden
      const arc = (to: Vec, part: number) => {
        const om = Math.acos(Math.min(1, HUB[0] * to[0] + HUB[1] * to[1] + HUB[2] * to[2]));
        g.beginPath();
        let on = false;
        for (let i = 0; i <= 48 * part; i++) {
          const s = i / 48;
          const lift = 1 + Math.sin(Math.PI * s) * (0.04 + om * 0.12);
          const [px, py, pz] = slerp(HUB, to, s);
          const [x, y, z] = proj([px * lift, py * lift, pz * lift]);
          if (z > 0) on ? g.lineTo(x, y) : g.moveTo(x, y);
          on = z > 0;
        }
        g.stroke();
      };
      g.fillStyle = g.strokeStyle = blue;
      g.lineWidth = dpr * 0.8;
      PINS.forEach((v, i) => {
        if (!i || i === a) return;
        g.globalAlpha = 0.4 + (i === prev ? 0.6 * leave : 0);
        arc(v, 1);
      });
      if (a) {
        g.lineWidth = dpr * 1.6;
        g.globalAlpha = 1;
        arc(PINS[a], grow);
      }

      // pins: Germany pulses and is always named; the highlighted market is named once its route lands
      g.textBaseline = "middle";
      const hubX = proj(HUB)[0];
      PINS.forEach((v, i) => {
        const [x, y, z] = proj(v);
        if (z <= 0) return;
        const named = i === 0 ? 1 : i === a ? arrive : i === prev ? leave : 0;
        g.globalAlpha = 0.7 + 0.3 * named;
        g.fillStyle = blue;
        g.beginPath();
        g.arc(x, y, dpr * (i === 0 ? 3.6 : 2.2 + 0.8 * named), 0, Math.PI * 2);
        g.fill();
        if (!named) return;
        g.globalAlpha = named;
        // a paper ring keeps a lit pin clear of the dots around it
        g.strokeStyle = colour;
        g.lineWidth = dpr;
        g.stroke();
        const left = i !== 0 && x < hubX; // western markets read to the left, clear of Germany
        const tx = x + (left ? -9 : 9) * dpr;
        g.textAlign = left ? "right" : "left";
        g.font = `${i === 0 ? 700 : 500} ${12 * dpr}px ${family}`;
        // a halo in the background colour knocks the dots out from under the name
        g.strokeStyle = ground;
        g.lineWidth = 4 * dpr;
        g.lineJoin = "round";
        g.strokeText(company.countries[i].name, tx, y);
        g.fillStyle = colour;
        g.fillText(company.countries[i].name, tx, y);
        if (i !== 0) return;
        const pulse = (now % 2000) / 2000;
        g.globalAlpha = 1 - pulse;
        g.strokeStyle = blue;
        g.lineWidth = dpr * 1.2;
        g.beginPath();
        g.arc(x, y, dpr * (5 + pulse * 16), 0, Math.PI * 2);
        g.stroke();
      });
      g.globalAlpha = 1;
    };

    // drag to spin it; let go and the turn glides back to the market in focus
    const down = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY };
      cv.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const deg = 180 / cv.clientWidth;
      lon -= (e.clientX - drag.x) * deg;
      lat = Math.max(-80, Math.min(80, lat + (e.clientY - drag.y) * deg));
      drag = { x: e.clientX, y: e.clientY };
      vLat = vLon = 0;
    };
    const up = () => (drag = null);
    cv.addEventListener("pointerdown", down);
    cv.addEventListener("pointermove", move);
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointercancel", up);

    // only animate while the section is on screen
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    });
    io.observe(cv);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      cv.removeEventListener("pointerdown", down);
      cv.removeEventListener("pointermove", move);
      cv.removeEventListener("pointerup", up);
      cv.removeEventListener("pointercancel", up);
    };
  }, []);

  return <canvas ref={ref} className="globe" aria-hidden />;
}
