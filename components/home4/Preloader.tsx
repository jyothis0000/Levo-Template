"use client";

// The /home4 preloader, taken from /home1: on black, the line "built by experience." writes itself in script, "levo®"
// settles at the foot, then the black curtain lifts off the top to uncover the page. The script's clip box is a little
// taller than the line, so its tall strokes are not cut as it writes (as in /home's copy).
// Like the logo-L loader (Loader.tsx, hidden for now), it holds the page's chrome and the hero's entrance back until the
// curtain lifts: it sets `h4-loading` on <html> and sends "h4-reveal" (see useLoaderReveal in Loader.tsx).
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { lockScroll } from "@/components/home/SmoothScroll";
import { brand } from "@/lib/home";

const INTRO = 2.1; // seconds the curtain stays down, as on /home1

export default function Preloader() {
  const [done, setDone] = useState(false);

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
    const t = setTimeout(() => {
      html.classList.remove("h4-loading"); // the header and side bars fade in
      dispatchEvent(new Event("h4-reveal")); // and the hero's entrance starts, as the curtain lifts
      lockScroll(false);
      setDone(true);
    }, INTRO * 1000);
    return () => {
      clearTimeout(t);
      html.classList.remove("h4-loading");
      lockScroll(false);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="h4-pre" aria-hidden exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
          <motion.p
            className="h4-pre-script"
            initial={{ clipPath: "inset(-0.6em 100% -0.6em 0)", opacity: 0 }}
            animate={{ clipPath: "inset(-0.6em 0% -0.6em 0)", opacity: 1, transitionEnd: { clipPath: "none" } }}
            transition={{ duration: 1.3, delay: 0.3, ease: "easeInOut" }}
          >
            {brand.script}
          </motion.p>
          <motion.div className="h4-pre-logo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {brand.short}
            <sup>®</sup>
          </motion.div>
          <noscript>
            <style>{".h4-pre{display:none}"}</style>
          </noscript>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
