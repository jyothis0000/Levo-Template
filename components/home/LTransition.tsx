"use client";

// After /home3's contact transition (components/home3/Contact.tsx): the logo's "L" grows from the middle of its bar until
// the bar becomes the page — here it becomes the footer's dark, so the footer follows on without a seam.
import { motion, useScroll, useTransform } from "motion/react";
import { useId, useRef } from "react";
import { Lines } from "./ui";

// the logo's own gradient, navy at the foot to blue at the top (as logo-black.svg / home3's LogoL)
const L_STOPS = ["#022439", "#013759", "#004b7b", "#005b95", "#0066a8", "#006db4", "#0070b8"];
const L_AT = [0, 0.13, 0.3, 0.46, 0.64, 0.81, 1];

function LogoL({ solid = false }: { solid?: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, ""); // two on the page, so gradient ids must not clash
  const stops = L_STOPS.map((c, k) => <stop key={c} offset={L_AT[k]} stopColor={c} />);
  const fill = (part: string) => (solid ? undefined : `url(#${id}${part})`); // solid: one flat colour from the CSS
  return (
    <svg viewBox="0 0 602.47 1060.41" className={solid ? "lx-flat" : undefined} aria-hidden>
      {!solid && (
        <defs>
          <linearGradient id={`${id}b`} x1="100.34" y1="831.76" x2="100.34" y2="12.34" gradientUnits="userSpaceOnUse">
            {stops}
          </linearGradient>
          <linearGradient id={`${id}f`} x1="406.48" y1="1035.68" x2="406.48" y2="841.04" gradientUnits="userSpaceOnUse">
            {stops}
          </linearGradient>
        </defs>
      )}
      <polygon points="197.75 1060.41 0 882.83 0 0 197.75 0" fill={fill("b")} />
      <rect x="195.96" y="852.38" width="406.51" height="208.02" fill={fill("f")} />
    </svg>
  );
}

export default function LTransition() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // first the mark rises to full size so it reads as the logo; then, since the bar is narrow (a sixth of the mark's
  // height), it scales far further to fill the screen
  const scale = useTransform(p, [0, 0.2, 0.7], [0.32, 1, 24]);
  const solid = useTransform(p, [0.22, 0.45], [0, 1]); // gradient → the footer's dark on the way up
  const finish = useTransform(p, [0.65, 0.9], [0, 1]); // then the footer's own glow, lines and grain settle in

  return (
    <section ref={ref} className="lx" aria-hidden>
      <div className="lx-sticky">
        <motion.div className="lx-mark" style={{ scale }}>
          <LogoL />
          <motion.div className="lx-solid" style={{ opacity: solid }}>
            <LogoL solid />
          </motion.div>
        </motion.div>
        {/* the footer's top edge, mirrored: its glow sits at the bottom here, so the two meet as one */}
        <motion.div className="dark lx-finish" style={{ opacity: finish }}>
          <Lines />
          <div className="footer-grain" />
        </motion.div>
      </div>
    </section>
  );
}
