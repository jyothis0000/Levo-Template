import Perception from "@/components/home/Perception";
import { Cursor, Header, SideBars, WhatsApp } from "@/components/home4/Chrome";
// import Loader from "@/components/home4/Loader"; // the logo-L loader, hidden for now (see below)
import Preloader from "@/components/home4/Preloader";
import { DarkBand, Faq, Footer, Hero, Insights, Intro, Services, Upcoming } from "@/components/home4/Sections";

// /home4 — layout after creativdesign.eu, with Levo's own content (lib/home4.ts). Perception, Services, Upcoming
// events, Insights and the FAQ are /home's sections; Perception is /home's own component (its motion unchanged), the
// rest are re-set in this layout's style.
export default function Home4() {
  return (
    <>
      <Preloader />
      {/* The logo-L loader (components/home4/Loader.tsx, its CSS is still in home4.css) is hidden for now, not removed:
          restore it by putting <Loader /> here in place of <Preloader /> and un-commenting its import. */}
      {/* <Loader /> */}
      <Header />
      <SideBars />
      <Cursor />
      <main id="main">
        <Hero />
        <Intro />
        <Perception />
        <Services />
        <Upcoming />
        <DarkBand />
        <Insights />
        <Faq />
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
