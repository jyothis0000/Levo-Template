"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { about, brand } from "@/lib/content";
import { Label, Lines, Reveal, SplitTitle } from "./ui";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [120, -160]);
  const yB = useTransform(scrollYProgress, [0, 1], [220, -260]);
  const rA = useTransform(scrollYProgress, [0, 1], [-4, 3]);
  const rB = useTransform(scrollYProgress, [0, 1], [4, -3]);

  return (
    <section ref={ref} className="section about" id="about">
      <Lines />
      <div className="about-meta mono-up">
        <span />
        <span>{about.meta}</span>
      </div>

      <motion.figure className="about-img about-img-a" style={{ y: yA, rotate: rA }}>
        <img src={about.images[0].src} alt={about.images[0].alt} />
        <figcaption>{about.images[0].alt}</figcaption>
      </motion.figure>
      <motion.figure className="about-img about-img-b" style={{ y: yB, rotate: rB }}>
        <img src={about.images[1].src} alt={about.images[1].alt} />
        <figcaption>{about.images[1].alt}</figcaption>
      </motion.figure>

      <div className="about-center">
        <Label title="Who we are" sub="من نحن" />
        <SplitTitle as="h2" className="about-statement" text={about.statement} />
        <Reveal className="about-quote" delay={0.2}>
          <p>{about.quote}</p>
          <div className="person">
            <img src={about.person.img} alt="" />
            <div>
              <b>{about.person.name}</b>
              <span className="muted">
                {about.person.role} at <b>{brand.name}</b>
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <span className="about-est mono-up">Est. {brand.est}</span>
    </section>
  );
}
