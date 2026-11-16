// Upcoming events: one list for /home's Upcoming events, the /home/events page and /home4.
// Dates from content-notes.md (Gulf) and the organisers' listings (Europe, Nov 2026). Where the end date isn't
// published yet it's left out; the event then drops off the day it starts.
// Plain JSON-shaped records on purpose: a dashboard can later serve exactly this (see getEvents).
const img = (f: string) => `/images/${f}`;

export type LevoEvent = {
  title: string;
  start: string; // ISO date, YYYY-MM-DD
  end?: string;
  venue: string;
  city: string;
  country: string;
  region: "Europe" | "Gulf";
  industry: string;
  text: string; // what we built there
  img: string;
  cap: string; // the photo's caption
  clients: { name: string; logo?: string }[];
  featured?: boolean; // shown on the home page
};

export const EVENTS: LevoEvent[] = [
  {
    title: "Piscine Global Europe 2026", start: "2026-11-17", venue: "Eurexpo", city: "Lyon", country: "France", region: "Europe",
    industry: "Pool & spa", text: "We built a 117 sqm stand for PHNIX here in 2022.", img: img("project-028-phnix.webp"),
    cap: "PHNIX — Piscine Global 2022", clients: [{ name: "PHNIX", logo: img("client-phnix.jpg") }], featured: true,
  },
  {
    title: "GITEX Global 2026", start: "2026-12-07", end: "2026-12-11", venue: "Expo City & World Trade Centre", city: "Dubai",
    country: "UAE", region: "Gulf", industry: "Technology", text: "Stands for Cyprus's Logicom (144 sqm) and Hexnode (30 sqm) at GITEX 2024.",
    img: img("project-051-logicom.webp"), cap: "Logicom — GITEX 2024", clients: [{ name: "Logicom" }, { name: "Hexnode" }],
  },
  {
    title: "WHX Dubai 2027", start: "2027-01-25", end: "2027-01-28", venue: "Dubai Exhibition Centre & World Trade Centre", city: "Dubai",
    country: "UAE", region: "Gulf", industry: "Healthcare", text: "Formerly Arab Health — we built stands here for CCHI (126 sqm) and Malaysia's MREPC (144 sqm).",
    img: img("project-139-mrepc.webp"), cap: "MREPC — Arab Health 2020", clients: [{ name: "CCHI" }, { name: "MREPC" }],
  },
  {
    title: "IDEX & NAVDEX 2027", start: "2027-01-25", end: "2027-01-29", venue: "ADNEC", city: "Abu Dhabi", country: "UAE", region: "Gulf",
    industry: "Defence", text: "A 104 sqm stand for Spain's Indra at IDEX 2025.", img: img("project-044-indra.webp"), cap: "Indra — IDEX 2025",
    clients: [{ name: "Indra" }, { name: "SFTE" }], featured: true,
  },
  {
    title: "Gulfood 2027", start: "2027-03-15", end: "2027-03-19", venue: "World Trade Centre & Expo City", city: "Dubai", country: "UAE",
    region: "Gulf", industry: "Food & beverage", text: "Stands for Italy's Coesia, and the Belarus national stand at Gulfood Manufacturing.",
    img: img("project-206-belarus.webp"), cap: "Belarus — Gulfood Manufacturing",
    clients: [{ name: "Coesia", logo: img("client-coesia.jpg") }, { name: "Belarus", logo: img("client-belarus.jpg") }], featured: true,
  },
  {
    title: "InterTabac 2027", start: "2027-09-14", venue: "Messe Dortmund", city: "Dortmund", country: "Germany", region: "Europe",
    industry: "Tobacco", text: "A 60 sqm stand for Tabaterra here in 2024.", img: img("project-027-tabaterra.webp"),
    cap: "Tabaterra — InterTabac 2024", clients: [{ name: "Tabaterra" }], featured: true,
  },
  {
    title: "Eurosatory 2028", start: "2028-06-19", venue: "Paris Nord Villepinte", city: "Paris", country: "France", region: "Europe",
    industry: "Defence", text: "The 210 sqm Ukraine Pavilion here in 2022.", img: img("project-208-ukraine-pavilion.webp"),
    cap: "Ukraine Pavilion — Eurosatory 2022", clients: [{ name: "Ukraine Pavilion" }, { name: "CAA" }], featured: true,
  },
];

const today = () => new Date().toISOString().slice(0, 10);

/** Events not yet over, soonest first. */
export const upcoming = (list: LevoEvent[]) =>
  list.filter((e) => (e.end ?? e.start) >= today()).sort((a, b) => a.start.localeCompare(b.start));

/**
 * The one place pages get events from. When the dashboard exists, only this body changes, e.g.
 *   const res = await fetch(`${process.env.EVENTS_API}/events`, { next: { revalidate: 3600 } });
 *   return upcoming(await res.json());
 */
export async function getEvents() {
  return upcoming(EVENTS);
}

// ── display helpers (UTC, so server and browser print the same date)
const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...o });
const dmy = fmt({ day: "numeric", month: "short", year: "numeric" });
const dm = fmt({ day: "numeric", month: "short" });
const d = fmt({ day: "numeric" });

/** "17.11.26": the home page's short date. */
export const shortDate = (iso: string) => iso.slice(2).split("-").reverse().join(".");

/** "25 – 29 Jan 2027", "28 Feb – 3 Mar 2027", or the start alone when the end isn't known. */
export function dateRange({ start, end }: LevoEvent) {
  const a = new Date(start);
  if (!end) return dmy.format(a);
  const b = new Date(end);
  const sameYear = start.slice(0, 4) === end.slice(0, 4);
  const sameMonth = sameYear && start.slice(5, 7) === end.slice(5, 7);
  return `${(sameMonth ? d : sameYear ? dm : dmy).format(a)} – ${dmy.format(b)}`;
}

/** "Eurexpo, Lyon" — or just the venue when it already names its city. */
export const place = (e: LevoEvent) => (e.venue.includes(e.city) ? e.venue : `${e.venue}, ${e.city}`);
