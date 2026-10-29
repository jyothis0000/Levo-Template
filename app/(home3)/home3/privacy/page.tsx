import type { Metadata } from "next";
import { Footer, Nav } from "@/components/home3/Chrome";
import { PRIVACY_UPDATED, PrivacyBody } from "@/components/legal";

export const metadata: Metadata = { title: "Privacy notice — Levo Exhibitions" };

export default function Privacy() {
  return (
    <>
      <Nav />
      <main className="legal" id="top">
        <h1>Privacy notice</h1>
        <p className="legal-meta">Last updated {PRIVACY_UPDATED}</p>
        <PrivacyBody stored="Your browser keeps two local notes: that you closed our privacy message, and whether you switched the colours with ‘invert color’. Both are strictly necessary to honour your own choice, and never leave your device." />
      </main>
      <Footer />
    </>
  );
}
