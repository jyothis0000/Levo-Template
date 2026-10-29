"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { hero, principles } from "@/lib/home3";
import { PrinciplePanels } from "./Intro";
import type { TagLine, createCubeScene } from "./cubeScene";

type Scene = ReturnType<typeof createCubeScene>;

const UNIT = 0.8; // one timeline unit = 80vh of scroll
const DIVE_START = 5.25;
const DIVE_DONE = 6.75; // = cubeScene's; kept here so the scene can load lazily
const PANELS = 3; // units of scroll for the principles
const LEAD = 1.7; // the shutters close over the last 1.7 tagline lines before the pin

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * After santalarch.com: the tagline climbs into the horizon, two dark shutters close behind
 * "Perception" and a white copy of it carries on into a 3D pyramid of word cubes; the camera
 * swings over the top and drops through the apex into the first principle.
 */
export function Cubes() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const diveRef = useRef<HTMLImageElement>(null);
  const geo = useRef({ top: 0, vh: 1, lh: 1 });
  const sceneRef = useRef<Scene | null>(null);
  const { scrollY } = useScroll();

  const stageTop = (y: number) => Math.max(0, geo.current.top - y);
  const time = (y: number) => (y - geo.current.top) / (geo.current.vh * UNIT);
  const shut = useTransform(scrollY, (y) => {
    const { top, lh } = geo.current;
    const t = clamp01((y - (top - LEAD * lh)) / (LEAD * lh));
    return 1 - (1 - t) * (1 - t);
  });
  const shadeY = useTransform(scrollY, (y) => -stageTop(y)); // shutters hold to the viewport while the stage arrives
  // below the horizon the tagline stays ink on paper; above it, only the canvas copy shows
  const tagClip = useTransform(scrollY, (y) => `inset(${Math.max(0, geo.current.vh / 2 - stageTop(y))}px 0 0 0)`);
  const canvasClip = useTransform(scrollY, (y) => {
    const st = stageTop(y);
    return st > 0 ? `inset(0 0 ${geo.current.vh / 2 + st}px 0)` : "none";
  });
  const prP = useTransform(scrollY, (y) => clamp01((time(y) - DIVE_DONE) / PANELS));

  const draw = (y: number) => {
    const t = Math.max(0, time(y));
    const canvas = canvasRef.current;
    const img = diveRef.current;
    if (!canvas || !img) return;
    const live = t < DIVE_DONE + 0.05;
    canvas.style.visibility = live ? "visible" : "hidden";
    const rect = live ? sceneRef.current?.render(t) : null;
    const dive = clamp01((t - DIVE_START) / (DIVE_DONE - DIVE_START));
    img.style.opacity = String(clamp01((dive - 0.1) / 0.4));
    if (rect && dive < 1) {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      img.style.clipPath = `inset(${Math.max(0, rect.t)}px ${Math.max(0, w - rect.r)}px ${Math.max(0, h - rect.b)}px ${Math.max(0, rect.l)}px)`;
    } else img.style.clipPath = "none";
  };
  useMotionValueEvent(scrollY, "change", draw);

  useEffect(() => {
    let alive = true;
    let dispose = () => {};
    const measure = () => {
      const el = ref.current!;
      const line = lineRef.current!;
      geo.current = {
        top: el.getBoundingClientRect().top + window.scrollY,
        vh: window.innerHeight,
        lh: line.offsetHeight,
      };
    };
    const tag = (): TagLine => {
      const line = lineRef.current!;
      return {
        cx: line.offsetLeft + line.offsetWidth / 2,
        cy: line.offsetTop + line.offsetHeight / 2,
        font: parseFloat(getComputedStyle(line).fontSize),
        lh: line.offsetHeight,
      };
    };
    let scene: Scene | null = null;
    const onResize = () => {
      measure();
      const c = canvasRef.current!;
      scene?.resize(c.clientWidth, c.clientHeight, tag());
      draw(window.scrollY);
    };
    const boot = async () => {
      await document.fonts.ready;
      const { createCubeScene } = await import("./cubeScene");
      if (!alive) return null;
      try {
        return createCubeScene(canvasRef.current!, getComputedStyle(lineRef.current!).fontFamily);
      } catch {
        return null; // no WebGL: the shutters and the dive photo still play
      }
    };
    measure();
    draw(window.scrollY);
    boot().then((s) => {
      if (!s || !alive) return s?.dispose();
      scene = s;
      sceneRef.current = s;
      dispose = s.dispose;
      onResize();
    });
    window.addEventListener("resize", onResize);
    return () => {
      alive = false;
      window.removeEventListener("resize", onResize);
      sceneRef.current = null;
      dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={ref} className="ph" id="principles">
      <div className="ph-stage">
        <motion.p className="ph-tag" style={{ clipPath: tagClip }} aria-label={hero.tagline.join(" ")}>
          {hero.tagline.map((l, i) => (
            <span key={l} ref={i === hero.tagline.length - 1 ? lineRef : undefined} style={{ ["--n" as string]: hero.tagline.length - 1 - i }}>
              {l}
            </span>
          ))}
        </motion.p>
        <motion.div className="ph-shade" style={{ y: shadeY }} aria-hidden>
          <motion.i style={{ scaleY: shut }} />
          <motion.i style={{ scaleY: shut }} />
        </motion.div>
        <motion.canvas ref={canvasRef} className="ph-canvas" style={{ clipPath: canvasClip }} aria-hidden />
        <img ref={diveRef} src={principles[0].img} alt="" className="ph-dive pr-bg" />
        <PrinciplePanels p={prP} />
      </div>
    </section>
  );
}
