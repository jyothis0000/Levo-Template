import { templates } from "@/lib/templates";

// "/": every edition of the site in one list, so they can be gone through one after another.
export default function Index() {
  return (
    <main className="ix">
      <header className="ix-head">
        <img src="/images/logo-black.svg" alt="Levo Exhibitions" className="ix-logo" />
        <h1>Website templates</h1>
        <p>
          {templates.length} editions of the Levo site, all focused on European exhibitors and built to the EU's rules: no cookies, and
          nothing loaded from third parties. Open one to review it.
        </p>
      </header>

      <ol className="ix-list">
        {templates.map((t, i) => (
          <li key={t.href} className="ix-item">
            {/* the picture is a convenience for the mouse; the title below is the link for everyone else */}
            <a href={t.href} className="ix-thumb" tabIndex={-1} aria-hidden>
              <img src={t.img} alt="" width={1000} height={500} loading={i < 2 ? "eager" : "lazy"} />
            </a>
            <div className="ix-body">
              <p className="ix-meta">
                <span className="ix-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="ix-tag">{t.tag}</span>
              </p>
              <h2>
                <a href={t.href}>{t.name}</a>
              </h2>
              <p className="ix-route">
                <code>{t.href}</code>
              </p>
              <p className="ix-summary">{t.summary}</p>
              <p className="ix-label" id={`styles-${i}`}>
                Design and animation styles
              </p>
              <ul className="ix-chips" aria-labelledby={`styles-${i}`}>
                {t.styles.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="ix-actions">
                <a href={t.href} className="ix-open">
                  Open {t.name}
                </a>
                <a href={`${t.href}/privacy`}>Privacy</a>
                <a href={`${t.href}/legal`}>Legal</a>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
