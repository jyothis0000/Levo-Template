import Perception from "@/components/home/Perception";
import { Cursor, Header, SideBars, WhatsApp } from "@/components/home4/Chrome";
import { DarkBand, Faq, Footer, Hero, Insights, Intro, Services, Upcoming } from "@/components/home4/Sections";

// /home4 — layout after creativdesign.eu, with Levo's own content (lib/home4.ts). Perception, Services, Upcoming
// events, Insights and the FAQ are /home's sections; Perception is /home's own component (its motion unchanged), the
// rest are re-set in this layout's style.
export default function Home4() {
  return (
    <>
      <Header />
      <SideBars />
      <Cursor />
      <main id="main">
        <Hero />
        <Intro />
        <Perception />
        <Services />
        <DarkBand />
        <Upcoming />
        <Insights />
        <Faq />
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
