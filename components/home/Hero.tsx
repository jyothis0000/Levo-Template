"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { brand, clients, contact, hero, reviews } from "@/lib/home";
import { INTRO } from "./Preloader";
import { Button, Marquee, SocialIcon } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

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

      <motion.div className="hero-top mono-up" {...enter(0.1, 0)}>
        <span>{brand.est}–26©</span>
        <span className="hero-slots">
          {hero.slots.label} <b className="hero-bars"><i /><i /><i /><i /></b> {hero.slots.value}
        </span>
      </motion.div>

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
          // the clip reaches above and below the line (the script's loops and tails), and goes once written on
          initial={{ clipPath: "inset(-0.6em 100% -0.6em 0)" }}
          animate={{ clipPath: "inset(-0.6em 0% -0.6em 0)", transitionEnd: { clipPath: "none" } }}
          transition={{ duration: 1.6, delay: INTRO + 0.6, ease: "easeInOut" }}
        >
          {brand.script}
        </motion.p>
      </motion.div>

      <div className="hero-bottom cols">
        <motion.div className="hero-social" {...enter(0.9, 10)}>
          {contact.socials.slice(0, 4).map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={`Levo on ${s.name}`} title={s.name}>
              <SocialIcon label={s.label} />
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
