import type { Metadata } from "next";
import { Footer } from "@/components/Contact";
import { PRIVACY_UPDATED, PrivacyBody } from "@/components/legal";
import Nav from "@/components/Nav";

export const metadata: Metadata = { title: "Privacy notice — Levo Exhibitions" };

export default function Privacy() {
  return (
    <>
      <Nav />
      <main className="legal" id="top">
        <h1>Privacy notice</h1>
        <p className="mono-up muted">Last updated {PRIVACY_UPDATED}</p>
        <PrivacyBody stored="Nothing is kept in your browser either. The company-profile form only opens your own e-mail app, so nothing is sent from the page itself." />
      </main>
      <Footer />
    </>
  );
}
