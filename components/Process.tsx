"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { process as steps, processIntro } from "@/lib/content";
import { Label, Lines, SplitTitle } from "./ui";

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.min(3, Math.floor(p * 4))));

  return (
    <section ref={ref} className="section soft process" id="process">
      <Lines />
      <div className="process-sticky cols">
        <div className="process-side">
          <div className="head-left">
            <Label title="Steps" sub="منهجيتنا" />
            <SplitTitle className="process-title" text={"From brief\nto launch"} />
            <p>{processIntro.text}</p>
          </div>
          <div className="process-quote">
            <span className="quote-mark">“</span>
            <p>{processIntro.quote}</p>
            <div className="person">
              <img src={processIntro.person.img} alt="" />
              <div>
                <b>{processIntro.person.name}</b>
                <span className="muted">{processIntro.person.role}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="steps">
          {steps.map((s, i) => {
            const on = active === i;
            return (
              <motion.div
                key={s.title}
                className={`step step-${i} ${on ? "is-on" : ""}`}
                animate={{ backgroundColor: on ? "#191919" : "rgba(0,0,0,0)", color: on ? "#fff" : "#000" }}
                transition={{ duration: 0.5 }}
              >
                <div className="step-top">
                  <span className="step-no">0{i + 1}.</span>
                  <span className="mono-up">{s.tag}</span>
                </div>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
