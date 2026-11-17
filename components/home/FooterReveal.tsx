"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * The footer as the last frame of the L transition: it overlaps the transition's last two screens (.lx has a -200vh
 * bottom margin), is held at the top of the screen through the second of them, and fades in as the L fills the screen
 * — so it is simply there when the L has zoomed in, with no scrolling to bring it up. It lands in its own place, so
 * anything below the first screen (on a phone) scrolls on as normal.
 *
 * The hold is CSS (position: sticky, over a screen of padding below the footer), not a transform worked out from the
 * scroll: the browser moves a sticky box in the same frame as the scroll, where script runs a frame behind — the footer
 * trailed each frame's scroll and settled with a jerk as the page came to rest.
 */
export default function FooterReveal({ children }: { children: ReactNode }) {
  const mark = useRef<HTMLElement>(null);
  // 0 → 1 over the screen the footer is held through (the mark spans it and never moves)
  const { scrollYProgress: p } = useScroll({ target: mark, offset: ["start start", "end start"] });
  // only after the L's zoom is complete (LTransition.tsx: done at 176vh; this passes 0.5 at 180vh), fully in as the
  // transition ends
  const opacity = useTransform(p, [0.5, 1], [0, 1]);
  const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? "auto" : "none"));

  return (
    <div className="footer-reveal">
      <i ref={mark} className="footer-reveal-mark" aria-hidden />
      <motion.div className="footer-reveal-in" style={{ opacity, pointerEvents }}>
        {children}
      </motion.div>
    </div>
  );
}
