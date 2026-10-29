import type { Metadata } from "next";
import { DM_Sans, Cal_Sans, Ms_Madi } from "next/font/google";
import "./globals.css";
import "./sections.css";

const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });
const cal = Cal_Sans({ subsets: ["latin"], weight: "400", variable: "--font-cal", adjustFontFallback: false });
const script = Ms_Madi({ subsets: ["latin"], weight: "400", variable: "--font-script" });

export const metadata: Metadata = {
  title: "Levo Exhibitions — Exhibition Stand Design & Build",
  description:
    "Levo Exhibitions designs, builds and installs custom exhibition stands, pavilions and event experiences.",
  icons: { icon: "/images/favicon-site-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dm.variable} ${cal.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
