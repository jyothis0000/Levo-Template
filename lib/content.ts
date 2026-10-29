// All copy and imagery below comes from levoexhibitions.com (see content-notes.md).
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
  profile: "https://levoexhibitions.com/wp-content/uploads/2026/07/levo_company_profile_2026.pdf",
};

export const nav = [
  { label: "Who we are", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
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
  socials: [
    { label: "Fb", href: "https://www.facebook.com/levo.advt/" },
    { label: "Ig", href: "https://www.instagram.com/levoexhibitions/" },
    { label: "In", href: "https://www.linkedin.com/company/levo---a-division-of-alams-group/about/" },
    { label: "Yt", href: "https://www.youtube.com/@LevoExhibitions" },
  ],
};

export const hero = {
  image: img("hero-video-poster.jpeg"),
  // ponytail: the site's 58.8 MB banner video is not bundled; drop an mp4 in /public and set it here.
  video: "",
  services: ["Exhibition stands", "Events & conferences", "Interior & fit out"],
  slots: { label: "Now booking", value: "Gulfood 2027" },
  intro:
    "We design, engineer and build custom exhibition stands in Dubai — for energy majors, global manufacturers and national pavilions at the region's biggest trade shows.",
  cta: "Request a stand design",
  clientCount: "40+",
};

const clientNames = [
  "Mitsubishi", "Petronas", "Coesia", "Brother", "Arkema", "Alfanar", "Veritas", "Zamil Offshore",
  "Hemani", "Foodics", "AGFA", "Panatta", "Middlesex University", "Polska", "Tourism Malaysia", "Belarus",
];
export const clients = clientNames.map((name) => ({
  name,
  logo: img(`client-${name.toLowerCase().replace(/\s+/g, "-")}.jpg`),
}));

export const about = {
  meta: "3,000+ projects",
  statement: "Custom exhibition stands across Dubai, Abu Dhabi and the wider Middle East — designed, built and installed in-house.",
  quote:
    "From concept development and 3D design to engineering, fabrication, installation and dismantling — every stage runs in-house, with expertise across carpentry, steel, electrical, graphics, fabrics and logistics.",
  person: { name: "The Levo team", role: "Project managers & engineers", img: img("favicon-site-icon.png") },
  images: [
    { src: img("home-custom-exhibition-stand-with-illuminated-branding-meeting-area-and-product-display-shelves.jpeg"), alt: "Custom stand" },
    { src: img("home-double-decker-custom-exhibition-stand-with-led-display-reception-counter-and-meeting-areas.jpeg"), alt: "Double decker" },
  ],
};

export const servicesIntro = {
  text: "Four disciplines, one team. From brief to dismantle, nothing falls between suppliers.",
  kicker: "One point of contact",
  sub: "Design through dismantling sits with one team.",
  booking: [
    ["Now booking", "Gulfood 2027"],
    ["Reply", "Within one working day"],
  ] as [string, string][],
  cta: "Tell us your show. We will tell you what is possible.",
  ctaSub: "Send the show, your stand size and the organiser's floor plan.",
};

export const services = [
  {
    title: "Exhibition Stands",
    sub: "أجنحة المعارض",
    text: "The one-stop shop for your exhibition stand — a unique booth conceptualised around your participation goals, built with high-quality finish and materials, and supported on site for the whole show.",
    note: "10,000+ sqm of exhibition space built",
    tags: ["Custom stands", "Double deckers", "Pavilions", "3D design", "Fabrication", "Installation"],
    images: [img("service-exhibition-services.webp"), img("service-exhibition-services-gallery-03.webp")],
  },
  {
    title: "Events & Conferences",
    sub: "الفعاليات والمؤتمرات",
    text: "Holistic event services at any range or scale — stage and tent works, custom furniture, audio and video, photography, hosts, catering, invitations and post-event support.",
    note: "Stage decoration & conference design",
    tags: ["Stage & tent works", "AV systems", "Furniture", "Photography", "Hosts", "Giveaways"],
    images: [img("service-events-conferences.webp"), img("service-events-conferences-gallery-02.webp")],
  },
  {
    title: "Mall Kiosks",
    sub: "الأكشاك",
    text: "Kiosks and specialised booths for high-footfall malls, public areas and events — designed, manufactured, installed and maintained by the same team.",
    note: "End-to-end kiosk services",
    tags: ["Kiosk design", "Manufacturing", "Installation", "Maintenance", "Hardware", "Branding"],
    images: [img("service-mall-kiosk.jpeg"), img("service-mall-kiosk-gallery-04.webp")],
  },
  {
    title: "Interior & Fit Out",
    sub: "التصميم الداخلي",
    text: "Your single point of contact for interior design, production and refurbishment — offices, shops, schools and universities, with in-house joinery and a dedicated after-care team.",
    note: "Civil Defence & Fire Dept. formalities included",
    tags: ["Office fit-out", "Retail", "Joinery", "System furniture", "AV rooms", "Refurbishment"],
    images: [img("service-interior-fit-out.jpeg"), img("service-interior-fit-out-gallery-11.webp")],
  },
];

export const portfolioIntro = {
  text: "Real stands, real shows, real square metres — judge the work on evidence rather than adjectives.",
  more: "Every project designed and delivered by Levo, with the show, venue, stand size and year stated.",
  reelText: "Gulfood, ADIPEC, GITEX, Beautyworld, Dubai Airshow — and the floors beyond the UAE.",
  reel: "Built ©26",
  count: 220,
};

export const projects = [
  { client: "HSA", show: "Gulfood", size: "456 sqm", year: 2026, venue: "Dubai World Trade Centre", img: img("project-006-hsa.webp") },
  { client: "Saudi Made", show: "SIAL Paris", size: "915 sqm", year: 2022, venue: "Paris Nord Villepinte", img: img("project-029-saudi-made.webp") },
  { client: "GSI", show: "Gulfood", size: "114 sqm", year: 2026, venue: "Dubai Exhibition Centre, Expo City", img: img("project-009-gsi.webp") },
  { client: "Petronas", show: "ADIPEC", size: "117 sqm", year: 2018, venue: "ADNEC, Abu Dhabi", img: img("project-119-petronas.webp") },
  // "More cases" list
  { client: "GERAB", show: "ADIPEC · 205 sqm double decker", size: "205 sqm", year: 2025, venue: "ADNEC, Abu Dhabi", img: img("project-022-gerab.webp") },
  { client: "Czech Ministry of Defence", show: "Dubai Airshow · national pavilion", size: "136.5 sqm", year: 2025, venue: "DWC, Maktoum Airport", img: img("project-031-ministry-of-defence-of-the-czech-republic.webp") },
  { client: "Logicom", show: "GITEX Technology", size: "210 sqm", year: 2023, venue: "Dubai World Trade Centre", img: img("project-144-logicom.webp") },
  { client: "Coretrax", show: "ADIPEC · two-storey stand", size: "92 sqm", year: 2022, venue: "ADNEC, Abu Dhabi", img: img("project-120-coretrax.webp") },
  { client: "Veritas", show: "GITEX Technology", size: "75.5 sqm", year: 2019, venue: "Dubai World Trade Centre", img: img("project-151-veritas.webp") },
];

export const highlights = [
  "project-118-petronas.webp",
  "project-036-evina.webp",
  "project-023-keeta-drone.webp",
  "project-058-haze-vape.webp",
  "project-138-cchi.jpeg",
  "project-085-blue-gulf-cat.webp",
  "project-142-al-fahim-healthcare-solutions.webp",
  "project-013-hemani.webp",
  "project-082-ethos.webp",
].map(img);

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
  moreIntro: "A few more perspectives from teams we've partnered with over the years.",
  score: "4.7/5",
  basedOn: "From 18 client reviews",
  featured: {
    img: img("project-083-al-masaood.webp"),
    services: "Exhibition stand design & build",
    quote:
      "We have found Levo to be an extremely efficient company. Not only are we happy with the quality of our stand at these events but it is also comforting to know that everything is well thought out and taken care of in a most calm and understanding manner.",
    name: "Al Masaood",
    role: "Dubai International Boat Show",
  },
  stats: [
    { label: "Satisfied customers", note: "Trusted partnerships", value: 1000, prefix: "", suffix: "+" },
    { label: "Client satisfaction", note: "Quality & service", value: 98, prefix: "", suffix: "%" },
  ],
  more: [
    {
      company: "Brother International",
      logo: img("testimonial-brother.jpg"),
      quote:
        "Not only do they provide excellent built stands, but also professional and reliable service every time. No request is too big or small for them, therefore we use them again and again.",
      name: "Brother International",
      role: "Exhibitor",
    },
    {
      company: "Coesia",
      logo: img("testimonial-coesia.jpg"),
      quote:
        "Thank you Team Levo for the great job done on the design and execution of the Gulfood Manufacturing exhibition stand. We were greatly satisfied with the work you presented in the past 2 consecutive years.",
      name: "Coesia",
      role: "Gulfood Manufacturing",
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
      text: "Across the UAE, Saudi Arabia, the wider GCC, Europe, Asia, India and the USA.",
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

export const packages = {
  intro: "Three ways we build — sized by the largest stand we've delivered in each.",
  plans: [
    {
      title: "Custom Stand",
      sub: "جناح مخصص",
      text: "A unique stand conceptualised around your participation goals and built with high-quality finish and materials.",
      size: 456,
      badge: "",
      includes: ["3D concept & walk-through", "Engineering & approvals", "Fabrication in our workshop", "Installation & dismantling"],
      extras: ["Interactive technology", "On-site support team"],
      time: "Brief us ten weeks before the show",
    },
    {
      title: "Double Decker",
      sub: "جناح بطابقين",
      text: "Two-level stands for the energy and aviation shows, with structural engineering and independent sign-off.",
      size: 205,
      badge: "Routine for us",
      includes: ["Structural drawings", "Load calculations", "Rigging & electrical layouts", "Built and checked before it ships"],
      extras: ["Organiser submission months ahead", "Storage of reusable elements", "Dedicated project manager"],
      time: "Brief us six months ahead",
    },
    {
      title: "National Pavilion",
      sub: "جناح وطني",
      text: "Official pavilions for governments and trade bodies — Poland, Belarus, the Czech Republic and Malaysia.",
      size: 915,
      badge: "",
      includes: ["Pavilion planning", "Organiser formalities", "Graphics, fabrics & print", "Daily show support"],
      extras: ["Partner network abroad", "Same project managers end to end"],
      time: "Six months ahead — twelve for IDEX & Airshow",
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
    a: "An exhibition stand design and build company based in Dubai. It trades as Levo Advertising LLC, a division of the Alams Group founded in 1978, and has completed more than 3,000 projects.",
  },
  {
    q: "Can you build double decker stands?",
    a: "Yes. Every double decker and two-storey stand carries structural engineering, independent sign-off and an organiser submission cleared months before build-up.",
  },
  {
    q: "How far ahead should I book a stand contractor?",
    a: "Brief a contractor ten weeks before the show opens for a standard custom stand, and six months ahead for a double decker or a national pavilion. For biennial defence and aerospace shows such as IDEX and Dubai Airshow, twelve months is normal.",
  },
  {
    q: "My show is only a few weeks away. Is it too late?",
    a: "Often not — the constraint is the organiser's approval deadline rather than our production capacity. Our workshop at Dubai Investment Park can fast-track fabrication using modular structural systems with custom cladding and graphics.",
  },
  {
    q: "Do you build outside the UAE?",
    a: "Yes — across Saudi Arabia, Qatar, Europe, Asia, India and the United States. Design, engineering and project management stay with the Dubai team; fabrication runs through a vetted local partner network.",
  },
  {
    q: "How do I start a project?",
    a: "Message us on WhatsApp at +971 55 552 5709 or use the form below. Share your show, stand size and timeline, and a project manager comes back within one working day.",
  },
];
export const faqImage = img("project-144-logicom.webp");

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
    img: img("project-124-abu-dhabi-food-hub.webp"),
  },
  {
    title: "Exhibition Stands Are the Cathedrals of Modern Commerce",
    date: "Jan 9, 2026",
    href: "https://levoexhibitions.com/blog/exhibition-stands-are-the-cathedrals-of-modern-commerce/",
    img: img("project-008-uruguay-national-pavilion.webp"),
  },
];

export const shows = ["ADIPEC", "GITEX Global", "Gulfood", "WHX Dubai", "IDEX", "Dubai Airshow", "Beautyworld", "Intersec", "Big 5", "Arab Health"];
