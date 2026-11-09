import About from "@/components/home/About";
import Approach from "@/components/home/Approach";
import Blog from "@/components/home/Blog";
import { Footer } from "@/components/home/Contact";
import Events from "@/components/home/Events";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import LTransition from "@/components/home/LTransition";
import Nav from "@/components/home/Nav";
import Perception from "@/components/home/Perception";
import { CaseShowcase } from "@/components/home/Portfolio";
import Preloader from "@/components/home/Preloader";
import Reviews from "@/components/home/Reviews";
import Services from "@/components/home/Services";
import Shows from "@/components/home/Shows";
import { contact } from "@/lib/home";

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <About />
        <Events />
        <Perception />
        <Services />
        <Approach />
        <Shows />
        <CaseShowcase />
        <Reviews />
        <Blog />
        {/* Case studies: hidden for now — restore this line, and the nav's "Projects" link to "/home#projects" in lib/home.ts */}
        {/* <Portfolio /> */}
        {/* Steps and Features: hidden for now — restore these lines (and their imports), and the nav's "Process" link to
            "/home#process" in lib/home.ts */}
        {/* <Process /> */}
        {/* <Features /> */}
        {/* The Journey timeline and The team: hidden for now — restore these two lines */}
        {/* <Timeline /> */}
        {/* Numbers band (3,000+ projects…): hidden for now — restore this line and its import */}
        {/* <Facts /> */}
        {/* <Team /> */}
        {/* What we believe: hidden for now — restore this line and its import */}
        {/* <Belief /> */}
        <Faq />
        <LTransition />
      </main>
      <Footer />
      <a className="float-cta mono-up" href={contact.whatsappLink} target="_blank" rel="noreferrer">
        WhatsApp <span>Levo</span> now
      </a>
    </>
  );
}
