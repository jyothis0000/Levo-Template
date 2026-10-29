import type { Metadata } from "next";
import { Footer, Header } from "@/components/home2/Chrome";
import { PRIVACY_UPDATED, PrivacyBody } from "@/components/legal";

export const metadata: Metadata = { title: "Privacy notice — Levo Exhibitions" };

export default function Privacy() {
  return (
    <>
      <Header />
      <a href="/home2" className="legal-logo" aria-label="Levo — home">
        <img src="/images/logo-black.svg" alt="Levo" />
      </a>
      <main className="legal" id="top">
        <h1>Privacy notice</h1>
        <p className="legal-meta">Last updated {PRIVACY_UPDATED}</p>
        <PrivacyBody stored="Your browser keeps one local note that you closed our privacy message, so we don’t show it again — this is strictly necessary." />
      </main>
      <Footer />
    </>
  );
}
