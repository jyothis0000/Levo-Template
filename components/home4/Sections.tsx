"use client";

import { AnimatePresence, motion, type MotionValue, useInView, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { clients, events, faq, footer, hero, insights, process, projects, reviewStats, services, site, statement, stories } from "@/lib/home4";
import { Icon } from "./Chrome";
import { useLoaderReveal } from "./Loader";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.9, delay, ease },
});

/* ───────── hero ───────── */

export function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const ready = useLoaderReveal(); // the loader's L has opened (or there is no loader)
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (playing) v.play().catch(() => setPlaying(false));
    else v.pause();
  }, [playing]);
  return (
    <section className="h4-hero" id="top">
      <video ref={video} className="h4-hero-video" src={hero.video} poster={hero.poster} autoPlay muted loop playsInline aria-hidden />
      <button className="h4-video-toggle" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause the background video" : "Play the background video"}>
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden>
          {playing ? <path d="M3 2h3.5v12H3zM9.5 2H13v12H9.5z" /> : <path d="M4 2l10 6-10 6z" />}
        </svg>
      </button>
      <div className="h4-hero-inner">
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 1, ease }}>
          {hero.title}{" "}
          <mark className="h4-mark">
            <span>{hero.highlight}</span>
            {/* a brush stroke under the last words, painted on from the left */}
            <motion.svg
              viewBox="0 0 240 14"
              preserveAspectRatio="none"
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={ready ? { scaleX: 1 } : undefined}
              transition={{ duration: 0.9, delay: 0.7, ease }}
            >
              <path d="M2 8.5C38 4 86 2.4 138 3.4c40 .8 78 2.4 100 1.6l-1.8 6.4c-30 1.4-70 .6-112 1.2-44 .6-86 .4-120-.2z" />
            </motion.svg>
          </mark>
        </motion.h1>
        <motion.p className="h4-hero-sub" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : undefined} transition={{ duration: 1, delay: 0.5 }}>
          {hero.sub}
        </motion.p>
      </div>
      <a href="#process" className="h4-mouse" aria-label="Scroll down">
        <i />
      </a>
    </section>
  );
}

/* ───────── logos + process ───────── */

export function Intro() {
  return (
    <section className="h4-intro" id="process">
      <div className="h4-wrap">
        <motion.p className="h4-clients-text" {...rise()}>
          {clients.text}
        </motion.p>
        <ul className="h4-logos">
          {clients.logos.map((l, i) => (
            <motion.li key={l.src} {...rise(i * 0.06)}>
              <img src={l.src} alt={l.name} loading="lazy" />
            </motion.li>
          ))}
        </ul>

        <div className="h4-process">
          <motion.div className="h4-process-head" {...rise()}>
            <span className="h4-pill-label">{process.label}</span>
            <h2>{process.title}</h2>
          </motion.div>
          {process.steps.map((s, i) => (
            <motion.div key={s.no} className="h4-step" {...rise(0.1 + i * 0.08)}>
              <h3>
                <b>{s.no}</b> / {s.title}
              </h3>
              <p>{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── dark band: statement, tumbling tags, projects, stories ───────── */

function Word({ w, p, range }: { w: string; p: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(p, range, [0.22, 1]);
  return <motion.span style={{ opacity }}>{w} </motion.span>;
}

/** Each word lights up as the statement scrolls through the screen. */
function Statement() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = statement.text.split(" ");
  return (
    <h2 ref={ref} className="h4-statement">
      {words.map((w, i) => (
        <Word key={i} w={w} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </h2>
  );
}

// where each tag comes to rest, as a pile: left (% of the width), bottom (px), tilt (deg) — after the reference
const SLOTS = [
  { l: 0, b: 84, r: -14 }, // the longest tag: flatter, so "National Pavilions" doesn't cover its first letters
  { l: 17, b: 50, r: -25 },
  { l: 27.8, b: 54, r: 0 },
  { l: 43.5, b: 64, r: -22 },
  { l: 49.5, b: 20, r: -22 },
  { l: 0.8, b: 0, r: 0 },
  { l: 26, b: 0, r: 0 },
  { l: 60.5, b: 0, r: 0 },
  { l: 77.5, b: 0, r: 0 },
];

/**
 * The service tags drop in and tumble into a pile when the band scrolls into view; each can then be picked up and
 * thrown about the band (it springs back inside its edges). A stand-in for the reference's physics, without one.
 */
function Tags() {
  const box = useRef<HTMLDivElement>(null);
  // the pile falls together once its own box is in view (each tag starts far above it, out of sight)
  const inView = useInView(box, { once: true, margin: "0px 0px -15% 0px" });
  return (
    <div ref={box} className="h4-tags">
      {statement.tags.map(([t, shade], i) => {
        const s = SLOTS[i];
        return (
          <motion.span
            key={t}
            className={`h4-tag shade-${shade}`}
            style={{ left: `${s.l}%`, bottom: s.b }}
            initial={{ y: -520, rotate: s.r + (i % 2 ? 40 : -40), opacity: 0 }}
            animate={inView ? { y: 0, rotate: s.r, opacity: 1 } : undefined}
            transition={{ type: "spring", stiffness: 140, damping: 11, mass: 1.1, delay: 0.12 * (SLOTS.length - i) }}
            drag
            dragConstraints={box}
            dragElastic={0.25}
            whileDrag={{ scale: 1.06, zIndex: 5 }}
          >
            {t}
          </motion.span>
        );
      })}
    </div>
  );
}

function Projects() {
  return (
    <div className="h4-projects" id="projects">
      <div className="h4-projects-head">
        <motion.h2 {...rise()}>{projects.title}</motion.h2>
      </div>
      <ul className="h4-cities">
        {projects.cities.map((c, i) => (
          <motion.li key={c} {...rise(i * 0.04)}>
            .{c}
          </motion.li>
        ))}
      </ul>
      <div className="h4-cards">
        {projects.items.map((p, i) => (
          <motion.a key={p.client} href={projects.all} target="_blank" rel="noreferrer noopener" className="h4-card" data-cursor="Explore" {...rise((i % 3) * 0.1)}>
            <div className="h4-card-img">
              <img src={p.img} alt={`${p.client} stand at ${p.show}`} loading="lazy" />
              <i aria-hidden />
            </div>
            <h3>{p.client}</h3>
            <span>{p.show}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

/** One quote at a time: drag it sideways, or use the arrows; the ring counts where you are. */
function Stories() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const n = stories.items.length;
  const go = (d: number) => {
    setDir(d);
    setI((v) => (v + d + n) % n);
  };
  const s = stories.items[i];
  return (
    <div className="h4-stories" id="stories">
      <motion.h2 {...rise()}>{stories.title}</motion.h2>
      <div className="h4-stories-body">
        <div className="h4-stories-main" data-cursor="Drag">
          <span className="h4-quote-mark" aria-hidden>
            “
          </span>
          <div className="h4-quote-wrap">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.blockquote
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.45, ease }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
              >
                <p>{s.quote}</p>
                <cite>{s.who}</cite>
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="h4-arrows">
            <button onClick={() => go(-1)} aria-label="Previous story">
              ←
            </button>
            <button onClick={() => go(1)} aria-label="Next story">
              →
            </button>
          </div>
        </div>
        <div className="h4-ring" aria-label={`Story ${i + 1} of ${n}`}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.b key={i} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ duration: 0.4, ease }}>
              {i + 1}
            </motion.b>
          </AnimatePresence>
          <span>/ {n}</span>
        </div>
      </div>
      <ul className="h4-stats">
        {reviewStats.map((r, k) => (
          <motion.li key={r.label} {...rise(k * 0.08)}>
            <b>{r.value}</b>
            <span>{r.label}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function DarkBand() {
  return (
    <section className="h4-dark">
      <div className="h4-wrap">
        <svg className="h4-zigzag" viewBox="0 0 48 10" aria-hidden>
          <path d="M1 7l5.5-5 5.5 5 5.5-5 5.5 5 5.5-5 5.5 5 5.5-5 5.5 5" />
        </svg>
        <Statement />
      </div>
      <div className="h4-wrap h4-wrap-wide">
        <Tags />
        <Projects />
      </div>
      <div className="h4-wrap">
        <Stories />
      </div>
    </section>
  );
}

/* ───────── carried over from /home, in this layout's dress ───────── */

/** A section head: the grey pill label and a heavy title, with an optional side note and button. */
function Head({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return (
    <div className="h4-sec-head">
      <motion.div {...rise()}>
        <span className="h4-pill-label">{label}</span>
        <h2>{title}</h2>
      </motion.div>
      {children && (
        <motion.div className="h4-sec-side" {...rise(0.1)}>
          {children}
        </motion.div>
      )}
    </div>
  );
}

/** The four disciplines: a sticky head on the left, each service as a numbered block with two photos and its tags. */
export function Services() {
  return (
    <section className="h4-services" id="services">
      <div className="h4-wrap h4-split">
        <div className="h4-split-head">
          <Head label={services.label} title={services.title} />
          <motion.p {...rise(0.1)}>{services.intro}</motion.p>
          <motion.a className="h4-btn" href="#contact" {...rise(0.15)}>
            {services.cta}
          </motion.a>
        </div>
        <div>
          {services.items.map((s, i) => (
            <motion.article key={s.title} className="h4-service" {...rise()}>
              <h3>
                <b>0{i + 1}</b> / {s.title}
              </h3>
              <div className="h4-service-imgs">
                {s.images.map((src) => (
                  <div key={src}>
                    <img src={src} alt={s.title} loading="lazy" />
                  </div>
                ))}
              </div>
              <p>{s.text}</p>
              <p className="h4-service-note">{s.note}</p>
              <ul className="h4-chips">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The shows we build at next; with a mouse, each row's photo follows the pointer, tilting with its speed. */
export function Upcoming() {
  const [hover, setHover] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 26, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 26, mass: 0.5 });
  const rotate = useTransform(useVelocity(x), [-1500, 1500], [-8, 8], { clamp: true });
  const cur = hover === null ? null : events.list[hover];
  return (
    <section className="h4-events" id="events">
      <div className="h4-wrap">
        <Head label={events.label} title={events.title}>
          <p>{events.intro}</p>
          <a className="h4-btn" href={events.all} target="_blank" rel="noreferrer noopener">
            {events.cta}
          </a>
        </Head>
        <ul
          className="h4-events-list"
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse") return;
            x.set(e.clientX);
            y.set(e.clientY);
          }}
          onPointerLeave={() => setHover(null)}
        >
          {events.list.map((s, i) => (
            <motion.li key={s.title} {...rise(i * 0.05)} onPointerEnter={(e) => e.pointerType === "mouse" && setHover(i)}>
              <a href="#contact" className={hover === i ? "is-on" : undefined}>
                <b className="h4-events-no">0{i + 1}</b>
                <span className="h4-events-title">{s.title}</span>
                <span className="h4-events-text">{s.text}</span>
                <span className="h4-events-date">{s.date}</span>
                <span className="h4-events-plus" aria-hidden />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
      <motion.figure
        className="h4-peek"
        style={{ left: x, top: y, rotate }}
        animate={{ scale: cur ? 1 : 0, opacity: cur ? 1 : 0 }}
        transition={{ duration: 0.45, ease }}
        aria-hidden
      >
        <AnimatePresence initial={false}>
          {cur && (
            <motion.img
              key={cur.img}
              src={cur.img}
              alt=""
              initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease }}
            />
          )}
        </AnimatePresence>
        {cur && <figcaption>{cur.cap}</figcaption>}
      </motion.figure>
    </section>
  );
}

export function Insights() {
  return (
    <section className="h4-insights" id="insights">
      <div className="h4-wrap">
        <Head label={insights.label} title={insights.title} />
        <div className="h4-cards h4-posts">
          {insights.posts.map((p, i) => (
            <motion.a key={p.href} href={p.href} target="_blank" rel="noreferrer noopener" className="h4-card" data-cursor="Read" {...rise(i * 0.1)}>
              <div className="h4-card-img">
                <img src={p.img} alt="" loading="lazy" />
                <i aria-hidden />
              </div>
              <span>{p.date} · Levo journal</span>
              <h3>{p.title}</h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/** One answer open at a time; the plus turns into a cross. */
export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="h4-faq" id="faq">
      <div className="h4-wrap h4-split">
        <div className="h4-split-head">
          <Head label={faq.label} title={faq.title} />
          <motion.p {...rise(0.1)}>{faq.intro}</motion.p>
          <motion.div className="h4-faq-ask" {...rise(0.15)}>
            <b>{faq.ask}</b>
            <a className="h4-btn" href={`mailto:${site.email}?subject=Question`}>
              {faq.cta}
            </a>
          </motion.div>
        </div>
        <ul className="h4-faq-list">
          {faq.items.map((f, i) => {
            const on = open === i;
            return (
              <motion.li key={f.q} className={on ? "is-open" : undefined} {...rise(i * 0.04)}>
                <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on}>
                  <b>0{i + 1}</b>
                  <span>{f.q}</span>
                  <i aria-hidden />
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      className="h4-faq-a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ───────── footer ───────── */

export function Footer() {
  return (
    <footer className="h4-footer" id="contact">
      <div className="h4-wrap h4-footer-top">
        <div>
          <motion.h2 {...rise()}>
            {footer.title.map((l, k) => (
              <span key={l} className={k > 1 ? "is-light" : undefined}>
                {l}
              </span>
            ))}
          </motion.h2>
          <a className="h4-meet" href={`mailto:${site.email}?subject=Stand%20enquiry`}>
            {footer.cta}
          </a>
        </div>
        <div className="h4-offices">
          {footer.offices.map((o) => (
            <motion.div key={o.name} {...rise(0.1)}>
              <h3>{o.name}</h3>
              <b>{o.company}</b>
              {o.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
              {o.phone && (
                <p className="h4-office-tel">
                  T. <a href={`tel:${o.phone.replace(/\s/g, "")}`}>{o.phone}</a>
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="h4-wrap h4-footer-mid">
        <img src={site.logoWhite} alt="Levo Exhibitions" className="h4-footer-logo" />
        <div className="h4-socials">
          {site.socials.map((s) => (
            <a key={s.key} href={s.href} target="_blank" rel="noreferrer noopener" aria-label={`Levo on ${s.name}`}>
              <Icon k={s.key} size={26} />
            </a>
          ))}
        </div>
      </div>
      <div className="h4-wrap h4-footer-bottom">
        <nav>
          {footer.legal.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <p>{footer.copyright}</p>
      </div>
    </footer>
  );
}
