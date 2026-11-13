import type { Metadata, Viewport } from "next";
import { Ms_Madi, Poppins } from "next/font/google";
import SmoothScroll from "@/components/home/SmoothScroll";
import "./home4.css";

// next/font downloads the font at build time and serves it from this site, so visitors' IPs never reach Google
const poppins = Poppins({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600", "700", "800"], variable: "--h4-font" });
// the preloader's script line, as on /home1
const script = Ms_Madi({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--h4-script" });

export const metadata: Metadata = {
  title: "Levo Exhibitions — Custom Exhibition Stands for European Brands",
  description:
    "Levo Exhibitions designs, engineers and builds custom exhibition stands and national pavilions for European brands - across Europe and at the Gulf's leading trade shows.",
  icons: { icon: "/images/favicon-site-icon.png" },
};

export const viewport: Viewport = { themeColor: "#202124" };

export default function Home4Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${poppins.variable} ${script.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
