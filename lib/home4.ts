// /home4 — Europe-facing edition (layout after creativdesign.eu). Levo's own copy, photos and logos; facts from
// levoexhibitions.com (content-notes.md), framed like /home for European exhibitors.
// sections that /home has and this layout did not: their copy is /home's, so the two editions stay in step
import { faqs, posts, reviews, services as homeServices, servicesIntro, shows } from "./home";

const img = (f: string) => `/images/${f}`;

export const site = {
  name: "Levo Exhibitions",
  logo: img("logo-black.svg"),
  logoWhite: img("logo-white.svg"),
  email: "info@levoworld.com",
  phone: "+971 4 359 3600",
  whatsapp:
    "https://api.whatsapp.com/send?phone=971555525709&text=Hello%20Levo%20Exhibitions%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.",
  nav: [
    { label: "Home", href: "/home4" },
    { label: "Services", href: "/home4#services" },
    { label: "Projects", href: "/home4#projects" },
    { label: "Stories", href: "/home4#stories" },
    { label: "Contact", href: "/home4#contact" },
  ],
  socials: [
    { key: "In", name: "LinkedIn", href: "https://www.linkedin.com/company/levo---a-division-of-alams-group/about/" },
    { key: "Ig", name: "Instagram", href: "https://www.instagram.com/levoexhibitions/" },
    { key: "Yt", name: "YouTube", href: "https://www.youtube.com/@LevoExhibitions" },
    { key: "Fb", name: "Facebook", href: "https://www.facebook.com/levo.advt/" },
  ],
};

export const hero = {
  video: "/videos/levo-banner.mp4",
  poster: "/videos/levo-banner-poster.jpg",
  // the last part is brushed over in blue
  title: "Custom Exhibition Stands for European Brands in",
  highlight: "Europe & the Gulf",
  sub: "One project manager from the first sketch to the last panel coming down",
};

export const clients = {
  text: "European brands, ministries and national pavilions have completed their shows with us.",
  logos: ["coesia", "arkema", "agfa", "panatta", "mazzoni-lb", "remsdaq"].map((s) => ({
    name: s.replace("-lb", " LB").replace(/^\w/, (c) => c.toUpperCase()),
    src: img(`client-${s}-mark.png`), // white cut-out marks, inked black in CSS
  })),
};

export const process = {
  label: "The process",
  title: "One Team, Brief to Dismantle",
  steps: [
    { no: "01", title: "Briefing", text: "We review your show, hall, stand type, budget, brand assets and objectives, then confirm the organiser's technical regulations." },
    { no: "02", title: "3D Concept", text: "Our in-house designers produce a 3D visualisation and walk-through, so you can see and change the stand before anything is built." },
    { no: "03", title: "Production", text: "For shows in Europe, carpentry, steel, electrical, fabric and print are produced through our partner network there; for the Gulf, in our Dubai workshop." },
    { no: "04", title: "Set-Up", text: "On-site build, snagging and daily support through the show, then dismantle and storage of reusable elements for the next one." },
  ],
};

export const statement = {
  text: "We design, engineer and build stands for European exhibitors — one project manager and one team, from the first sketch to the last panel coming down.",
  // the pills that tumble into a pile: [label, colour step: 0 (deepest blue) … 8 (palest blue), or a pop: 9 coral, 10 green, 11 pink, 12 violet, 13 apricot]
  tags: [
    ["Partner Network in Europe", 12],
    ["3D Design", 9],
    ["Engineering", 6],
    ["Turnkey Service", 10],
    ["Double Deckers", 11],
    ["National Pavilions", 13],
    ["Custom Stands", 10],
    ["Fabrication", 0],
    ["On-Time Build-Up", 12],
  ] as [string, number][],
};

export const projects = {
  title: "Recent Projects",
  // the cities of the six builds below, Europe first (content-notes.md)
  cities: ["Paris", "Lyon", "Dortmund", "Dubai", "Abu Dhabi"],
  all: "https://levoexhibitions.com/our-works/",
  items: [
    { client: "Ukraine Pavilion", show: "Eurosatory, Paris", img: img("project-208-ukraine-pavilion.webp") },
    { client: "PHNIX", show: "Piscine Global, Lyon", img: img("project-028-phnix.webp") },
    { client: "Tabaterra", show: "InterTabac, Dortmund", img: img("project-027-tabaterra.webp") },
    { client: "Czech Ministry of Defence", show: "Dubai Airshow", img: img("project-031-ministry-of-defence-of-the-czech-republic.webp") },
    { client: "Indra", show: "IDEX, Abu Dhabi", img: img("project-044-indra.webp") },
    { client: "Polska", show: "Dubai International Boat Show", img: img("project-210-poland-pavilion.webp") },
  ],
};

// verbatim excerpts from the clients' reference letters (content-notes.md §9)
export const stories = {
  title: "Customer Stories",
  items: [
    {
      quote: "During this partnership we have experienced very high quality of all services. We are completely satisfied with their performance and happy to recommend the services of Levo.",
      who: "The Polish Tourism Organization, Arabian Travel Market",
    },
    {
      quote: "Thank you Team Levo for the great job done on the design and execution of the Gulfood Manufacturing exhibition stand project. We at Coesia were greatly satisfied with the work you had presented in the past 2 consecutive years.",
      who: "Coesia, Gulfood Manufacturing",
    },
    {
      quote: "We have been working with LEVO to design and execute our stand and have always been completely satisfied with their performance. We are happy to recommend the services of Levo Exhibitions.",
      who: "MAEP, for the Czech Trade Promotion Agency",
    },
  ],
};

export const footer = {
  title: ["We look", "forward to", "hearing", "from you!"], // the last two lines in white
  cta: "Let's meet",
  offices: [
    { name: "Europe", company: "Through our vetted partner network", lines: ["Eurosatory & SIAL Paris · Piscine Global, Lyon", "InterTabac, Dortmund"], phone: "" },
    { name: "Studio", company: "Levo Exhibitions — Levo Advertising LLC", lines: ["1104, 11th Floor, Latifa Tower", "Sheikh Zayed Road, Dubai, UAE"], phone: "+971 4 359 3600" },
    { name: "Workshop", company: "A division of the Alams Group", lines: ["FAB compound, building 16, workshop 5A/5B", "Dubai Investment Park 1, UAE"], phone: "+971 55 552 5709" },
  ],
  legal: [
    { label: "Privacy notice", href: "/home4/privacy" },
    { label: "Legal notice", href: "/home4/legal" },
  ],
  copyright: `© ${new Date().getFullYear()} Levo Exhibitions — Levo Advertising LLC`,
};

// ───────── sections carried over from /home, retitled for this layout ─────────

export const services = {
  label: "Services",
  title: "What We Build",
  intro: servicesIntro.text,
  items: homeServices,
  cta: "Discuss your project",
};

export const reviewStats = [
  { value: reviews.score, label: reviews.basedOn },
  ...reviews.stats.map((s) => ({ value: `${s.value.toLocaleString("en-GB")}${s.suffix}`, label: s.label })),
];

export const events = {
  label: "Upcoming events",
  title: "Where to Find Us Next",
  intro: shows.intro,
  cta: "All events",
  all: shows.all,
  list: shows.list,
};

export const insights = {
  label: "Insights",
  title: "Notes From the Show Floor",
  posts,
};

export const faq = {
  label: "FAQ",
  title: "Quick Answers",
  intro: "Short, clear answers to the questions exhibitors ask us most.",
  items: faqs,
  ask: "Still have a question?",
  cta: "Ask us",
};
