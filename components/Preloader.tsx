"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { brand } from "@/lib/content";

export const INTRO = 2.1; // seconds until the hero starts animating

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      setDone(true);
      document.documentElement.style.overflow = "";
    }, INTRO * 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.p
            className="preloader-script"
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            transition={{ duration: 1.3, delay: 0.3, ease: "easeInOut" }}
          >
            {brand.script}
          </motion.p>
          <motion.div
            className="preloader-logo"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {brand.short}
            <sup>®</sup>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
