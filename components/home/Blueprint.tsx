"use client";

// The background of "Our approach": an isometric blueprint of a stand that builds itself as the five stages scroll by —
// the floor plan, then the 3D wireframe, the engineering (dimensions, truss, rigging), the fabricated panels and
// graphics, and finally the lights of opening day. Each layer draws while its stage is the one being read.
import { motion, type MotionValue, useScroll, useSpring, useTransform } from "motion/react";
import type { RefObject } from "react";

type V = [number, number, number];

// isometric projection, in the drawing's own units (a 6 m × 4 m stand is 240 × 160, walls 3 m = 150)
const iso = ([x, y, z]: V) => [300 + (x - y) * 0.866, 330 + (x + y) * 0.5 - z] as const;
const line = (...pts: V[]) => "M" + pts.map((p) => iso(p).map((n) => n.toFixed(1)).join(" ")).join(" L");
const shape = (...pts: V[]) => line(...pts) + " Z";
const at = (p: V) => {
  const [x, y] = iso(p);
  return { x, y };
};

type Layer = { strokes?: string[]; dashes?: string[]; fills?: { d: string; o: number }[]; labels?: { p: V; t: string }[] };

const W = 240; // width (x)
const D = 160; // depth (y)
const H = 150; // wall height (z)
const T = 225; // truss height

const LAYERS: Layer[] = [
  // 01 · brief and floor plan: the footprint, its grid, and its dimensions
  {
    strokes: [
      shape([0, 0, 0], [W, 0, 0], [W, D, 0], [0, D, 0]),
      line([0, D + 22, 0], [W, D + 22, 0]),
      line([0, D + 14, 0], [0, D + 30, 0]),
      line([W, D + 14, 0], [W, D + 30, 0]),
      line([W + 22, 0, 0], [W + 22, D, 0]),
      line([W + 14, 0, 0], [W + 30, 0, 0]),
      line([W + 14, D, 0], [W + 30, D, 0]),
    ],
    dashes: [40, 80, 120, 160, 200].map((x) => line([x, 0, 0], [x, D, 0])).concat([40, 80, 120].map((y) => line([0, y, 0], [W, y, 0]))),
    labels: [
      { p: [W / 2 - 18, D + 40, 0], t: "6.00 M" },
      { p: [W + 40, D / 2 - 6, 0], t: "4.00 M" },
    ],
  },
  // 02 · 3D concept: back wall, side wall and a counter, as a wireframe
  {
    strokes: [
      shape([0, 0, 0], [W, 0, 0], [W, 0, H], [0, 0, H]),
      shape([0, 0, 0], [0, 110, 0], [0, 110, H], [0, 0, H]),
      shape([140, 105, 45], [220, 105, 45], [220, 145, 45], [140, 145, 45]),
      line([140, 145, 45], [140, 145, 0], [220, 145, 0], [220, 145, 45]),
      line([220, 145, 0], [220, 105, 0], [220, 105, 45]),
    ],
  },
  // 03 · engineering and approvals: height dimension, bracing, the truss and its rigging
  {
    strokes: [
      line([-22, 110, 0], [-22, 110, H]),
      line([-30, 110, 0], [-14, 110, 0]),
      line([-30, 110, H], [-14, 110, H]),
      line([0, 0, T], [W, 0, T]),
      line([0, 0, T - 16], [W, 0, T - 16]),
      line(...Array.from({ length: 13 }, (_, k): V => [k * 20, 0, k % 2 ? T - 16 : T])),
    ],
    dashes: [
      line([0, 0, 0], [W, 0, H]),
      line([0, 0, H], [W, 0, 0]),
      ...[40, 120, 200].map((x) => line([x, 0, H], [x, 0, T - 16])),
    ],
    labels: [{ p: [-46, 110, H / 2], t: "3.00 M" }],
  },
  // 04 · fabrication and graphics: the panels take on colour, the graphic wall goes up
  {
    fills: [
      { d: shape([0, 0, 0], [W, 0, 0], [W, 0, H], [0, 0, H]), o: 0.07 },
      { d: shape([0, 0, 0], [0, 110, 0], [0, 110, H], [0, 0, H]), o: 0.13 },
      { d: shape([140, 105, 45], [220, 105, 45], [220, 145, 45], [140, 145, 45]), o: 0.2 },
      { d: shape([140, 145, 45], [140, 145, 0], [220, 145, 0], [220, 145, 45]), o: 0.1 },
      { d: shape([70, 0, 65], [170, 0, 65], [170, 0, 125], [70, 0, 125]), o: 0.22 },
    ],
    strokes: [
      shape([70, 0, 65], [170, 0, 65], [170, 0, 125], [70, 0, 125]),
      line([85, 0, 105], [150, 0, 105]),
      line([85, 0, 90], [130, 0, 90]),
      line([0, 30, 60], [0, 90, 60]),
      line([0, 30, 95], [0, 90, 95]),
    ],
  },
  // 05 · install, support, dismantle: the lights come on for opening day
  {
    dashes: [
      line([60, 0, T - 16], [25, 90, 0]),
      line([60, 0, T - 16], [110, 90, 0]),
      line([180, 0, T - 16], [140, 95, 0]),
      line([180, 0, T - 16], [230, 95, 0]),
    ],
    fills: [
      { d: shape([25, 90, 0], [110, 90, 0], [80, 130, 0], [10, 125, 0]), o: 0.1 },
      { d: shape([140, 95, 0], [230, 95, 0], [235, 140, 0], [150, 150, 0]), o: 0.1 },
    ],
    labels: [{ p: [W + 40, 0, H], t: "OPEN · DAY 1" }], // beside the top of the right-hand wall
  },
];

function Draw({ p, k, layer }: { p: MotionValue<number>; k: number; layer: Layer }) {
  const n = LAYERS.length;
  // each layer draws over most of its own stage, so the drawing grows as the stages are read
  const draw = useTransform(p, [k / n, (k + 0.75) / n], [0, 1]);
  const show = useTransform(p, [(k + 0.3) / n, (k + 0.85) / n], [0, 1]);
  return (
    <g>
      {layer.fills?.map((f, i) => (
        <motion.path key={`f${i}`} d={f.d} className="bp-fill" fillOpacity={f.o} style={{ opacity: show }} />
      ))}
      {layer.strokes?.map((d, i) => (
        <motion.path key={`s${i}`} d={d} style={{ pathLength: draw }} />
      ))}
      {layer.dashes?.map((d, i) => (
        <motion.path key={`d${i}`} d={d} className="bp-dash" style={{ opacity: draw }} />
      ))}
      {layer.labels?.map((l) => (
        <motion.text key={l.t} {...at(l.p)} className="bp-label" style={{ opacity: show }}>
          {l.t}
        </motion.text>
      ))}
    </g>
  );
}

export default function Blueprint({ list, caption }: { list: RefObject<HTMLOListElement | null>; caption: string }) {
  // progress through the list of stages: 0 as its top reaches the middle of the screen, 1 as its foot leaves it
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 0.6", "end 0.6"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 });
  return (
    <div className="ap-bp" aria-hidden>
      <svg viewBox="0 30 600 540" preserveAspectRatio="xMaxYMid meet">
        {LAYERS.map((layer, k) => (
          <Draw key={k} p={p} k={k} layer={layer} />
        ))}
      </svg>
      <p className="ap-bp-cap mono-up">{caption}</p>
    </div>
  );
}
