"use client";

// /home/events: every upcoming event, filtered by region and year in the sidebar and by industry in the chip row.
import { useState } from "react";
import { dateRange, place, type LevoEvent } from "@/lib/events";
import { contact, shows } from "@/lib/home";
import { Label, SplitTitle } from "./ui";

type Key = "region" | "industry" | "year";
const of: Record<Key, (e: LevoEvent) => string> = { region: (e) => e.region, industry: (e) => e.industry, year: (e) => e.start.slice(0, 4) };
const mail = (subject: string) => `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;

export default function EventsBrowser({ events }: { events: LevoEvent[] }) {
  const [f, setF] = useState<Partial<Record<Key, string>>>({});
  const set = (k: Key, v?: string) => setF((p) => ({ ...p, [k]: p[k] === v ? undefined : v }));
  const values = (k: Key) => [...new Set(events.map(of[k]))].sort();
  const shown = events.filter((e) => (Object.keys(of) as Key[]).every((k) => !f[k] || of[k](e) === f[k]));
  const any = Object.values(f).some(Boolean);

  const chips = (k: Key, all?: string) => (
    <ul className="evp-chips">
      {all && (
        <li>
          <button type="button" className="evp-chip" aria-pressed={!f[k]} onClick={() => set(k)}>
            {all}
          </button>
        </li>
      )}
      {values(k).map((v) => (
        <li key={v}>
          <button type="button" className="evp-chip" aria-pressed={f[k] === v} onClick={() => set(k, v)}>
            {v}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <main className="section evp" id="top">
      <header className="cols evp-head">
        <div className="head-left">
          <Label title={shows.label} />
          <p className="muted">{shows.intro}</p>
        </div>
        <SplitTitle as="h1" className="giant" text={shows.title} />
      </header>

      <div className="evp-body">
        <aside className="evp-side" aria-labelledby="evp-filters">
          <h2 id="evp-filters" className="evp-side-title">
            Filters
          </h2>
          {(["region", "year"] as const).map((k) => (
            <section key={k} className="evp-group">
              <div className="evp-group-head">
                <h3 className="mono-up">{k === "region" ? "Region" : "Year"}</h3>
                {f[k] && (
                  <button type="button" className="evp-clear mono-up" onClick={() => set(k)}>
                    Clear
                  </button>
                )}
              </div>
              {chips(k)}
            </section>
          ))}
          <div className="evp-ask">
            <p>Exhibiting at a show that isn’t listed? We build across Europe and the Gulf.</p>
            <a href={mail("A stand at another show")} className="evp-link mono-up">
              Tell us the show <span aria-hidden>+</span>
            </a>
          </div>
        </aside>

        <div className="evp-main">
          <div className="evp-bar" role="group" aria-label="Industry">
            {chips("industry", "All industries")}
          </div>
          <p className="evp-count mono-up muted" aria-live="polite">
            {shown.length} {shown.length === 1 ? "event" : "events"}
            {any && (
              <button type="button" className="evp-clear mono-up" onClick={() => setF({})}>
                Clear all
              </button>
            )}
          </p>

          <ul className="evp-grid">
            {shown.map((e) => (
              <li key={e.title} className="evp-card">
                <figure className="evp-img">
                  <img src={e.img} alt={e.cap} loading="lazy" />
                  <span className="evp-region mono-up">{e.region}</span>
                  <time className="evp-date mono-up" dateTime={e.start}>
                    {dateRange(e)}
                  </time>
                </figure>
                <div className="evp-info">
                  <p className="mono-up muted">{e.industry}</p>
                  <h2 className="evp-title">{e.title}</h2>
                  <p className="evp-place">
                    {place(e)}, {e.country}
                  </p>
                  <p className="evp-text muted">{e.text}</p>
                  <div className="sh-clients" aria-label={`Built here for ${e.clients.map((c) => c.name).join(", ")}`}>
                    <span className="sh-clients-label mono-up muted" aria-hidden>
                      Built here for
                    </span>
                    <span className="sh-tiles" aria-hidden>
                      {e.clients.map((c) => (
                        <span key={c.name} className="sh-tile">
                          {c.logo ? <img src={c.logo} alt="" loading="lazy" /> : <b>{c.name}</b>}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
                <a href={mail(`A stand at ${e.title}`)} className="evp-link evp-cta mono-up">
                  Plan your stand here <span aria-hidden>+</span>
                </a>
              </li>
            ))}
          </ul>

          {!shown.length && (
            <p className="evp-empty muted">
              No events match these filters.{" "}
              <button type="button" className="evp-clear mono-up" onClick={() => setF({})}>
                Clear all
              </button>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
