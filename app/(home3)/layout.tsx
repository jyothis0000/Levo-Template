import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { SmoothScroll } from "@/components/home2/Chrome";
import { Invert, Note, Preloader } from "@/components/home3/Chrome";
import "./home3.css";

// served from this site at build time — no visitor request ever reaches Google
const grotesk = Inter_Tight({ subsets: ["latin", "latin-ext"], variable: "--f" });

export const metadata: Metadata = {
  title: "Levo — Exhibition studio for European brands",
  description: "A Dubai exhibition studio designing, engineering and building stands for European exhibitors in the Gulf and across Europe.",
  icons: { icon: "/images/favicon-site-icon.png" },
};

export default function Home3Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={grotesk.variable}>
      <body>
        <SmoothScroll />
        <Preloader />
        <div className="gridlines" aria-hidden>
          {Array.from({ length: 7 }, (_, i) => (
            <i key={i} />
          ))}
          <b />
        </div>
        {children}
        <Invert />
        <Note />
      </body>
    </html>
  );
}
