import About from "@/components/About";
import Blog from "@/components/Blog";
import { Footer } from "@/components/Contact";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Portfolio from "@/components/Portfolio";
import Preloader from "@/components/Preloader";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Timeline from "@/components/Timeline";
import { contact } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <Reviews />
        <Features />
        <Timeline />
        <Team />
        <Faq />
        <Blog />
      </main>
      <Footer />
      <a className="float-cta mono-up" href={contact.whatsappLink} target="_blank" rel="noreferrer">
        WhatsApp <span>Levo</span> now
      </a>
    </>
  );
}
