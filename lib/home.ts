// /home — the working copy of /home1 (cloned so it can change freely). Copy and imagery from levoexhibitions.com
// (see content-notes.md), framed for European exhibitors.
const img = (f: string) => `/images/${f}`;

export const brand = {
  name: "Levo Exhibitions",
  short: "levo",
  logo: img("logo-black.svg"),
  logoWhite: img("logo-white.svg"),
  pill: "Driven by Expertise",
  script: "built by experience.",
  est: "1978",
  group: "A division of the Alams Group",
};

// page-qualified, so they also work from the privacy and legal pages
export const nav = [
  { label: "Who we are", href: "/home#about" },
  { label: "Services", href: "/home#services" },
  { label: "Projects", href: "/home#featured" }, // "#projects" while the Case studies section is shown
  { label: "Process", href: "/home#approach" }, // "#process" while the Steps section is shown
  { label: "Contact", href: "/home#contact" },
];

export const contact = {
  phone: "+971 4 359 3600",
  whatsapp: "+971 55 552 5709",
  whatsappLink:
    "https://api.whatsapp.com/send?phone=971555525709&text=Hello%20Levo%20Exhibitions%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.",
  email: "info@levoworld.com",
  address: "1104, 11th Floor, Latifa Tower, Sheikh Zayed Road, opposite Dubai World Trade Centre, Dubai, UAE",
  workshop: "FAB compound, building 16, workshop 5A/5B, Dubai Investment Park 1",
  hours: "Mon – Fri · 09:00 – 18:00",
  lead: "Tell us your show, your space and your timeline — a project manager replies within one working day.",
  socials: [
    { label: "Fb", name: "Facebook", href: "https://www.facebook.com/levo.advt/" },
    { label: "Ig", name: "Instagram", href: "https://www.instagram.com/levoexhibitions/" },
    { label: "In", name: "LinkedIn", href: "https://www.linkedin.com/company/levo---a-division-of-alams-group/about/" },
    { label: "Yt", name: "YouTube", href: "https://www.youtube.com/@LevoExhibitions" },
  ],
};

export const hero = {
  // poster: a frame from 0.5s in, so the switch to the playing video doesn't jump
  image: "/videos/levo-banner-poster.jpg",
  // the 58.8 MB master, re-encoded for the web: same 1080p30 and 30s, no audio track, faststart — 19.7 MB
  video: "/videos/levo-banner.mp4",
  services: ["Exhibition stands", "National pavilions", "Events & conferences"],
  slots: { label: "Now booking", value: "Europe & Gulf 2027" },
  intro:
    "We design, engineer and build custom exhibition stands for European brands - at shows across Europe through our partner network, and at the Gulf's biggest trade shows.",
  cta: "Request a stand design",
  clientCount: "40+",
};

// European brands, universities and national pavilions first; global brands that exhibit with us after them
const clientNames = [
  "Coesia", "Arkema", "AGFA", "Panatta", "Mazzoni LB", "Remsdaq", "Middlesex University", "Polska",
  "Belarus", "Brother", "Mitsubishi",
];
export const clients = clientNames.map((name) => {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return {
    name,
    logo: img(`client-${slug}.jpg`), // on white, for light backgrounds
    mark: img(`client-${slug}-mark.png`), // white on transparent, for the banner's dark strip
  };
});

export const about = {
  meta: "3,000+ projects",
  statement: "Custom exhibition stands for European exhibitors, in the Gulf and across Europe - designed, built and installed by one team.",
  quote:
    "From concept development and 3D design to engineering, fabrication, installation and dismantling — every stage runs in-house, with expertise across carpentry, steel, electrical, graphics, fabrics and logistics.",
  person: { name: "The Levo team", role: "Project managers & engineers", img: img("favicon-site-icon.png") },
  images: [
    { src: img("project-027-tabaterra.webp"), alt: "Tabaterra · InterTabac, Dortmund" },
    { src: img("project-028-phnix.webp"), alt: "PHNIX · Piscine Global, Lyon" },
  ],
};

export const servicesIntro = {
  text: "Four disciplines, one team. From brief to dismantle, nothing falls between suppliers.",
  kicker: "One point of contact",
  sub: "Design through dismantling sits with one team.",
  booking: [
    ["Now booking", "Europe & Gulf 2027"],
    ["Reply", "Within one working day"],
  ] as [string, string][],
  cta: "Tell us your show. We will tell you what is possible.",
  ctaSub: "Send the show, your stand size and the organiser's floor plan.",
};

export const services = [
  {
    title: "Exhibition Stands",
    text: "The one-stop shop for your exhibition stand — a unique booth conceptualised around your participation goals, built with high-quality finish and materials, and supported on site for the whole show, in Europe or the Gulf.",
    note: "10,000+ sqm of exhibition space built",
    tags: ["Custom stands", "Double deckers", "3D design", "Fabrication", "Installation", "Partner network in Europe"],
    images: [img("service-exhibition-services.webp"), img("project-208-ukraine-pavilion.webp")],
  },
  {
    title: "National Pavilions",
    text: "Official pavilions for national trade bodies and ministries — appointed for Poland, the Czech Republic, Belarus and Ukraine, with the organiser formalities, co-exhibitor booths and show-floor support handled by one team.",
    note: "Poland · Czech Republic · Belarus · Ukraine",
    tags: ["Government pavilions", "Co-exhibitor booths", "Organiser formalities", "Country branding", "Show-floor support"],
    images: [img("project-210-poland-pavilion.webp"), img("project-031-ministry-of-defence-of-the-czech-republic.webp")],
  },
  {
    title: "Events & Conferences",
    text: "Holistic event services at any range or scale — stage and tent works, custom furniture, audio and video, photography, hosts, catering, invitations and post-event support.",
    note: "A 750-guest forum in Paris, 2023",
    tags: ["Stage & tent works", "AV systems", "Furniture", "Photography", "Hosts", "Giveaways"],
    images: [img("service-events-conferences.webp"), img("service-events-conferences-gallery-08.webp")],
  },
  {
    title: "Interior & Fit Out",
    text: "Your single point of contact for interior design, production and refurbishment — offices, shops, schools and universities, with in-house joinery and a dedicated after-care team.",
    note: "In-house joinery & after-care",
    tags: ["Office fit-out", "Retail", "Joinery", "System furniture", "AV rooms", "Refurbishment"],
    images: [img("service-interior-fit-out.jpeg"), img("service-interior-fit-out-gallery-07.webp")],
  },
];

export const portfolioIntro = {
  text: "Real stands, real shows, real square metres — judge the work on evidence rather than adjectives.",
  more: "Every project designed and delivered by Levo, with the show, venue, stand size and year stated.",
  count: 220,
};

// Built in Europe first (Paris, Lyon, Dortmund), then European ministries, pavilions and brands at Gulf shows. Year and
// size only where the portfolio states them. The first four also lead the (hidden) case-study deck.
export const projects: { client: string; show: string; size: string; year?: number; venue: string; img: string }[] = [
  { client: "Ukraine Pavilion", show: "Eurosatory · national pavilion", size: "210 sqm", year: 2022, venue: "Paris, France", img: img("project-208-ukraine-pavilion.webp") },
  { client: "PHNIX", show: "Piscine Global", size: "117 sqm", year: 2022, venue: "Lyon, France", img: img("project-028-phnix.webp") },
  { client: "Tabaterra", show: "InterTabac", size: "60 sqm", year: 2024, venue: "Dortmund, Germany", img: img("project-027-tabaterra.webp") },
  { client: "Czech Ministry of Defence", show: "Dubai Airshow · national pavilion", size: "136.5 sqm", year: 2025, venue: "DWC, Maktoum Airport", img: img("project-031-ministry-of-defence-of-the-czech-republic.webp") },
  { client: "Indra", show: "IDEX", size: "104 sqm", year: 2025, venue: "ADNEC, Abu Dhabi", img: img("project-044-indra.webp") },
  { client: "Polska", show: "Boat Show · Poland Pavilion", size: "", venue: "Dubai International Boat Show", img: img("project-210-poland-pavilion.webp") },
  { client: "Arkema", show: "Big 5", size: "30 sqm", year: 2021, venue: "Dubai World Trade Centre", img: img("project-156-arkema.webp") },
  { client: "Belarus", show: "Arabian Travel Market", size: "22.5 sqm", year: 2019, venue: "Dubai World Trade Centre", img: img("project-168-belarus.webp") },
  { client: "CAA", show: "Eurosatory", size: "", venue: "Paris, France", img: img("project-209-caa.webp") },
];

// "Events", taken from /home2's "A selection of our work": two staggered rows, each a tall photo beside a pair that
// stays pinned while the tall one scrolls past; every card and filter links to the full portfolio. Row one is built in
// Europe; row two, European pavilions at Gulf shows. Filter counts are the portfolio's own (content-notes.md).
export const events = {
  label: "Events",
  title: "Events.",
  intro: "Stands we have built in Europe — Eurosatory in Paris, Piscine Global in Lyon, InterTabac in Dortmund — and for European pavilions abroad.",
  cta: "All events",
  all: "https://levoexhibitions.com/our-works/",
  filtersLabel: "Built in Europe",
  filters: [
    { label: "Eurosatory", count: 2 },
    { label: "SIAL Paris", count: 1 },
    { label: "Piscine Global", count: 1 },
    { label: "InterTabac", count: 1 },
  ],
  rows: [
    [
      { title: "Ukraine Pavilion — Eurosatory, 210 sqm", place: "Paris, France · 2022", img: img("project-208-ukraine-pavilion.webp"), big: true },
      { title: "PHNIX — Piscine Global, 117 sqm", place: "Lyon, France · 2022", img: img("project-028-phnix.webp") },
      { title: "Tabaterra — InterTabac, 60 sqm", place: "Dortmund, Germany · 2024", img: img("project-027-tabaterra.webp") },
    ],
    [
      { title: "CAA — Eurosatory", place: "Paris, France", img: img("project-209-caa.webp") },
      { title: "Polska — Poland Pavilion", place: "Dubai International Boat Show", img: img("project-210-poland-pavilion.webp") },
      { title: "Czech Ministry of Defence — 136.5 sqm", place: "Dubai Airshow · 2025", img: img("project-031-ministry-of-defence-of-the-czech-republic.webp"), big: true },
    ],
  ],
};

// The featured showcase straight after "Who we are": the nine projects above zoom out from the Polska pavilion — a
// 1890px photo, so the first full-screen frame is crisp — into a 3×3 grid; then "View all" opens the full portfolio.
// `grid` lists indexes into `projects`, row by row.
export const caseStudies = {
  label: "Featured projects",
  title: "Featured projects.",
  intro: "Nine builds for European exhibitors — in Paris, Lyon and Dortmund, and for European ministries, pavilions and brands at the Gulf's biggest shows.",
  overlay: "Real stands. Real shows.",
  cta: "View all projects",
  all: "https://levoexhibitions.com/our-works/",
  grid: [0, 4, 1, 2, 5, 3, 6, 8, 7],
};

export const processIntro = {
  text: "From brief to dismantle — one project manager for the whole build.",
  quote:
    "That person handles the organiser, the venue, the contractors and the logistics, so your marketing team is not chasing five suppliers in show week.",
  person: { name: "Levo Exhibitions", role: "Project management", img: img("favicon-site-icon.png") },
};

export const process = [
  {
    tag: "Brief",
    title: "Brief and floor plan",
    text: "We review your show, hall, stand type, budget parameters, brand assets and objectives, then confirm the organiser's technical regulations.",
  },
  {
    tag: "Design",
    title: "3D concept design",
    text: "Our in-house designers produce a 3D visualisation and walk-through so you can see and change the stand before anything is built.",
  },
  {
    tag: "Build",
    title: "Engineering and fabrication",
    text: "Structural drawings, load calculations and rigging plans go to the organiser for approval — then carpentry, steel, electrical, fabric and print are produced at our Dubai Investment Park workshop.",
  },
  {
    tag: "Show",
    title: "Install, support, dismantle",
    text: "On-site build, snagging, daily support through the show, then dismantle and storage of reusable elements for the next event.",
  },
];

export const reviews = {
  intro: "Real words from the exhibitors, trade bodies and governments we've built for.",
  moreIntro: "More from the European ministries and brands we have built for.",
  score: "4.7/5",
  basedOn: "From 18 client reviews",
  // the photo is Levo's Polska pavilion (Dubai International Boat Show); the reference itself is for the ATM 2019 stand
  featured: {
    img: img("project-210-poland-pavilion.webp"),
    services: "National stand design & build",
    quote:
      "During this partnership we have experienced very high quality of all services. We are completely satisfied with their performance and happy to recommend the services of Levo.",
    name: "The Polish Tourism Organization",
    role: "72 sqm Polish National Stand · Arabian Travel Market 2019",
  },
  stats: [
    { label: "Satisfied customers", note: "Trusted partnerships", value: 1000, prefix: "", suffix: "+" },
    { label: "Client satisfaction", note: "Quality & service", value: 98, prefix: "", suffix: "%" },
  ],
  more: [
    {
      company: "Coesia",
      logo: img("testimonial-coesia.jpg"),
      quote:
        "Thank you Team Levo for the great job done on the design and execution of the Gulfood Manufacturing exhibition stand project. We at Coesia were greatly satisfied with the work you had presented in the past 2 consecutive years.",
      name: "Coesia",
      role: "Gulfood Manufacturing",
    },
    {
      company: "Czech Trade",
      logo: img("testimonial-czech-trade-promotion-agency.jpg"),
      quote:
        "We have been working with LEVO to design and execute our stand and have always been completely satisfied with their performance. We are happy to recommend the services of Levo Exhibitions.",
      name: "MAEP, for the Czech Trade Promotion Agency",
      role: "WETEX 2019",
    },
  ],
};

export const features = {
  intro: "Why exhibitors choose Levo — the habits behind every build.",
  title: "One point of contact.",
  text: "Design through dismantling sits with one team, so nothing falls between suppliers.",
  checklist: ["Designers who stay on the job", "Proof you can check", "Turnkey, concept to dismantle"],
  visual: img("project-011-jaleel-distribution.webp"),
  chips: [
    { icon: "★", value: "75+", label: "In-house specialists" },
    { icon: "◷", value: "1 working day", label: "Reply to every brief" },
    { icon: "✓", value: "100%", label: "On-time delivery" },
  ],
  years: 20,
  cards: [
    {
      kicker: "Workshop",
      badge: "Dubai Investment Park",
      title: "Assembled before it ships.",
      text: "Every stand is built and checked in our workshop, so problems get solved off the show floor.",
      img: img("about-exhibition-stand-spray-painting-booth.jpg"),
      value: 0,
      suffix: "",
    },
    {
      kicker: "Space built",
      badge: "",
      title: "Square metres of exhibition space",
      text: "Across Europe, the UAE, Saudi Arabia, the wider GCC, Asia, India and the USA.",
      img: img("project-020-petrotech.webp"),
      value: 10000,
      suffix: "+",
    },
    {
      kicker: "Double deckers",
      badge: "Structural sign-off",
      title: "Engineering for hard builds.",
      text: "Double deckers and heavy rigging need structural sign-off and early submissions. Routine for us.",
      img: img("about-veritas-double-decker-exhibition-stand.webp"),
      value: 0,
      suffix: "",
    },
  ],
};

export const timeline = {
  intro: "Levo grew out of the Alams Group with a single focus: exhibitions.",
  quote:
    "They want the stand ready, looking like the render, and passing inspection. Our job is to take that off their desk.",
  img: img("about-levo-exhibition-stand-build-process.jpg"),
  items: [
    { year: "1978", title: "The Alams Group is founded", text: "The parent company from which Levo grew, with a single focus on exhibitions." },
    { year: "2016", title: "Most beautiful stand, BRIDE Dubai", text: "Juri Fashion's stand earns the organiser's award for the most beautiful stand at the show." },
    { year: "2019", title: "National pavilions", text: "The 72 sqm Polish National Stand and Belarus at Arabian Travel Market; the Czech Republic at WETEX." },
    { year: "2022", title: "Building beyond the UAE", text: "915 sqm for Saudi Made at SIAL Paris and Phnix at Piscine Global, Lyon — through our partner network." },
    { year: "2025–Now", title: "Double deckers, defence & aviation", text: "A 205 sqm double decker for GERAB at ADIPEC and a 136.5 sqm pavilion for the Czech Ministry of Defence at Dubai Airshow." },
  ],
};

export const facts = [
  { label: "Projects completed", value: 3000, suffix: "+" },
  { label: "In-house specialists", value: 75, suffix: "+" },
  { label: "Countries delivered", value: 5, suffix: "+" },
];

export const team = {
  intro: "You deal with the same people from the first sketch to the last panel coming down.",
  people: [
    { name: "Our crew on site", role: "Project managers & technicians", img: img("about-trade-show-booth-construction-process.webp") },
    { name: "Panel saw", role: "Carpentry · production workshop", img: img("about-exhibition-stand-carpentry-workshop.jpg") },
    { name: "Wall assembly", role: "Steel, electrical & graphics", img: img("service-exhibition-services-gallery-12.webp") },
    { name: "Platform installation", role: "Install crew · on site", img: img("service-exhibition-services-gallery-08.webp") },
  ],
  trades: ["Project managers", "Engineers", "Event managers", "Designers", "Technicians", "Carpenters", "Steel", "Electrical", "Graphics", "Fabrics", "Logistics"],
};

export const belief = {
  text: "Stands have grown taller. Organiser rules have tightened. What has not changed is how an exhibitor feels in the weeks before a show.",
  name: "Levo Exhibitions",
  role: "Our story",
  img: img("service-events-conferences-gallery-27.webp"),
};

export const faqs = [
  {
    q: "Who is Levo Exhibitions?",
    a: "An exhibition stand design and build company based in Dubai, building for European exhibitors in the Gulf and across Europe. It trades as Levo Advertising LLC, a division of the Alams Group founded in 1978, and has completed more than 3,000 projects.",
  },
  {
    q: "Do you build in Europe?",
    a: "Yes — the 210 sqm Ukraine Pavilion and CAA at Eurosatory in Paris, 915 sqm for Saudi Made at SIAL Paris, 117 sqm for PHNIX at Piscine Global in Lyon and 60 sqm for Tabaterra at InterTabac in Dortmund, through a vetted partner network. Design, engineering, project management and your point of contact stay with the same team throughout.",
  },
  {
    q: "Can you build double decker stands?",
    a: "Yes. Every double decker and two-storey stand carries structural engineering, independent sign-off and an organiser submission cleared months before build-up.",
  },
  {
    q: "How far ahead should I book a stand contractor?",
    a: "Brief a contractor ten weeks before the show opens for a standard custom stand, and six months ahead for a double decker or a national pavilion. For biennial defence and aerospace shows such as Eurosatory, IDEX and Dubai Airshow, twelve months is normal.",
  },
  {
    q: "My show is only a few weeks away. Is it too late?",
    a: "Often not — the constraint is the organiser's approval deadline rather than our production capacity. Our workshop at Dubai Investment Park can fast-track fabrication using modular structural systems with custom cladding and graphics.",
  },
  {
    q: "How do you handle my data?",
    a: "Under the EU GDPR. This site sets no cookies, runs no analytics and loads nothing from third parties. What you send us is used only to answer your enquiry, and you can ask us at any time what we hold, or have it corrected or deleted — see our privacy notice.",
  },
  {
    q: "How do I start a project?",
    a: "E-mail info@levoworld.com or call +971 4 359 3600. Share your show, stand size and timeline, and a project manager comes back within one working day. WhatsApp works too, under Meta's own privacy terms.",
  },
];
export const faqImage = img("project-028-phnix.webp");

export const posts = [
  {
    title: "How Exhibition Stands Are Designed and Built: A Step-by-Step Guide",
    date: "Oct 21, 2026",
    href: "https://levoexhibitions.com/blog/exhibition-stand-design-process/",
    img: img("about-dp-world-trade-show-booth.jpg"),
  },
  {
    title: "Sustainable Exhibitions: Beyond Buzzwords to Real Impact",
    date: "Jan 9, 2026",
    href: "https://levoexhibitions.com/blog/sustainable-exhibitions-beyond-buzzwords-to-real-impact/",
    img: img("project-156-arkema.webp"),
  },
  {
    title: "Exhibition Stands Are the Cathedrals of Modern Commerce",
    date: "Jan 9, 2026",
    href: "https://levoexhibitions.com/blog/exhibition-stands-are-the-cathedrals-of-modern-commerce/",
    img: img("project-062-middlesex-university.webp"),
  },
];

// "Exhibition Shapes Perception", taken from /home3 (lib/home3.ts → hero.tagline, cubes, principles): the tagline
// climbs, shutters close behind "Perception", a pyramid of word cubes turns and the camera dives into the principles.
// The cube faces read as one loop: …Exhibition Shapes Perception Defines Experience Refines Exhibition…
export const perception = {
  tagline: ["Exhibition", "Shapes", "Perception"],
  cubes: {
    front: ["Perception", "Defines", "Experience", "Refines", "Exhibition", "Shapes"],
    side: ["Feel", "Touch", "Hear"],
  },
  principles: [
    {
      word: "Bold",
      text: "A clear presence on the show floor — brand, light and proportion working as one, from the aisle to the meeting room.",
      img: img("home-large-custom-exhibition-stand-with-overhead-branding-digital-display-and-visitor-meeting-space.jpeg"),
    },
    {
      word: "Engineered",
      text: "Structural drawings, load calculations and organiser approvals resolved early. A stand must be buildable, safe and exact.",
      img: img("about-exhibition-stand-spray-painting-booth.jpg"),
    },
    {
      word: "On Time",
      text: "Built and checked in our Dubai workshop or with our partners in Europe, then installed inside the organiser’s build-up window — ready when the doors open.",
      img: img("about-dp-world-trade-show-booth.jpg"),
    },
  ],
};

// "Our approach", taken from /home2 (lib/home2.ts → approach): a sticky photo that cross-fades as each stage passes
// the middle of the screen.
export const approach = {
  label: "Our approach",
  title: "From brief\nto dismantle.",
  text: "One project manager for the whole build — handling the organiser, the venue, the contractors and the logistics, so your team is not chasing five suppliers in show week.",
  steps: [
    { title: "Brief and floor plan", text: "We review your show, hall, stand type, budget parameters, brand assets and objectives, then confirm the organiser’s technical regulations.", img: img("home-double-decker-custom-exhibition-stand-with-led-display-reception-counter-and-meeting-areas.jpeg") },
    { title: "3D concept design", text: "Our in-house designers produce a 3D visualisation and walk-through so you can see and change the stand before anything is built.", img: img("home-custom-exhibition-stand-with-illuminated-branding-meeting-area-and-product-display-shelves.jpeg") },
    { title: "Engineering and approvals", text: "Structural drawings, load calculations, electrical layouts and rigging plans are prepared and submitted to the organiser for approval.", img: img("about-levo-exhibition-stand-build-process.jpg") },
    { title: "Fabrication and graphics", text: "Carpentry, steel, electrical, fabric and print are produced in our Dubai Investment Park workshop — or through our partner network in Europe.", img: img("about-exhibition-stand-carpentry-workshop.jpg") },
    { title: "Install, support, dismantle", text: "On-site build, snagging, daily support through the show, then dismantle and storage of reusable elements for the next event.", img: img("service-exhibition-services-gallery-08.webp") },
  ],
};

// "Upcoming shows", taken from /home2 (lib/home2.ts → shows): a list where a photo follows the pointer over each row.
// The shows European exhibitors book us for: three in Europe, two in the Gulf with European clients. European date
// order (DD.MM.YY). Gulf dates from content-notes.md; European ones from trade-fair listings (Nov 2026) — confirm on the
// organisers' sites (piscine-global.com, intertabac.de, eurosatory.com) as each edition nears.
export const shows = {
  label: "Upcoming events",
  title: "Upcoming\nevents.",
  intro: "Where European exhibitors will find our stands next — at shows across Europe and in the Gulf.",
  cta: "All events",
  all: "https://levoexhibitions.com/upcoming-exhibitions-dubai/",
  list: [
    { title: "Piscine Global Europe 2026", text: "Eurexpo, Lyon — we built a 117 sqm stand for PHNIX here in 2022.", date: "17.11.26", img: img("project-028-phnix.webp"), cap: "PHNIX — Piscine Global 2022" },
    { title: "IDEX & NAVDEX 2027", text: "ADNEC, Abu Dhabi — a 104 sqm stand for Spain's Indra at IDEX 2025.", date: "25.01.27", img: img("project-044-indra.webp"), cap: "Indra — IDEX 2025" },
    { title: "Gulfood 2027", text: "Dubai World Trade Centre and Expo City — stands for Italy's Coesia, and the Belarus national stand at Gulfood Manufacturing.", date: "15.03.27", img: img("project-206-belarus.webp"), cap: "Belarus — Gulfood Manufacturing" },
    { title: "InterTabac 2027", text: "Messe Dortmund — a 60 sqm stand for Tabaterra here in 2024.", date: "14.09.27", img: img("project-027-tabaterra.webp"), cap: "Tabaterra — InterTabac 2024" },
    { title: "Eurosatory 2028", text: "Paris Nord Villepinte — the 210 sqm Ukraine Pavilion here in 2022.", date: "19.06.28", img: img("project-208-ukraine-pavilion.webp"), cap: "Ukraine Pavilion — Eurosatory 2022" },
  ],
};

// The closing scene around the logo's "L", just before it grows into the footer: a last call to action, with the
// shows we build for running behind it.
export const finale = {
  label: "Your next show",
  title: "Let’s build\nwhat’s next.",
  lead: "Send the show, your stand size and the organiser’s floor plan — a project manager replies within one working day.",
  facts: [
    ["Now booking", "Europe & Gulf 2027"],
    ["Reply", "Within one working day"],
    ["Built in", "Dubai, or with partners in Europe"],
  ],
  cta: "Request a stand design",
  shows: ["Eurosatory", "SIAL Paris", "Piscine Global", "InterTabac", "Gulfood", "IDEX", "Dubai Airshow", "GITEX"],
};
