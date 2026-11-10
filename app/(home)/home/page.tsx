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
      <a className="float-cta mono-up" href={contact.whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp Levo now">
        {/* WhatsApp's glyph, inline: nothing is loaded from Meta until the visitor taps */}
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41Z" />
        </svg>
        <span className="float-text" aria-hidden>
          WhatsApp <span className="float-levo">Levo</span> now
        </span>
      </a>
    </>
  );
}
