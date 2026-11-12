import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./index.css";

// next/font downloads the font at build time and serves it from this site, so visitors' IPs never reach Google
const poppins = Poppins({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600", "700"], variable: "--ix-font" });

export const metadata: Metadata = {
  title: "Levo — Website templates",
  description: "Every edition of the Levo Exhibitions website, in one list.",
  icons: { icon: "/images/favicon-site-icon.png" },
  robots: { index: false, follow: false }, // a working index of unfinished editions, not a public page
};

export const viewport: Viewport = { themeColor: "#f5f5f2" };

export default function IndexLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
