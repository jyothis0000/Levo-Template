"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { brand, contact, nav, shows } from "@/lib/content";
import { Button, Label, Lines, RollText, SplitTitle } from "./ui";

function DubaiTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dubai", weekday: "short", hour: "2-digit", minute: "2-digit" }).format(new Date());
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);
  return <b>{t}</b>;
}

export default function Contact() {
  return (
    <>
      <section className="section dark contact" id="contact">
        <Lines />
        <div className="contact-grain" aria-hidden />
        <div className="cols contact-wrap">
          <div className="contact-side">
            <div className="head-left">
              <Label title="Contacts" sub="تواصل معنا" />
              <p className="muted">Tell us your show, your space and your timeline. We come back with a concept, a price and a build plan you can rely on.</p>
            </div>
            <div className="contact-info">
              <p className="mono-up muted">Contacts</p>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="contact-phone">{contact.phone}</a>
              <a href={`mailto:${contact.email}`} className="contact-email">{contact.email}</a>
              <p className="muted">{contact.address}</p>
              <p className="muted">Workshop: {contact.workshop}</p>
              <p className="mono-up muted contact-h">Socials</p>
              <div className="contact-socials">
                {contact.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
                ))}
                <a href={contact.whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
              <p className="mono-up muted contact-h">
                Dubai time: <DubaiTime />
              </p>
            </div>
          </div>

          <div className="contact-main">
            <div className="contact-top">
              <SplitTitle className="giant contact-title" text="Let's Talk" />
              <p className="mono-up">
                Reply <span className="muted">within</span> one working day
              </p>
            </div>
            {/* ponytail: mailto form, no backend. Swap action for an API route when one exists. */}
            <form className="contact-form" action={`mailto:${contact.email}?subject=Stand%20enquiry`} method="post" encType="text/plain">
              <label className="field">
                <span className="mono-up">Full name</span>
                <input name="name" required placeholder="Jane Smith" />
              </label>
              <label className="field">
                <span className="mono-up">Company</span>
                <input name="company" placeholder="Company LLC" />
              </label>
              <label className="field">
                <span className="mono-up">Work email</span>
                <input name="email" type="email" required placeholder="jane@company.com" />
              </label>
              <label className="field">
                <span className="mono-up">Phone or WhatsApp</span>
                <input name="phone" type="tel" placeholder="+971 50 000 0000" />
              </label>
              <label className="field field-wide">
                <span className="mono-up">Which show are you exhibiting at?</span>
                <select name="show" defaultValue="">
                  <option value="" disabled>Select a show</option>
                  {shows.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                  <option>Other</option>
                </select>
              </label>
              <label className="field field-wide">
                <span className="mono-up">Stand size and what you need</span>
                <textarea name="message" rows={4} placeholder="e.g. 60 sqm island stand with a meeting room" />
              </label>
              <button type="submit" className="btn btn-light contact-submit">
                <RollText text="Start conversation" />
                <span className="btn-plus" aria-hidden>+</span>
              </button>
              <div className="contact-hours mono-up">
                <span className="muted">Working hours</span>
                <span>{contact.hours}</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="section dark footer">
        <Lines />
        <div className="cols footer-top">
          <div>
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
          </div>
          <div className="footer-cta">
            <Button variant="light" href={contact.whatsappLink}>WhatsApp us</Button>
          </div>
          <p className="mono-up footer-meta">
            <span className="muted">Est.</span> {brand.est} <span className="muted">· Dubai, UAE</span>
          </p>
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
          <span>© {new Date().getFullYear()} Levo Exhibition. All rights reserved.</span>
          <span className="muted">{brand.group}</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
