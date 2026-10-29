"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { brand, contact, nav } from "@/lib/content";
import { Button, Label, Lines, RollText } from "./ui";

function Clock({ zone }: { zone: string }) {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", { timeZone: zone, weekday: "short", hour: "2-digit", minute: "2-digit" }).format(new Date());
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 30_000);
    return () => clearInterval(id);
  }, [zone]);
  return <b>{t}</b>;
}

/**
 * The page ends on one screen: how to reach us, where we are, the way around the site, then the wordmark.
 * It is the "#contact" every "Request a stand design" button lands on; also used by the privacy and legal pages.
 */
export function Footer() {
  return (
    <footer className="section dark footer" id="contact">
      <Lines />
      <div className="footer-grain" aria-hidden />

      <div className="cols footer-top">
        <div className="footer-col">
          <Label title="Contacts" />
          <p className="footer-lead">{contact.lead}</p>
          <a href={`mailto:${contact.email}`} className="footer-email">
            {contact.email}
          </a>
          <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="footer-phone">
            {contact.phone}
          </a>
        </div>

        <dl className="footer-col footer-facts">
          <div>
            <dt className="mono-up muted">Studio</dt>
            <dd>{contact.address}</dd>
          </div>
          <div>
            <dt className="mono-up muted">Workshop</dt>
            <dd>{contact.workshop}</dd>
          </div>
          <div>
            <dt className="mono-up muted">Working hours</dt>
            <dd>{contact.hours}</dd>
          </div>
          <div>
            <dt className="mono-up muted">Local time</dt>
            <dd>
              Dubai <Clock zone="Asia/Dubai" /> · Central Europe <Clock zone="Europe/Berlin" />
            </dd>
          </div>
        </dl>

        <div className="footer-col">
          <p className="mono-up muted">Navigation</p>
          <ul className="footer-nav">
            {nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="mono-up">
                  <RollText text={l.label} />
                </a>
              </li>
            ))}
          </ul>
          <p className="mono-up muted">Socials</p>
          <div className="footer-socials">
            {contact.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
            <a href={contact.whatsappLink} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
          <Button variant="light" href={`mailto:${contact.email}?subject=Stand%20enquiry`}>
            E-mail your brief
          </Button>
        </div>
      </div>

      <div className="footer-word">
        <motion.span
          initial={{ y: "40%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {brand.short}
        </motion.span>
        <motion.span
          className="footer-script"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut" }}
        >
          {brand.script}
        </motion.span>
      </div>

      <div className="footer-bottom mono-up">
        <span>
          © {new Date().getFullYear()} Levo Exhibitions <span className="muted">· Est. {brand.est}</span>
        </span>
        <span className="muted">{brand.group}</span>
        <span className="footer-legal">
          <a href="/home1/privacy">Privacy notice</a>
          <a href="/home1/legal">Legal notice</a>
        </span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
