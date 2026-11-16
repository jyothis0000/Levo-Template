import type { Metadata } from "next";
import { Footer } from "@/components/home/Contact";
import EventsBrowser from "@/components/home/EventsBrowser";
import Nav from "@/components/home/Nav";
import { getEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Upcoming events — Levo Exhibitions",
  description: "The trade shows where Levo builds stands next, across Europe and the Gulf — and the clients we built for at each.",
};

export const revalidate = 3600; // re-read the events hourly, so ended ones drop off

export default async function Events() {
  const events = await getEvents();
  return (
    <>
      <Nav />
      <EventsBrowser events={events} />
      <Footer />
    </>
  );
}
