"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { brand, contact, nav, portfolioIntro } from "@/lib/content";
import { Button, RollText } from "./ui";

const ease = [0.76, 0, 0.24, 1] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="nav">
        <a href="/home1#top" className="nav-logo">
          <img src={brand.logo} alt={brand.name} />
          <span className="nav-pill">{brand.pill}</span>
        </a>
        <nav className="nav-links">
          {nav.map((l) => (
            <a key={l.href} href={l.href}>
              <RollText text={l.label} />
              {l.href.endsWith("#projects") && <sup>{portfolioIntro.count}</sup>}
            </a>
          ))}
        </nav>
        <button className={`burger ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          <i />
          <i />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu dark"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="menu-grid">
              <div>
                <p className="mono-up muted">Navigation</p>
                <ul className="menu-links">
                  {nav.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.06, ease }}
                    >
                      <a href={l.href} onClick={() => setOpen(false)}>
                        <RollText text={l.label} />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <motion.div
                className="menu-contacts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="mono-up muted">Contacts</p>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="menu-phone">{contact.phone}</a>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <p className="muted">{contact.address}</p>
                <span onClick={() => setOpen(false)}>
                  <Button variant="light">Request a stand design</Button>
                </span>
              </motion.div>
            </div>
            <motion.div
              className="menu-word"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.25, ease }}
            >
              {brand.short}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
