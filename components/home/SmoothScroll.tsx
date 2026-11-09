"use client";

import Lenis from "lenis";
import { useEffect } from "react";

// Inertial scrolling, as on /home2 and /home3: every wheel step glides, so the scroll-linked scenes (the word cubes,
// the case-study deck, the zooming grid) move continuously instead of jumping. Touch keeps the phone's own scrolling.
let lenis: Lenis | null = null;
let locked = false;

/** Freeze the page (the preloader holds it while it plays). */
export const lockScroll = (on: boolean) => {
  locked = on;
  if (on) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = on ? "hidden" : "";
};

export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // a low lerp is the long, soft glide; the wheel multiplier trims how far each notch travels
    lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.07, wheelMultiplier: 0.85 });
    if (locked) lenis.stop();
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}
