import type { Metadata } from "next";
import { Footer } from "@/components/Contact";
import { LegalBody } from "@/components/legal";
import Nav from "@/components/Nav";

export const metadata: Metadata = { title: "Legal notice — Levo Exhibitions" };

export default function Legal() {
  return (
    <>
      <Nav />
      <main className="legal" id="top">
        <h1>Legal notice</h1>
        <p className="mono-up muted">Impressum</p>
        <LegalBody />
      </main>
      <Footer />
    </>
  );
}
