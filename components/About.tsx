"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { about, brand } from "@/lib/content";
import { Label, Lines, Reveal, SplitTitle } from "./ui";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // on phones the cards sit in the text flow, so only there they keep to a small drift
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const m = matchMedia("(min-width: 810px)");
    const on = () => setWide(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  // the cards start below their place and climb through it at ~1.7–2× the scroll, rising up out of the section's
  // bottom edge and away over the top
  const yA = useTransform(scrollYProgress, [0, 1], wide ? ["55vh", "-80vh"] : ["40px", "-40px"]);
  const yB = useTransform(scrollYProgress, [0, 1], wide ? ["80vh", "-120vh"] : ["40px", "-40px"]);
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
        <Label title="Who we are" />
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
