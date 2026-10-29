"use client";

import { animate, AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import type { AnimationSequence } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { finishIntro, lock, useIntroDone } from "@/components/home2/Chrome";
import { contact, nav, preloader } from "@/lib/home3";

export const ease = [0.16, 1, 0.3, 1] as const;
export const smooth = [0.65, 0, 0.35, 1] as const;

// the reference's named curves
type Bezier = [number, number, number, number];
const OUT: Bezier = [0.25, 1, 0.5, 1];
const IN: Bezier = [0.5, 0, 0.75, 0];
const IN_OUT: Bezier = [0.215, 0.61, 0.355, 1];

/**
 * santalarch.com's loader, beat for beat: the count runs 0–100 over 4s while "layer / by / layer"
 * slide through the right half and the title slides out under a half-screen mask; the screen turns
 * dark for "Until it becomes whole", then two panels close in from top and bottom and it fades away.
 * No storage: it plays on each full load, never again on in-site navigation.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const pct = useMotionValue(0);
  const label = useTransform(pct, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    const root = ref.current;
    const done = () => {
      lock(false);
      setGone(true);
      finishIntro();
    };
    if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return done();
    scrollTo(0, 0);
    lock(true);
    const $ = (s: string) => root.querySelector(s)!;
    const wraps = Array.from(root.querySelectorAll(".pl3-wrap"));
    const seq: AnimationSequence = [
      [$(".pl3-content"), { opacity: [0, 1] }, { duration: 0.4, ease: OUT, at: 0 }],
      // in from the left, last word first; out to the left, first word first
      ...[...wraps].reverse().map((w, k): AnimationSequence[number] => [w, { x: ["-100%", "0%"] }, { duration: 1.2, ease: OUT, at: 0.6 + k * 0.1 }]),
      ...wraps.map((w, k): AnimationSequence[number] => [w, { x: ["0%", "-100%"] }, { duration: 1.2, ease: IN, at: 2 + k * 0.1 }]),
      [$(".pl3-desc"), { opacity: [1, 0] }, { duration: 1.2, ease: IN, at: 2 }],
      [$(".pl3-title span"), { x: ["0%", "100%"] }, { duration: 1.2, ease: IN, at: 2.2 }],
      // the dark beat is the logo's navy
      [root, { backgroundColor: ["#f0f0f0", "#022439"] }, { duration: 0.4, ease: OUT, at: 3.4 }],
      [$(".pl3-cap"), { color: ["#022439", "#f0f0f0"] }, { duration: 0.4, ease: OUT, at: 3.4 }],
      [Array.from(root.querySelectorAll(".pl3-lines i")), { backgroundColor: ["rgba(2,36,57,0.08)", "rgba(240,240,240,0.1)"] }, { duration: 0.4, ease: OUT, at: 3.4 }],
      [Array.from(root.querySelectorAll(".pl3-anim, .pl3-end")), { opacity: [0, 1] }, { duration: 0.4, ease: OUT, at: 3.4 }],
      [Array.from(root.querySelectorAll(".pl3-plash i")), { scaleY: [0, 1] }, { duration: 0.8, ease: IN_OUT, at: 4.4 }],
      [root, { opacity: [1, 0] }, { duration: 0.4, ease: IN, at: 5.2 }],
    ];
    let live = true;
    const run: { stop: () => void }[] = [];
    document.fonts.ready.then(() => {
      if (!live) return;
      // the reference's "preloader" curve: quick start, a hesitation in the middle, a sprint to the end
      run.push(animate(pct, [0, 44.2, 54, 58.4, 82.6, 100], { duration: 4, delay: 0.4, times: [0, 0.238, 0.396, 0.522, 0.714, 1], ease: "linear" }));
      const tl = animate(seq);
      run.push(tl);
      tl.then(() => live && done());
    });
    return () => {
      live = false;
      run.forEach((a) => a.stop());
      lock(false);
    };
  }, [pct]);

  if (gone) return null;
  return (
    <div ref={ref} className="pl pl3" aria-hidden>
      <noscript>
        <style>{".pl3{display:none}"}</style>
      </noscript>
      <div className="pl3-content">
        <div className="pl3-words">
          {preloader.words.map((w, i) => (
            <div key={i} className="pl3-wrap">
              <p style={{ gridColumn: i + 1 }}>{w}</p>
            </div>
          ))}
        </div>
        <div className="pl3-lines">
          <i />
          <i />
          <i className="pl3-anim" />
          <i className="pl3-anim" />
        </div>
        <div className="pl3-title">
          <span>{preloader.title}</span>
        </div>
        <p className="pl3-desc">{preloader.description}</p>
        <p className="pl3-cap">
          Loading <motion.b>{label}</motion.b>
        </p>
        <p className="pl3-end">{preloader.end}</p>
        <div className="pl3-plash">
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

/** The giant wordmark that sits above the navigation, letters rising in once the loader hands over. */
export function Wordmark() {
  const ready = useIntroDone();
  return (
    <div className="wm" aria-label="Levo" id="top">
      {"LEVO".split("").map((c, i) => (
        <span key={c} className="wm-mask" aria-hidden>
          <motion.span initial={{ y: "102%" }} animate={ready ? { y: "0%" } : undefined} transition={{ delay: 0.15 + i * 0.08, duration: 1.4, ease }}>
            {c}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

const L_STOPS = ["#022439", "#013759", "#004b7b", "#005b95", "#0066a8", "#006db4", "#0070b8"];
const L_AT = [0, 0.13, 0.3, 0.46, 0.64, 0.81, 1];

/**
 * The logo's "L", shape for shape from logo-black.svg: a bar with its foot cut on the diagonal, and the foot.
 * Each part carries the logo's own gradient, resolved here from its transforms to plain lines (navy at the bottom).
 */
export function LogoL({ solid = false }: { solid?: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, ""); // more than one on the page, so gradient ids must not clash
  const stops = L_STOPS.map((c, k) => <stop key={c} offset={L_AT[k]} stopColor={c} />);
  // solid: one flat colour from the CSS (.l-solid) instead of the gradients
  const fill = (part: string) => (solid ? undefined : `url(#${id}${part})`);
  return (
    <svg viewBox="0 0 602.47 1060.41" className={solid ? "l-solid" : undefined} aria-hidden>
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

/** Sticky column-aligned navigation with tick marks and a page-progress rule; the logo's "L" opens the menu. */
export function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [open]);

  return (
    <>
      <header className="nav">
        {nav.map((l) => (
          <a key={l.href} href={l.href} className="nav-link" style={{ left: `${(l.col / 8) * 100}%` }}>
            {l.label}
          </a>
        ))}
        <motion.span className="nav-progress" style={{ scaleX: progress }} />
      </header>
      <div className="nav nav-tone" aria-hidden>
        {nav.map((l) => (
          <span key={l.href} className="nav-link" style={{ left: `${(l.col / 8) * 100}%` }}>
            {l.label}
          </span>
        ))}
        <motion.span className="nav-progress" style={{ scaleX: progress }} />
      </div>
      <div className="nav-mark">
        <button className={`plus ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Menu"} aria-expanded={open}>
          <LogoL />
          <i />
          <i />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="menu"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.9, ease: smooth }}
            data-lenis-prevent
          >
            <ul>
              {nav.map((l, i) => (
                <li key={l.href} className="menu-mask">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 1, ease }}
                  >
                    <span className="menu-no">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div className="menu-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <a href={`mailto:${contact.emails[0].address}`}>{contact.emails[0].address}</a>
              <span>{contact.phone}</span>
              <span>
                {contact.address[0]} {contact.address[1]}
              </span>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

/** The reference's "invert color" switch. The choice is a display preference the visitor set, kept locally. */
export function Invert() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    try {
      setOn(localStorage.getItem("levo-invert") === "1");
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("inverted", on);
  }, [on]);
  return (
    <>
      <button
        className="invert"
        onClick={() => {
          const v = !on;
          setOn(v);
          try {
            localStorage.setItem("levo-invert", v ? "1" : "0");
          } catch {}
        }}
      >
        <i />
        invert color
      </button>
      <span className="invert invert-tone" aria-hidden>
        <i />
        invert color
      </span>
    </>
  );
}

/*
 * GDPR: the reference shows a cookie bar with Accept/Decline. This edition sets no cookies and loads nothing from
 * third parties, so there is nothing to consent to (ePrivacy Art. 5(3)) — it says so instead, once.
 */
export function Note() {
  const [show, setShow] = useState(false);
  const ready = useIntroDone();
  useEffect(() => {
    if (!ready) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    try {
      if (!localStorage.getItem("levo-note")) t = setTimeout(() => setShow(true), 2200);
    } catch {}
    return () => clearTimeout(t);
  }, [ready]);
  const ok = () => {
    try {
      localStorage.setItem("levo-note", "1");
    } catch {}
    setShow(false);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          className="note"
          role="status"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.7, ease }}
        >
          <span>No cookies. No tracking.</span>
          <a href="/home3/privacy">Privacy</a>
          <button onClick={ok}>OK</button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  return (
    <footer className="ft">
      <div className="ft-row">
        <span className="ft-links" style={{ left: "50%" }}>
          <a href="/home3/privacy">Privacy Notice</a>
          <a href="/home3/legal">Legal Notice</a>
        </span>
        <span className="ft-copy" style={{ left: "62.5%" }}>
          Copyright © {new Date().getFullYear()} {contact.legal}
          <br />— {contact.group}
        </span>
        <a href="#top" className="ft-top" style={{ left: "87.5%" }}>
          Back to top ↑
        </a>
      </div>
      <div className="ft-mark" aria-hidden>
        {"LEVO".split("").map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
    </footer>
  );
}
