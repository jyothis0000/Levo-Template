// /home3 — Europe-facing edition (layout after santalarch.com). Copy and images from /home1 (lib/content.ts),
// facts from levoexhibitions.com (content-notes.md).
const img = (f: string) => `/images/${f}`;

export const nav = [
  { label: "Principles", href: "#principles", col: 1 },
  { label: "Works", href: "#works", col: 3 },
  { label: "Services", href: "#services", col: 4 },
  { label: "Process", href: "#process", col: 5 },
  { label: "Company", href: "#company", col: 6 },
  { label: "Contact", href: "#contact", col: 7 },
];

// the reference's "Architecture is understood · layer by layer · until it becomes whole", for a stand builder
export const preloader = {
  title: "Exhibition is understood",
  words: ["layer", "by", "layer"],
  description: "An exhibition studio building for European brands with precision and intent",
  end: "Until it becomes whole",
};

export const hero = {
  caption: ["Built by experience.", "Driven by expertise."],
  description: ["Exhibition studio", "building for European brands", "with precision and intent."],
  tagline: ["Exhibition", "Shapes", "Perception"],
};

// the cube faces read as one loop: …Exhibition Shapes Perception Defines Experience Refines Exhibition…
export const cubes = {
  front: ["Perception", "Defines", "Experience", "Refines", "Exhibition", "Shapes"],
  side: ["Feel", "Touch", "Hear"],
};

export const principles = [
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
    text: "Built and checked in our Dubai workshop, then installed inside the organiser’s build-up window — ready when the doors open.",
    img: img("about-dp-world-trade-show-booth.jpg"),
  },
];

export const approach = {
  verbs: ["Listen", "Design", "Engineer", "Build"],
  lead: ["Design defines", "direction — engineering", "secures it."],
  sub: "We translate a brief into a built stand through one structured process and one team.",
  layers: [
    img("home-custom-exhibition-stand-with-illuminated-branding-meeting-area-and-product-display-shelves.jpeg"),
    img("about-levo-exhibition-stand-build-process.jpg"),
    img("service-exhibition-services-gallery-12.webp"),
    img("about-exhibition-stand-carpentry-workshop.jpg"),
  ],
  principles: [
    { label: "Direction", title: ["One point", "of contact"], text: "Design through dismantling sits with one team, so nothing falls between suppliers. You deal with the same people from first sketch to last panel." },
    { label: "System", title: ["Engineering", "for hard builds"], text: "Double deckers and heavy rigging need structural sign-off and early submissions. Routine for us — resolved months before build-up." },
    { label: "Craft", title: ["Designers who", "stay on the job"], text: "The people who draw your stand are the people who manage it on site, so the build looks like the render." },
    { label: "Resolution", title: ["Assembled", "before it ships"], text: "Every stand is built and checked in our workshop, so problems are solved off the show floor — not in front of your visitors." },
  ],
};

export const works = {
  all: "https://levoexhibitions.com/our-works/",
  columns: [
    [
      { title: "Saudi Made", meta: "SIAL Paris · 915 sqm", img: img("project-029-saudi-made.webp") },
      { title: "Logicom", meta: "GITEX · 210 sqm", img: img("project-144-logicom.webp") },
      { title: "Hemani", meta: "Gulfood · 48 sqm", img: img("project-013-hemani.webp") },
      { title: "Al Masaood", meta: "Boat Show · 96 sqm", img: img("project-083-al-masaood.webp") },
    ],
    [
      { title: "HSA", meta: "Gulfood · 456 sqm", img: img("project-006-hsa.webp") },
      { title: "Czech Ministry of Defence", meta: "Dubai Airshow · 136.5 sqm", img: img("project-031-ministry-of-defence-of-the-czech-republic.webp") },
      { title: "Coretrax", meta: "ADIPEC · 92 sqm", img: img("project-120-coretrax.webp") },
      { title: "Veritas", meta: "GITEX · 75.5 sqm", img: img("project-151-veritas.webp") },
    ],
    [
      { title: "GERAB", meta: "ADIPEC · 205 sqm", img: img("project-022-gerab.webp") },
      { title: "Petronas", meta: "ADIPEC · 117 sqm", img: img("project-119-petronas.webp") },
      { title: "Uruguay Pavilion", meta: "Gulfood · 288 sqm", img: img("project-008-uruguay-national-pavilion.webp") },
      { title: "GSI", meta: "Gulfood · 114 sqm", img: img("project-009-gsi.webp") },
    ],
  ],
};

export const services = [
  { title: "Exhibition Stands", text: "Custom stands, double deckers and modular systems for European exhibitors at the Gulf’s leading shows.", img: img("service-exhibition-services.webp") },
  { title: "Pavilions", text: "Official national pavilions for governments and trade bodies — Poland, the Czech Republic and more.", img: img("project-008-uruguay-national-pavilion.webp") },
  { title: "Events", text: "Stages, AV, furniture and on-site production for conferences and corporate events.", img: img("service-events-conferences.webp") },
  { title: "Interiors", text: "Offices, showrooms and experience rooms — in-house joinery and a dedicated after-care team.", img: img("service-interior-fit-out.jpeg") },
  { title: "Kiosks", text: "Retail kiosks for high-footfall malls and public spaces, designed, built and maintained.", img: img("service-mall-kiosk.jpeg") },
];

export const process = {
  lead: "Every stand is structured through a sequence of clearly defined stages.",
  stages: [
    {
      title: ["Brief and", "Floor Plan"],
      text: "We review your show, hall, stand type, budget parameters, brand assets and objectives, then confirm the organiser’s technical regulations.",
      scope: ["Show and hall review", "Stand type and size", "Budget parameters", "Brand assets and objectives", "Organiser regulations"],
    },
    {
      title: ["3D Concept", "Design"],
      text: "Our in-house designers produce a 3D visualisation and walk-through so you can see and change the stand before anything is built.",
      scope: ["3D visualisation", "Walk-through", "Material and lighting direction", "Revisions before build"],
    },
    {
      title: ["Engineering and", "Approvals"],
      text: "Structural drawings, load calculations, electrical layouts and rigging plans are prepared and submitted to the organiser for approval.",
      scope: ["Structural drawings", "Load calculations", "Electrical layouts", "Rigging plans", "Organiser submission"],
    },
    {
      title: ["Fabrication and", "Graphics"],
      text: "Carpentry, steel, electrical, fabric and print are produced at our workshop in Dubai Investment Park or through our partner network in Europe.",
      scope: ["Carpentry and steel", "Electrical", "Fabric and print", "Workshop pre-assembly"],
    },
    {
      title: ["Install, Support,", "Dismantle"],
      text: "On-site build, snagging, daily support through the show, then dismantle and storage of reusable elements for the next event.",
      scope: ["On-site build and snagging", "Daily show support", "Dismantle on schedule", "Storage for re-use"],
    },
  ],
};

export const company = {
  crew: [
    { name: "Studio", role: "Design & project management — Dubai", img: img("about-trade-show-booth-construction-process.webp") },
    { name: "Workshop", role: "Carpentry & finishing — Dubai Investment Park", img: img("about-exhibition-stand-carpentry-workshop.jpg") },
    { name: "Site crew", role: "Installation — on the show floor", img: img("service-exhibition-services-gallery-12.webp") },
  ],
  lead: "Our team delivers stands across the Gulf and Europe, through our own crews and a vetted partner network.",
  // pinned on the globe at a main exhibition city of each country. The first is the focus market:
  // the globe rests on it and every arc starts there.
  countries: [
    { name: "Germany", lat: 50.1, lon: 8.7 },
    { name: "France", lat: 48.9, lon: 2.4 },
    { name: "Spain", lat: 40.4, lon: -3.7 },
    { name: "UAE", lat: 25.2, lon: 55.3 },
    { name: "Saudi Arabia", lat: 24.7, lon: 46.7 },
    { name: "Qatar", lat: 25.3, lon: 51.5 },
    { name: "USA", lat: 36.2, lon: -115.2 },
  ],
};

export const contact = {
  emails: [{ address: "info@levoworld.com", caption: "General enquiries" }],
  phone: "+971 4 359 3600",
  whatsapp:
    "https://api.whatsapp.com/send?phone=971555525709&text=Hello%20Levo%20Exhibitions%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.",
  address: ["1104, 11th Floor, Latifa Tower,", "Sheikh Zayed Road, Dubai, UAE"],
  legal: "Levo Advertising LLC",
  group: "A division of the Alams Group",
  // in place of the reference's "Digital Infrastructure" note: how this site treats your data
  privacy: [
    "We believe the quality of a project is defined as much by the decisions that remain unseen as by those that are visible.",
    "The same principle applies to this website. It sets no cookies, runs no analytics and loads nothing from third parties — fonts, images and scripts are served from our own server.",
    "When you write to us, we use your details only to answer you. You can ask us at any time what we hold, and have it corrected or deleted.",
  ],
};
