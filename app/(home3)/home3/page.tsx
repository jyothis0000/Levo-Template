import { Approach } from "@/components/home3/Approach";
import { Footer, Nav, Wordmark } from "@/components/home3/Chrome";
import { Contact } from "@/components/home3/Contact";
import { Cubes } from "@/components/home3/Cubes";
import { Hero } from "@/components/home3/Intro";
import { Company, Process, Services, Works } from "@/components/home3/Work";

export default function Home3() {
  return (
    <>
      <Wordmark />
      <Nav />
      <main>
        <Hero />
        <Cubes />
        <Approach />
        <Works />
        <Services />
        <Process />
        <Company />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
