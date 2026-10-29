"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { faqImage, faqs } from "@/lib/content";
import { Button, Label, Lines, SplitTitle } from "./ui";

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <Lines />
      <div className="faq-wrap cols">
        <div className="faq-side">
          <div className="head-left">
            <Label title="FAQ" />
            <SplitTitle className="process-title" text={"Quick\nanswers."} />
            <p className="muted">Short and clear responses to the questions exhibitors ask us most.</p>
          </div>
          <div className="faq-cta">
            <p className="mono-up">Still have questions?</p>
            <p className="muted">Tell us your show — we&apos;ll clear everything up.</p>
            <Button>Let&apos;s clear it up</Button>
          </div>
        </div>
        <ul className="faq-list">
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q} className={on ? "is-open" : ""}>
                <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on}>
                  <span className="mono-up muted">0{i + 1}.</span>
                  <span className="faq-q">{f.q}</span>
                  <span className="faq-icon" aria-hidden>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      className="faq-a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="faq-a-inner">
                        <p>{f.a}</p>
                        {i === 0 && <img src={faqImage} alt="" />}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
