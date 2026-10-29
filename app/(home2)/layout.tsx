import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ExploreCursor, PrivacyNote, SmoothScroll } from "@/components/home2/Chrome";
import "./home2.css";

// next/font downloads the font at build time and serves it from this site,
// so visitors' IPs never reach Google (cf. LG München I, 3 O 17493/20).
const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--f" });

export const metadata: Metadata = {
  title: "Levo — Exhibition stands for European brands",
  description: "A Dubai exhibition studio designing and building custom stands for European exhibitors in the Gulf and across Europe.",
  icons: { icon: "/images/favicon-site-icon.png" },
};

// the browser's own chrome (mobile address bar) in the logo's navy
export const viewport: Viewport = { themeColor: "#022439" };

export default function Home2Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={geist.variable}>
      <body>
        <SmoothScroll />
        {children}
        <ExploreCursor />
        <PrivacyNote />
      </body>
    </html>
  );
}
