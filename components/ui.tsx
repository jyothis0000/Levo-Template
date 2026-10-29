"use client";

import { motion, useInView, useScroll, useTransform, animate, type MotionValue } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** "[ LV® ‒ SERVICES ]" section tag with the red bar mark. */
export function Label({ title }: { title: string }) {
  return (
    <div className="label">
      <span className="label-mark" aria-hidden>
        <i /><i /><i /><i />
      </span>
      <span>
        [ <b>LV®</b> ‒ {title} ]
      </span>
    </div>
  );
}

/** Letters stacked twice; on parent hover they roll up one by one. */
export function RollText({ text }: { text: string }) {
  return (
    <span className="roll" aria-label={text}>
      {[...text].map((c, i) => (
        <span key={i} className="roll-char" style={{ "--i": i } as React.CSSProperties} aria-hidden>
          <span>{c === " " ? " " : c}</span>
          <span>{c === " " ? " " : c}</span>
        </span>
      ))}
    </span>
  );
}

export function Button({
  href = "/home1#contact", // page-qualified, so it also works from the privacy and legal pages
  children,
  variant = "dark",
  className = "",
}: {
  href?: string;
  children: string;
  variant?: "dark" | "light" | "red";
  className?: string;
}) {
  return (
    <a href={href} className={`btn btn-${variant} ${className}`}>
      <RollText text={children} />
      <span className="btn-plus" aria-hidden>+</span>
    </a>
  );
}

/** Fade + rise when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Big headline: each letter slides up from a mask, staggered. */
export function SplitTitle({
  text,
  className = "",
  as: Tag = "h2",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  let n = 0;
  return (
    <Tag ref={ref} className={`split ${className}`} aria-label={text}>
      {text.split("\n").map((line, li) => (
        <span key={li} className="split-line" aria-hidden>
          {line.split(" ").map((word, wi) => (
            <span key={wi} className="split-word">
              {[...word].map((c) => {
                const i = n++;
                return (
                  <motion.span
                    key={i}
                    className="split-char"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={inView ? { y: "0%", opacity: 1 } : undefined}
                    transition={{ duration: 0.8, delay: delay + i * 0.025, ease }}
                  >
                    {c}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

function ScrollWord({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

/** Words light up one by one as the block scrolls through the viewport. */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <ScrollWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}

/** Counts up to `to` once visible. Keeps prefix/suffix and thousands separators. */
export function Counter({ to, prefix = "", suffix = "", duration = 2 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration, ease, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {v.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export function Marquee({ children, speed = 40, reverse = false }: { children: ReactNode; speed?: number; reverse?: boolean }) {
  return (
    <div className="marquee">
      <div className="marquee-track" style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}>
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden>{children}</div>
      </div>
    </div>
  );
}

/** The faint vertical column rules that run through every section. */
export function Lines() {
  return (
    <div className="lines" aria-hidden>
      <i /><i /><i /><i />
    </div>
  );
}
