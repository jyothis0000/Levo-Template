"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { brand, clients, contact, hero, reviews } from "@/lib/home";
import { INTRO } from "./Preloader";
import { Button, Marquee } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

// Social marks drawn inline (24×24, currentColor), so the banner loads no icon font or third-party script.
const ICONS: Record<string, React.ReactNode> = {
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

const enter = (d: number, y = 30) => ({
  initial: { opacity: 0, y, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1, delay: INTRO + d, ease },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const wordO = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="hero dark" id="top">
      <motion.div className="hero-bg" style={{ y: bgY }}>
        {hero.video ? (
          <video src={hero.video} poster={hero.image} autoPlay muted loop playsInline />
        ) : (
          <img src={hero.image} alt="" />
        )}
      </motion.div>
      <div className="hero-grain" aria-hidden />

      <div className="hero-grid" aria-hidden>
        <i /><i /><i /><i />
        <b style={{ left: 0, top: 0 }} /><b style={{ left: "33.333%", top: 0 }} /><b style={{ left: "66.666%", top: 0 }} /><b style={{ right: 0, top: 0 }} />
        <b style={{ left: 0, bottom: 0 }} /><b style={{ left: "33.333%", bottom: 0 }} /><b style={{ left: "66.666%", bottom: 0 }} /><b style={{ right: 0, bottom: 0 }} />
      </div>

      <motion.div className="hero-top mono-up" {...enter(0.1, 0)}>
        <span>{brand.est}–26©</span>
        <span className="hero-slots">
          {hero.slots.label} <b className="hero-bars"><i /><i /><i /><i /></b> {hero.slots.value}
        </span>
      </motion.div>

      <div className="hero-services cols">
        {hero.services.map((s, i) => (
          <motion.p key={s} className="mono-up" {...enter(0.2 + i * 0.08, 10)}>
            <span className="muted">0{i + 1}.</span> {s}
          </motion.p>
        ))}
      </div>

      <motion.div className="hero-word" style={{ y: wordY, opacity: wordO }}>
        <motion.h1
          initial={{ y: "60%", opacity: 0, scaleY: 1.4 }}
          animate={{ y: "0%", opacity: 1, scaleY: 1 }}
          transition={{ duration: 1.3, delay: INTRO, ease }}
          className="glitch"
          data-text={brand.short}
        >
          {brand.short}
          <span className="glitch-slice" aria-hidden>{brand.short}</span>
          <span className="glitch-slice" aria-hidden>{brand.short}</span>
          <span className="glitch-slice" aria-hidden>{brand.short}</span>
          <span className="glitch-slice" aria-hidden>{brand.short}</span>
        </motion.h1>
        <motion.p
          className="hero-script"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.6, delay: INTRO + 0.6, ease: "easeInOut" }}
        >
          {brand.script}
        </motion.p>
      </motion.div>

      <div className="hero-bottom cols">
        <motion.div className="hero-social" {...enter(0.9, 10)}>
          {contact.socials.slice(0, 4).map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={`Levo on ${s.name}`} title={s.name}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                {ICONS[s.label]}
              </svg>
            </a>
          ))}
          <span className="mono-up">
            Stay
            <br />
            connected
          </span>
        </motion.div>
        <motion.div className="hero-cta" {...enter(0.7)}>
          <p>{hero.intro}</p>
          <Button>{hero.cta}</Button>
        </motion.div>
        <motion.div className="hero-rating" {...enter(0.8)}>
          <div className="avatars">
            {clients.slice(0, 4).map((c) => (
              <span key={c.name}>
                <img src={c.logo} alt={c.name} />
              </span>
            ))}
            <span className="avatars-count">{hero.clientCount}</span>
          </div>
          <div>
            <p className="stars">★★★★★ <b>{reviews.score}</b></p>
            <p className="mono-up muted">{reviews.basedOn}</p>
          </div>
        </motion.div>
      </div>

      <motion.div className="hero-logos" {...enter(1, 0)}>
        <Marquee speed={45}>
          {clients.map((c) => (
            <span key={c.name} className="hero-logo">
              <img src={c.mark} alt={c.name} />
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
