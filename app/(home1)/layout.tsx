import type { Metadata } from "next";
import { DM_Sans, Cal_Sans, Ms_Madi } from "next/font/google";
import "./globals.css";
import "./sections.css";

// next/font downloads the fonts at build time and serves them from this site, so visitors' IPs never reach Google
// (cf. LG München I, 3 O 17493/20). latin-ext covers European names and addresses.
const dm = DM_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-dm" });
const cal = Cal_Sans({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-cal", adjustFontFallback: false });
const script = Ms_Madi({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-script" });

export const metadata: Metadata = {
  title: "Levo Exhibitions — Exhibition Stand Design & Build",
  description:
    "Levo Exhibitions designs, builds and installs custom exhibition stands for European brands — at the Gulf's leading shows and across Europe.",
  icons: { icon: "/images/favicon-site-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${dm.variable} ${cal.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
