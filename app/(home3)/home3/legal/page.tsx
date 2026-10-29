import type { Metadata } from "next";
import { Footer, Nav } from "@/components/home3/Chrome";
import { LegalBody } from "@/components/legal";

export const metadata: Metadata = { title: "Legal notice — Levo Exhibitions" };

export default function Legal() {
  return (
    <>
      <Nav />
      <main className="legal" id="top">
        <h1>Legal notice</h1>
        <p className="legal-meta">Impressum</p>
        <LegalBody />
      </main>
      <Footer />
    </>
  );
}
