"use client";

import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { site } from "@/lib/home4";

// Social marks drawn inline (24×24, currentColor): no icon font or third-party script.
export const ICONS: Record<string, ReactNode> = {
  Fb: <path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V10H7v4h2.5v8h4v-8h3l.6-4h-3.6V8.7c0-.4.3-.7.5-.7z" />,
  Ig: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" r="1.3" />
    </>
  ),
  In: <path d="M5 3.5a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8zM3 9.6h4V21H3zM9.5 9.6h3.8v1.6c.6-1 1.9-2 3.9-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V21h-4z" />,
  Yt: (
    <path
      fillRule="evenodd"
      d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2C.5 9 .5 12 .5 12s0 3 .5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.5-1.8.5-4.8.5-4.8s0-3-.5-4.8zM9.8 15.2V8.8L15.6 12z"
    />
  ),
};

// WhatsApp's glyph, inline: nothing is loaded from Meta until the visitor taps
const WA = "M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41Z";

/** The floating WhatsApp button, in WhatsApp's own green; just the icon on phones. */
export function WhatsApp() {
  return (
    <a
      className="h4-whatsapp"
      href={site.whatsapp}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="WhatsApp Levo now (opens WhatsApp, under Meta's privacy terms)"
      title="Opens WhatsApp — Meta's privacy terms apply. Prefer e-mail? info@levoworld.com"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
        <path d={WA} />
      </svg>
      <span aria-hidden>WhatsApp Levo</span>
    </a>
  );
}

export function Icon({ k, size = 22 }: { k: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      {ICONS[k]}
    </svg>
  );
}

/** The floating white bar: logo, menu and a call to action; on phones a burger opens the full-screen menu. */
export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("h4-menu-open", open);
  }, [open]);
  // slides away while scrolling down, comes back on any scroll up; always there near the top
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setHidden(y > 120 && y > (scrollY.getPrevious() ?? 0)));
  return (
    <>
      <a className="h4-skip" href="#main">
        Skip to content
      </a>
      <header className={`h4-header ${hidden && !open ? "is-hidden" : ""}`}>
        <a href="/home4" className="h4-logo" aria-label="Levo Exhibitions — home">
          <img src={site.logo} alt="Levo Exhibitions" />
        </a>
        <nav className="h4-nav" aria-label="Main">
          {site.nav.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="h4-header-cta" href="/home4#contact">
          Get a quote
        </a>
        <button className="h4-burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
          <i />
          <i />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="h4-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="h4-menu-col">
              <h2>Menu</h2>
              {site.nav.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="h4-menu-big">
                  {l.label}
                </a>
              ))}
            </div>
            <div className="h4-menu-col">
              <h2>Get in touch</h2>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            </div>
            <div className="h4-menu-col">
              <h2>Social</h2>
              {site.socials.map((s) => (
                <a key={s.key} href={s.href} target="_blank" rel="noreferrer noopener">
                  {s.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Fixed down both edges: "Scroll to top" with a dot that tracks the page, and the e-mail address. */
export function SideBars() {
  const { scrollYProgress } = useScroll();
  const dot = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [onFooter, setOnFooter] = useState(false);
  useEffect(() => {
    const footer = document.getElementById("contact");
    if (!footer) return;
    const io = new IntersectionObserver(([e]) => setOnFooter(e.isIntersecting));
    io.observe(footer);
    return () => io.disconnect();
  }, []);
  const off = onFooter ? " is-off" : "";
  return (
    <>
      <div className={`h4-side h4-side-left${off}`}>
        <button onClick={() => scrollTo({ top: 0, behavior: "smooth" })} className="h4-side-text">
          Scroll to top
        </button>
        <span className="h4-side-track" aria-hidden>
          <motion.i style={{ top: dot }} />
        </span>
      </div>
      <div className={`h4-side h4-side-right${off}`}>
        <a href={`mailto:${site.email}`} className="h4-side-text">
          {site.email}
        </a>
      </div>
    </>
  );
}

/**
 * A small dot that inverts whatever is under it; over anything with a data-cursor label it grows into a disc
 * carrying that word ("Explore" on the projects, "Drag" on the stories). Mouse only.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [label, setLabel] = useState<string | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    setOn(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const host = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(host ? host.getAttribute("data-cursor") : null);
    };
    addEventListener("pointermove", move);
    return () => removeEventListener("pointermove", move);
  }, [x, y]);

  if (!on) return null;
  return (
    <motion.div className={`h4-cursor ${label ? "has-label" : ""}`} style={{ x: sx, y: sy }} aria-hidden>
      <AnimatePresence>
        {label && (
          <motion.span key={label} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
