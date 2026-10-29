"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { contact } from "@/lib/home3";
import { ease, LogoL } from "./Chrome";

/**
 * The logo's "L" grows out of the dark from the middle of its bar until the bar becomes the page, turning from the
 * logo's gradient to paper on the way, and the contact details settle inside it — the reference's cross transition,
 * with Levo's own mark.
 */
export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // first the mark rises to full size so it reads as the logo; then, since the bar is narrow (a sixth of the mark's
  // height), it scales far further than the cross did to fill the width
  const scale = useTransform(p, [0, 0.15, 0.55], [0.32, 1, 24]);
  const solid = useTransform(p, [0.17, 0.35], [0, 1]);
  const bodyO = useTransform(p, [0.42, 0.6], [0, 1]);
  const bodyY = useTransform(p, [0.42, 0.6], ["3rem", "0rem"]);
  const [more, setMore] = useState(false);

  return (
    <section ref={ref} className="ct" id="contact">
      <div className="ct-sticky">
        <motion.div className="ct-mark" style={{ scale }} aria-hidden>
          <LogoL />
          <motion.div className="ct-solid" style={{ opacity: solid }}>
            <LogoL solid />
          </motion.div>
        </motion.div>

        <motion.div className="ct-body" style={{ opacity: bodyO, y: bodyY }}>
          <a href={`mailto:${contact.emails[0].address}`} className="ct-title">
            Let’s Talk
          </a>

          <div className="ct-col" style={{ left: "50%" }}>
            <p className="ct-cap">Enquire</p>
            {contact.emails.map((e) => (
              <p key={e.address}>
                <a href={`mailto:${e.address}`}>{e.address}</a>
                <small>{e.caption}</small>
              </p>
            ))}
            <p>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
              <small>Studio, Dubai</small>
            </p>
            <p>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer noopener">
                WhatsApp
              </a>
              <small>Opens Meta’s service</small>
            </p>
          </div>

          <div className="ct-col" style={{ left: "62.5%" }}>
            <p className="ct-cap">Address</p>
            <p>
              {contact.address[0]}
              <br />
              {contact.address[1]}
            </p>
          </div>

          <div className="ct-col ct-privacy" style={{ left: "87.5%" }}>
            <p className="ct-cap">Your data</p>
            <p>Nothing is secondary</p>
            <button onClick={() => setMore(!more)} aria-expanded={more}>
              {more ? "Read less" : "Read more"} <span aria-hidden>{more ? "−" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {more && (
                <motion.div
                  className="ct-more"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                  data-lenis-prevent
                >
                  {contact.privacy.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                  <a href="/home3/privacy">Privacy notice →</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
