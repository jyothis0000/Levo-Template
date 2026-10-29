// /home2 — Europe-facing edition (layout after lpas.com). Facts from levoexhibitions.com, see content-notes.md.
const img = (f: string) => `/images/${f}`;

export const company = {
  legal: "Levo Advertising LLC",
  group: "A division of the Alams Group",
  email: "info@levoworld.com",
  phone: "+971 4 359 3600",
  whatsapp:
    "https://api.whatsapp.com/send?phone=971555525709&text=Hello%20Levo%20Exhibitions%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.",
  offices: [
    { name: "Studio", lines: ["1104, 11th Floor, Latifa Tower", "Sheikh Zayed Road, Dubai, UAE"], phone: "+971 4 359 3600" },
    { name: "Workshop", lines: ["FAB Compound, Building 16", "Dubai Investment Park 1, UAE"], phone: "+971 55 552 5709" },
  ],
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/levoexhibitions/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/levo---a-division-of-alams-group/about/" },
    { label: "Facebook", href: "https://www.facebook.com/levo.advt/" },
    { label: "YouTube", href: "https://www.youtube.com/@LevoExhibitions" },
  ],
};

// L·E·V·O, after LPAS's Listen·Plan·Analyze·Shape — maps to Levo's brief → 3D concept → approvals → opening day.
export const preloader = ["Listen", "Envision", "Validate", "Open"];

export const hero = {
  img: img("project-006-hsa.webp"),
  details: ["Exhibition Architecture", "A Europe-Focused Approach"],
  title: "We’re a Dubai exhibition studio building for European brands",
};

// card colours step along the logo's gradient, navy to blue, with two pale blue-greys between
export const focus = [
  {
    title: "Exhibition Stands",
    sub: "Custom builds for European exhibitors",
    color: "#022439",
    ink: "#fff",
    img: img("project-029-saudi-made.webp"),
    items: ["Custom stands", "Double deckers", "Modular systems", "Display stands"],
  },
  {
    title: "National Pavilions",
    sub: "Built for trade bodies",
    color: "#004b7b",
    ink: "#fff",
    img: img("project-008-uruguay-national-pavilion.webp"),
    items: ["Government pavilions", "Co-exhibitor booths", "Organiser formalities", "Show-floor support"],
  },
  {
    title: "Events & Conferences",
    sub: "Stages, AV and production",
    color: "#c9d3df",
    ink: "#022439",
    img: img("service-events-conferences.webp"),
    items: ["Stage & tent works", "Audio & video", "Furniture", "Hosts & catering"],
  },
  {
    title: "Interior & Fit-out",
    sub: "Offices and experience rooms",
    color: "#0070b8",
    ink: "#fff",
    img: img("service-interior-fit-out.jpeg"),
    items: ["Office fit-out", "Retail interiors", "In-house joinery", "AV rooms"],
  },
  {
    title: "Mall Kiosks",
    sub: "Retail for high-footfall spaces",
    color: "#dce8f1",
    ink: "#022439",
    img: img("service-mall-kiosk-gallery-04.webp"),
    items: ["Kiosk design", "Manufacturing", "Installation", "Branding"],
  },
];

export const intro = {
  title: "Clear Process. Precise Builds. One Team. Always On Time.",
  tagline: ["Listen. Envision.", "Validate. Open."],
  img: img("project-151-veritas.webp"),
  text:
    "At Levo, we design, engineer and build custom exhibition stands from our Dubai studio and workshop — for European exhibitors at the Gulf’s leading trade shows, and at shows across Europe through our partner network. One project manager stays with you from the first sketch to the last panel coming down.",
};

export const work = {
  filters: [
    { label: "Europe", count: 5 },
    { label: "Gulfood", count: 35 },
    { label: "Beautyworld", count: 21 },
    { label: "GITEX", count: 15 },
    { label: "ADIPEC", count: 13 },
  ],
  all: "https://levoexhibitions.com/our-works/",
  rows: [
    [
      { title: "Saudi Made — SIAL Paris, 915 sqm", place: "Paris Nord Villepinte, France", img: img("project-029-saudi-made.webp"), big: true },
      { title: "Czech Ministry of Defence", place: "Dubai Airshow — 136.5 sqm pavilion", img: img("project-031-ministry-of-defence-of-the-czech-republic.webp") },
      { title: "Coretrax — two-storey stand", place: "ADIPEC, Abu Dhabi", img: img("project-120-coretrax.webp") },
    ],
    [
      { title: "Logicom — GITEX Technology", place: "Dubai World Trade Centre", img: img("project-144-logicom.webp") },
      { title: "GERAB — 205 sqm double decker", place: "ADIPEC, Abu Dhabi", img: img("project-022-gerab.webp") },
      { title: "GSI — Gulfood, 114 sqm", place: "Expo City Dubai", img: img("project-009-gsi.webp"), big: true },
    ],
  ],
};

// European date order (DD.MM.YY)
export const shows = {
  all: "https://levoexhibitions.com/upcoming-exhibitions-dubai/",
  list: [
    { title: "ADIPEC 2026", text: "ADNEC, Abu Dhabi — we built a 205 sqm double decker for GERAB here in 2025.", date: "02.11.26", img: img("project-022-gerab.webp"), cap: "GERAB — ADIPEC 2025" },
    { title: "GITEX Global 2026", text: "Expo City Dubai and DWTC — previous builds for Logicom (144 sqm) and Hexnode.", date: "07.12.26", img: img("project-144-logicom.webp"), cap: "Logicom — GITEX Technology 2023" },
    { title: "WHX Dubai 2027", text: "Dubai Exhibition Centre, Expo City — custom stands delivered for WHX exhibitors.", date: "25.01.27", img: img("project-142-al-fahim-healthcare-solutions.webp"), cap: "Al Fahim Healthcare — MEDLAB 2021" },
    { title: "IDEX & NAVDEX 2027", text: "ADNEC, Abu Dhabi — stands for the India Pavilion, SFTE and ABIMDE at IDEX 2025.", date: "25.01.27", img: img("project-031-ministry-of-defence-of-the-czech-republic.webp"), cap: "Czech Ministry of Defence — Dubai Airshow 2025" },
    { title: "Gulfood 2027", text: "Dubai World Trade Centre and Expo City — builds for Coesia and Ghassan Aboud Group.", date: "15.03.27", img: img("project-013-hemani.webp"), cap: "Hemani — Gulfood 2026" },
  ],
};

export const prefooter = img("project-119-petronas.webp");

export const approach = {
  title: "From brief to dismantle",
  text: "One project manager for the whole build — handling the organiser, the venue, the contractors and the logistics, so your team is not chasing five suppliers in show week.",
  steps: [
    { title: "Brief and floor plan", text: "We review your show, hall, stand type, budget parameters, brand assets and objectives, then confirm the organiser’s technical regulations.", img: img("home-double-decker-custom-exhibition-stand-with-led-display-reception-counter-and-meeting-areas.jpeg") },
    { title: "3D concept design", text: "Our in-house designers produce a 3D visualisation and walk-through so you can see and change the stand before anything is built.", img: img("home-custom-exhibition-stand-with-illuminated-branding-meeting-area-and-product-display-shelves.jpeg") },
    { title: "Engineering and approvals", text: "Structural drawings, load calculations, electrical layouts and rigging plans are prepared and submitted to the organiser for approval.", img: img("about-levo-exhibition-stand-build-process.jpg") },
    { title: "Fabrication and graphics", text: "Carpentry, steel, electrical, fabric and print are produced in our Dubai Investment Park workshop — or through our partner network abroad.", img: img("about-exhibition-stand-carpentry-workshop.jpg") },
    { title: "Install, support, dismantle", text: "On-site build, snagging, daily support through the show, then dismantle and storage of reusable elements for the next event.", img: img("service-exhibition-services-gallery-08.webp") },
  ],
};

export const voices = {
  quotes: [
    {
      text: "Thank you Team Levo for the great job done on the design and execution of the Gulfood Manufacturing exhibition stand. We were greatly satisfied with the work you presented in the past two consecutive years.",
      who: "Coesia",
      where: "Gulfood Manufacturing",
    },
    {
      text: "Not only do they provide excellent built stands, but also professional and reliable service every time. No request is too big or small for them, therefore we use them again and again.",
      who: "Brother International",
      where: "Exhibitor",
    },
    {
      text: "We have found Levo to be an extremely efficient company. It is comforting to know that everything is well thought out and taken care of in a most calm and understanding manner.",
      who: "Al Masaood",
      where: "Dubai International Boat Show",
    },
  ],
  stats: [
    { value: "3,000+", label: "Projects completed" },
    { value: "75+", label: "In-house specialists" },
    { value: "98%", label: "Client satisfaction" },
    { value: "4.7/5", label: "From 18 client reviews" },
  ],
  logos: ["coesia", "arkema", "agfa", "middlesex-university", "panatta", "polska", "brother", "mitsubishi"].map((n) => ({
    name: n.replace(/-/g, " "),
    src: img(`client-${n}.jpg`),
  })),
};
