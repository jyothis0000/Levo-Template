"use client";

import { motion, useInView, useScroll, useTransform, animate, type MotionValue } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** "[ SERVICES ]" section tag with the bar mark. */
export function Label({ title }: { title: string }) {
  return (
    <div className="label">
      <span className="label-mark" aria-hidden>
        <i /><i /><i /><i />
      </span>
      <span>
        [ {title} ]
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
  href = "/home#contact", // page-qualified, so it also works from the privacy and legal pages
  children,
  variant = "dark",
  className = "",
  external = false,
}: {
  href?: string;
  children: string;
  variant?: "dark" | "light" | "red";
  className?: string;
  external?: boolean; // opens in a new tab
}) {
  const ext = external ? { target: "_blank", rel: "noreferrer noopener" } : {};
  return (
    <a href={href} className={`btn btn-${variant} ${className}`} {...ext}>
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
export function ScrollWords({ text, className = "", as: Tag = "p" }: { text: string; className?: string; as?: "p" | "h2" }) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <ScrollWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </Tag>
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

export function Marquee({
  children,
  speed = 40,
  reverse = false,
}: {
  children: ReactNode | ((copy: boolean) => ReactNode); // copy: the repeat that closes the loop, hidden from assistive tech
  speed?: number;
  reverse?: boolean;
}) {
  const group = (copy: boolean) => (typeof children === "function" ? children(copy) : children);
  return (
    <div className="marquee">
      <div className="marquee-track" style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}>
        <div className="marquee-group">{group(false)}</div>
        <div className="marquee-group" aria-hidden>
          {group(true)}
        </div>
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

// Social marks drawn inline (24×24, currentColor), so no icon font or third-party script loads. Keyed by the socials'
// short labels in lib/home; "Wa" is WhatsApp.
const SOCIAL: Record<string, ReactNode> = {
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
  Wa: (
    <>
      <path d="M12 2.6a9.4 9.4 0 0 0-8.1 14.2L2.6 21.4l4.7-1.2A9.4 9.4 0 1 0 12 2.6z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M17.2 14.3c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.3 0-.5l-.9-2c-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.1 2.8c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.7.1.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z" />
    </>
  ),
};

/** A social network's mark, as in the banner and the footer. */
export function SocialIcon({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      {SOCIAL[label]}
    </svg>
  );
}
