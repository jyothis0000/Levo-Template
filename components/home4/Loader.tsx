"use client";

// The /home4 loader, after the screen recording supplied for it: on black, a bar fills (in the logo's own colours) while a
// big counter rolls up to 100; the bar splits, its left half swings up into an "L", and the L zooms until the page shows
// through it.
// The L is Levo's own mark (the stem with the cut corner and the foot, as in logo-black.svg and /home's LogoL), drawn in
// its own 602.47 × 1060.41 units. Every shape below is a pure function of one clock (`t`, seconds), written straight to
// the SVG, so there is no chain of tweens to drift out of step.
import { animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { lockScroll } from "@/components/home/SmoothScroll";

// the timeline, in seconds
const COUNT = 1.6; // the counter climbs 000 → 100 as the bar fills
const SEAM = 0.15; // a hairline opens between the bar's two halves
const SWING = 0.6; // the left half swings up, the right shortens: together a stepped "L"
const SETTLE = 0.25; // the stem drops beside the foot and the logo's cut corner appears
const HOLD = 0.4; // the finished logo L, still
const ZOOM = 0.95; // it grows until the page fills its stem
const T_SEAM = COUNT;
const T_SWING = T_SEAM + SEAM;
const T_SETTLE = T_SWING + SWING;
const T_HOLD = T_SETTLE + SETTLE;
const T_ZOOM = T_HOLD + HOLD;
const TOTAL = T_ZOOM + ZOOM;
const REVEAL = 0.35; // share of the zoom after which the page's own entrance (the hero) and the header may start

// the logo's L, in its own units
const STEM_W = 197.75;
const H = 1060.41;
const FOOT_TOP = 852.38;
const FOOT_R = 602.47;
const FOOT_H = H - FOOT_TOP; // 208.03: also the bar's thickness
const CUT = H - 882.83; // the stem's cut bottom-left corner
const M = 196.855; // where the foot meets the stem (the seam of the bar)
const HALF = 572; // each half of the bar; 5.5 : 1 with its thickness, as in the recording
const L_OUTLINE: [number, number][] = [
  [0, 0],
  [STEM_W, 0],
  [STEM_W, FOOT_TOP],
  [FOOT_R, FOOT_TOP],
  [FOOT_R, H],
  [STEM_W, H],
  [0, H - CUT],
];

// the logo's own gradient (logo-black.svg, as /home's LogoL): navy at the foot of each part, blue at its top
const STOPS: [number, string][] = [
  [0, "#022439"],
  [0.13, "#013759"],
  [0.3, "#004b7b"],
  [0.46, "#005b95"],
  [0.64, "#0066a8"],
  [0.81, "#006db4"],
  [1, "#0070b8"],
];
const stops = STOPS.map(([o, c]) => <stop key={c} offset={o} stopColor={c} />);

const cl = (v: number) => Math.min(1, Math.max(0, v));
const seg = (t: number, a: number, b: number) => cl((t - a) / (b - a));
const lerp = (a: number, b: number, x: number) => a + (b - a) * x;
const eio = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const eo = (x: number) => 1 - Math.pow(1 - x, 3);

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]; // a trailing 0, so 9 → 0 rolls on instead of rewinding

type Pt = [number, number];
const pts = (a: Pt[]) => a.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

/** The page's own entrance (the hero) waits for this: true once the L has opened, or at once if there is no loader. */
export function useLoaderReveal() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!document.documentElement.classList.contains("h4-loading")) {
      setReady(true);
      return;
    }
    const on = () => setReady(true);
    addEventListener("h4-reveal", on, { once: true });
    return () => removeEventListener("h4-reveal", on);
  }, []);
  return ready;
}

export default function Loader() {
  const [done, setDone] = useState(false);
  const black = useRef<SVGPathElement>(null);
  const group = useRef<SVGGElement>(null);
  const track = useRef<SVGPolygonElement>(null);
  const fill = useRef<SVGPolygonElement>(null);
  const foot = useRef<SVGPolygonElement>(null);
  const stem = useRef<SVGPolygonElement>(null);
  const pieces = useRef<SVGGElement>(null);
  const gradStem = useRef<SVGLinearGradientElement>(null);
  const gradFoot = useRef<SVGLinearGradientElement>(null);
  const count = useRef<HTMLDivElement>(null);
  const hundreds = useRef<HTMLSpanElement>(null);
  const tens = useRef<HTMLSpanElement>(null);
  const ones = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // no motion for visitors who ask for none (the overlay is also hidden by CSS before this runs)
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    const html = document.documentElement;
    html.classList.add("h4-loading");
    lockScroll(true);
    scrollTo(0, 0);

    let vw = innerWidth;
    let vh = innerHeight;
    let last = 0;
    let revealed = false;

    const draw = (t: number) => {
      last = t;
      // u: screen pixels per logo unit. The bar is 13.7vw wide (as in the recording), between 160 and 300px.
      const u = Math.min(300, Math.max(160, vw * 0.137)) / (2 * HALF);
      const pc = seg(t, 0, COUNT);
      const p = pc * 0.55 + eo(pc) * 0.45; // a steady climb that eases off at the end
      const ps = eio(seg(t, T_SWING, T_SETTLE));
      const pz = eio(seg(t, T_SETTLE, T_HOLD));
      const pk = seg(t, T_ZOOM, TOTAL);
      const ek = eio(pk);

      // the camera: the bar's centre while it is a bar, the L's centre once it is one, the stem's centre as it zooms
      const K = (1.25 * Math.hypot(vw, vh)) / (STEM_W * u);
      const k = Math.pow(K, ek);
      const rot = (4 * ek * Math.PI) / 180;
      const cos = Math.cos(rot);
      const sin = Math.sin(rot);
      const cx = lerp(lerp(M, FOOT_R / 2, ps), STEM_W / 2, ek);
      const cy = lerp(lerp(FOOT_TOP + FOOT_H / 2, H / 2, ps), H / 2, ek);
      const to = (x: number, y: number): Pt => {
        const dx = (x - cx) * u * k;
        const dy = (y - cy) * u * k;
        return [vw / 2 + dx * cos - dy * sin, vh / 2 + dx * sin + dy * cos];
      };
      const poly = (a: Pt[]) => pts(a.map(([x, y]) => to(x, y)));

      const live = t >= T_SEAM; // from the split on, the bar is two pieces
      const zooming = pk > 0;

      // the bar: a dim track, filled in the logo's colours as the counter climbs
      const bx1 = M + HALF;
      track.current!.setAttribute("points", live ? "" : poly([[M - HALF, FOOT_TOP], [bx1, FOOT_TOP], [bx1, H], [M - HALF, H]]));
      const fx = M - HALF + 2 * HALF * p;
      fill.current!.setAttribute("points", live ? "" : poly([[M - HALF, FOOT_TOP], [fx, FOOT_TOP], [fx, H], [M - HALF, H]]));

      // the two pieces: a hairline opens at the seam, then the left half swings up about its right-hand end (the stem)
      const h = t < T_SETTLE ? 4 * eo(seg(t, T_SEAM, T_SWING)) : lerp(4, -0.895, pz); // half the gap; ends as the logo's small overlap
      const fl = M + h;
      const fr = lerp(M + HALF, FOOT_R, ps);
      const footPts = poly([[fl, FOOT_TOP], [fr, FOOT_TOP], [fr, H], [fl, H]]);
      const bxs = M - h;
      const bys = FOOT_TOP + FOOT_H * pz; // the stem's bottom edge: level with the foot's top, then down to its bottom
      const th = (-90 * (1 - ps) * Math.PI) / 180; // lying left of the foot, then upright
      const sw = lerp(FOOT_H, STEM_W, ps);
      const sl = lerp(HALF, FOOT_TOP, ps) + FOOT_H * pz;
      const cut = CUT * pz;
      const local: Pt[] = [[0, 0], [-sw, -cut], [-sw, -sl], [0, -sl]];
      const ct = Math.cos(th);
      const st = Math.sin(th);
      const stemPts = poly(local.map(([x, y]): Pt => [bxs + x * ct - y * st, bys + x * st + y * ct]));

      foot.current!.setAttribute("points", live ? footPts : "");
      stem.current!.setAttribute("points", live ? stemPts : "");
      // once it zooms, the L fades so the page shows through it (the black layer has the same L cut out of it); the
      // pieces fade as one group, so where they overlap the colour does not double up
      pieces.current!.style.opacity = String(1 - eo(seg(pk, 0.05, 0.6)));
      // The colour is the logo's gradient, vertical, navy low to blue high. The foot (and the bar, which is the foot
      // lengthened) takes the foot's range: its own height. The left half takes that range too while it is still a bar
      // half, and slides into the stem's range (the stem's full height) as it swings up, so it ends as the logo's stem.
      const [a1, b1] = to(100.34, lerp(1035.68, 831.76, ps));
      const [a2, b2] = to(100.34, lerp(841.04, 12.34, ps));
      const [c1, d1] = to(406.48, 1035.68);
      const [c2, d2] = to(406.48, 841.04);
      for (const [g, v] of [[gradStem, [a1, b1, a2, b2]], [gradFoot, [c1, d1, c2, d2]]] as const) {
        ["x1", "y1", "x2", "y2"].forEach((n, i) => g.current!.setAttribute(n, v[i].toFixed(2)));
      }
      const rect = `M0 0H${vw}V${vh}H0Z`;
      black.current!.setAttribute("d", zooming ? `${rect}M${poly(L_OUTLINE).split(" ").join("L")}Z` : rect);

      const fade = seg(t, 0, 0.3);
      group.current!.style.opacity = String(fade);
      count.current!.style.opacity = String(fade * (1 - seg(pk, 0, 0.25)));

      // the counter: each column rolls, a tens digit turning over as the ones run from 7 to 10
      const n = p * 100;
      const f1 = n % 10;
      const f10 = Math.floor(n / 10) + cl((f1 - 7) / 3);
      const f100 = cl((n - 95) / 5);
      ones.current!.style.transform = `translateY(${-f1}em)`;
      tens.current!.style.transform = `translateY(${-f10}em)`;
      hundreds.current!.style.transform = `translateY(${-f100}em)`;

      if (!revealed && pk >= REVEAL) {
        revealed = true;
        html.classList.remove("h4-loading"); // the header and side bars fade in
        dispatchEvent(new Event("h4-reveal")); // and the hero's entrance starts
      }
    };

    const onResize = () => {
      vw = innerWidth;
      vh = innerHeight;
      draw(last);
    };
    addEventListener("resize", onResize);
    draw(0);
    const anim = animate(0, TOTAL, {
      duration: TOTAL,
      ease: "linear",
      onUpdate: draw,
      onComplete: () => {
        removeEventListener("resize", onResize); // the overlay is about to go: nothing left to redraw
        html.classList.remove("h4-loading");
        lockScroll(false);
        setDone(true);
      },
    });
    return () => {
      anim.stop();
      removeEventListener("resize", onResize);
      html.classList.remove("h4-loading");
      lockScroll(false);
    };
  }, []);

  if (done) return null;
  return (
    <div className="h4-loader" aria-hidden>
      <svg className="h4-ld-svg" width="100%" height="100%">
        <defs>
          <linearGradient ref={gradStem} id="h4-ld-stem" gradientUnits="userSpaceOnUse">
            {stops}
          </linearGradient>
          <linearGradient ref={gradFoot} id="h4-ld-foot" gradientUnits="userSpaceOnUse">
            {stops}
          </linearGradient>
        </defs>
        <path ref={black} className="h4-ld-black" fillRule="evenodd" d="M0 0H5000V5000H0Z" />
        <g ref={group}>
          <polygon ref={track} className="h4-ld-track" />
          <polygon ref={fill} fill="url(#h4-ld-foot)" />
          <g ref={pieces}>
            <polygon ref={foot} fill="url(#h4-ld-foot)" />
            <polygon ref={stem} fill="url(#h4-ld-stem)" />
          </g>
        </g>
      </svg>
      <div ref={count} className="h4-ld-count">
        {[
          [hundreds, [0, 1]],
          [tens, DIGITS],
          [ones, DIGITS],
        ].map(([ref, list], c) => (
          <span key={c} className="h4-ld-col">
            <span ref={ref as React.RefObject<HTMLSpanElement>}>
              {(list as number[]).map((d, i) => (
                <i key={i}>{d}</i>
              ))}
            </span>
          </span>
        ))}
      </div>
      <noscript>
        <style>{".h4-loader{display:none}"}</style>
      </noscript>
    </div>
  );
}
