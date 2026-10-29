import type { Metadata } from "next";
import { Footer, Header } from "@/components/home2/Chrome";
import { LegalBody } from "@/components/legal";

export const metadata: Metadata = { title: "Legal notice — Levo Exhibitions" };

export default function Legal() {
  return (
    <>
      <Header />
      <a href="/home2" className="legal-logo" aria-label="Levo — home">
        <img src="/images/logo-black.svg" alt="Levo" />
      </a>
      <main className="legal" id="top">
        <h1>Legal notice</h1>
        <p className="legal-meta">Impressum</p>
        <LegalBody />
      </main>
      <Footer />
    </>
  );
}
