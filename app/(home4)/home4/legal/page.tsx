import type { Metadata } from "next";
import { LegalBody } from "@/components/home/legal";
import { Header, WhatsApp } from "@/components/home4/Chrome";
import { Footer } from "@/components/home4/Sections";

export const metadata: Metadata = { title: "Legal notice — Levo Exhibitions" };

// the same text as /home's (/home/legal), which /home4 shares: no cookies, no analytics, nothing from third parties
export default function Legal() {
  return (
    <>
      <Header />
      <main className="h4-legal" id="main">
        <div className="h4-wrap">
          <span className="h4-pill-label">Impressum</span>
          <h1>Legal notice</h1>
          <LegalBody />
        </div>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
