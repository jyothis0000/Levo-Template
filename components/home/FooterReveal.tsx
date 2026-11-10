"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * The footer as the last frame of the L transition: it overlaps the transition's final screen (.lx has a -100vh bottom
 * margin), is held still at the top of the screen while that screen scrolls, and fades in as the L fills the screen —
 * so it is simply there when the L has zoomed in, with no scrolling to bring it up. It lands in its own place, so
 * anything below the first screen (on a phone) scrolls on as normal.
 */
export default function FooterReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // 0 as the footer's top reaches the foot of the screen, 1 as it reaches the top
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "start start"] });
  // held at the top of the screen while it rises (only then, so links to #contact still measure its real place)
  const y = useTransform(p, (v) => (v > 0 && v < 1 ? -(1 - v) * window.innerHeight : 0));
  // only after the L's zoom is complete (LTransition.tsx: done at 176vh, and this progress passes 0.5 at 180vh), fully
  // in as the transition ends
  const opacity = useTransform(p, [0.5, 1], [0, 1]);
  const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? "auto" : "none"));

  return (
    // the outer box is never moved, so the scroll is always measured from the footer's real position
    <div ref={ref} className="footer-reveal">
      <motion.div style={{ y, opacity, pointerEvents }}>{children}</motion.div>
    </div>
  );
}
