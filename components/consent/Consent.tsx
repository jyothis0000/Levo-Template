"use client";

// Cookie consent for Google Analytics 4, self-hosted (used by /home and /home4). Nothing from Google loads until the
// visitor accepts: no script, no cookie, no request (consent mode "basic"). The choice is kept in this browser for about
// six months — strictly necessary storage, so it needs no consent of its own — and can be changed at any time from the
// "Cookie settings" link in the footer. Rejecting is one click, the same as accepting, and nothing on the page is blocked.
// The measurement ID comes from NEXT_PUBLIC_GA_ID; without one there is nothing to ask about, so the live site shows no
// banner. In development it shows anyway, so it can be reviewed before the ID exists — there it only records the choice.
import { useEffect, useRef, useState } from "react";
import s from "./consent.module.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ACTIVE = Boolean(GA_ID) || process.env.NODE_ENV === "development";
const KEY = "levo-consent";
const VERSION = 1; // raise when the notice changes enough that people should be asked again
const MAX_AGE = 182 * 24 * 60 * 60 * 1000; // ask again after about six months
const OPEN = "levo-consent-open"; // sent by the Cookie settings link
const COOKIE_LIFE = 13 * 30 * 24 * 60 * 60; // the analytics cookies last 13 months at most

type Choice = { analytics: boolean; at: string; v: number };
type W = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } & Record<string, unknown>;

function read(): Choice | null {
  try {
    const c = JSON.parse(localStorage.getItem(KEY) || "null") as Choice | null;
    if (!c || c.v !== VERSION || Date.now() - Date.parse(c.at) > MAX_AGE) return null;
    return c;
  } catch {
    return null;
  }
}

function save(analytics: boolean) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ analytics, at: new Date().toISOString(), v: VERSION }));
  } catch {
    // storage blocked: the choice simply isn't remembered, and the banner asks again next time
  }
}

/** Accepted: load gtag.js (once) with advertising features off, or switch it back on if it was stopped. */
function startAnalytics() {
  if (!GA_ID) return;
  const w = window as unknown as W;
  w[`ga-disable-${GA_ID}`] = false;
  if (document.getElementById("levo-gtag")) {
    w.gtag?.("consent", "update", { analytics_storage: "granted" });
    return;
  }
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // gtag.js reads the arguments object itself, so it is pushed as is
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  w.gtag("js", new Date());
  w.gtag("config", GA_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: COOKIE_LIFE,
  });
  const tag = document.createElement("script");
  tag.id = "levo-gtag";
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(tag);
}

/** Rejected or withdrawn: stop at once (Google's own opt-out flag) and delete the analytics cookies. */
function stopAnalytics() {
  if (!GA_ID) return;
  const w = window as unknown as W;
  w[`ga-disable-${GA_ID}`] = true;
  w.gtag?.("consent", "update", { analytics_storage: "denied" });
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => n === "_ga" || n.startsWith("_ga_"));
  // Google sets them on the widest domain it can, so try this host and each parent (not the bare top-level domain)
  const parts = location.hostname.split(".");
  const domains = [""].concat(parts.slice(0, -1).map((_, i) => `; domain=.${parts.slice(i).join(".")}`));
  for (const n of names) for (const d of domains) document.cookie = `${n}=; Max-Age=0; path=/${d}`;
}

export default function Consent({ privacyHref }: { privacyHref: string }) {
  const [open, setOpen] = useState(false);
  const first = useRef<HTMLButtonElement>(null);
  const askedFor = useRef(false); // opened from the footer link: take the focus there

  useEffect(() => {
    if (!ACTIVE) return;
    const choice = read();
    if (choice?.analytics) startAnalytics();

    // first visit: wait until the page has fully loaded and any preloader has lifted, then ask
    let poll: ReturnType<typeof setInterval> | undefined;
    let later: ReturnType<typeof setTimeout> | undefined;
    const ask = () => {
      poll = setInterval(() => {
        if (document.querySelector("[data-preloader]")) return;
        clearInterval(poll);
        later = setTimeout(() => setOpen(true), 600);
      }, 200);
    };
    if (!choice) {
      if (document.readyState === "complete") ask();
      else addEventListener("load", ask, { once: true });
    }

    const reopen = () => {
      askedFor.current = true;
      setOpen(true);
    };
    addEventListener(OPEN, reopen);
    return () => {
      clearInterval(poll);
      clearTimeout(later);
      removeEventListener("load", ask);
      removeEventListener(OPEN, reopen);
    };
  }, []);

  useEffect(() => {
    if (open && askedFor.current) first.current?.focus();
  }, [open]);

  const choose = (analytics: boolean) => {
    save(analytics);
    if (analytics) startAnalytics();
    else stopAnalytics();
    askedFor.current = false;
    setOpen(false);
  };

  if (!open) return null;
  return (
    <section className={s.box} role="dialog" aria-modal="false" aria-labelledby="levo-consent-title" aria-describedby="levo-consent-text">
      <h2 id="levo-consent-title" className={s.title}>
        Cookies and analytics
      </h2>
      <p id="levo-consent-text" className={s.text}>
        With your consent we use Google Analytics to see how this site is used — which pages are read, and how visitors
        arrive. It sets cookies only if you accept; if you reject, nothing is sent to Google. You can change your mind at
        any time under “Cookie settings” at the foot of the page. <a href={privacyHref}>Privacy notice</a>
      </p>
      <div className={s.actions}>
        <button ref={first} type="button" className={s.btn} onClick={() => choose(false)}>
          Reject
        </button>
        <button type="button" className={s.btn} onClick={() => choose(true)}>
          Accept
        </button>
      </div>
    </section>
  );
}

/** The footer link that reopens the banner, so a choice can be changed or withdrawn at any time. */
export function CookieSettings({ className = "" }: { className?: string }) {
  if (!ACTIVE) return null;
  return (
    <button type="button" className={`${s.link} ${className}`} onClick={() => dispatchEvent(new Event(OPEN))}>
      Cookie settings
    </button>
  );
}
