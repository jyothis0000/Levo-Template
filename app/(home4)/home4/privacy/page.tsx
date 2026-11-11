import type { Metadata } from "next";
import { PRIVACY_UPDATED, PrivacyBody } from "@/components/home/legal";
import { Header, WhatsApp } from "@/components/home4/Chrome";
import { Footer } from "@/components/home4/Sections";

export const metadata: Metadata = { title: "Privacy notice — Levo Exhibitions" };

// the same text as /home's (/home/privacy), which /home4 shares: no cookies, no analytics, nothing from third parties
export default function Privacy() {
  return (
    <>
      <Header />
      <main className="h4-legal" id="main">
        <div className="h4-wrap">
          <span className="h4-pill-label">Last updated {PRIVACY_UPDATED}</span>
          <h1>Privacy notice</h1>
          <PrivacyBody stored="Nothing is kept in your browser either, and there are no forms on this site: you reach us by e-mail, phone or WhatsApp." />
        </div>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
