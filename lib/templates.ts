// The editions of the site, listed on the index page (/). One entry per edition: add a line here (and a thumbnail in
// public/templates/) when a new one is made. Thumbnails are the top of each, captured at 1440 × 810.
//
// `styles`: the design and animation styles an edition is built from, one short tag each. The same style carries the
// same wording wherever it recurs, so editions can be compared by eye.
export type Template = {
  href: string;
  name: string;
  tag: string; // where it stands
  summary: string;
  styles: string[];
  img: string;
};

export const templates: Template[] = [
  {
    href: "/home",
    name: "Home",
    tag: "Working copy",
    summary:
      "The edition under development: Levo's own design with Europe-focused content, extended with sections from the other editions and a closing L transition into the footer.",
    styles: [
      "Smooth inertial scroll",
      "Script-line curtain preloader",
      "Glitch wordmark over video",
      "Ruled column grid",
      "3D word-cube scroll scene",
      "Sticky photo cross-fade",
      "Self-drawing blueprint background",
      "Zooming 3×3 project grid",
      "Staggered rows, pinned pair",
      "Photo follows the pointer",
      "Word-by-word quote highlight",
      "Logo L zooms into the footer",
    ],
    img: "/templates/home.jpg",
  },
  {
    href: "/home1",
    name: "Home 1",
    tag: "First edition",
    summary: "The first edition and the fullest run of sections, from a video hero through case studies and reviews to the team.",
    styles: [
      "Script-line curtain preloader",
      "Glitch wordmark over video",
      "Ruled column grid",
      "Stacking case-study cards",
      "L-shaped photo reveal",
      "Sticky scroll-linked steps",
      "Word-by-word quote highlight",
      "Counting figures",
      "Scroll-filled timeline",
      "Scrolling logo strip",
    ],
    img: "/templates/home1.jpg",
  },
  {
    href: "/home2",
    name: "Home 2",
    tag: "Layout study",
    summary: "A photo-led edition: a preloader that opens into a pinned hero with sliding cards, then a short run of large, quiet sections.",
    styles: [
      "Smooth inertial scroll",
      "Full-bleed photo hero",
      "Initials-to-photo preloader",
      "Pinned hero, sliding cards",
      "Pointer-trailing “Explore” cursor",
      "Sliding underline links",
      "Image wipe on scroll",
      "Staggered rows, pinned pair",
      "Sticky photo cross-fade",
      "Rolling stage numbers",
      "Timed quote slider",
      "Photo follows the pointer",
    ],
    img: "/templates/home2.jpg",
  },
  {
    href: "/home3",
    name: "Home 3",
    tag: "Layout study",
    summary: "A grid-and-wordmark edition built around a 3D word-cube scene, with a rail of services and a globe of the markets served.",
    styles: [
      "Smooth inertial scroll",
      "Count-up layered loader",
      "Giant letter-rise wordmark",
      "Hairline grid, tick-mark navigation",
      "Invert-colour switch",
      "3D word-cube scroll scene",
      "Verbs sliding in on scroll",
      "Parallax columns",
      "Service rail with a light window",
      "Accordion process",
      "Draggable dotted globe",
      "Logo L grows into the contact page",
    ],
    img: "/templates/home3.jpg",
  },
  {
    href: "/home4",
    name: "Home 4",
    tag: "Newest",
    summary: "A bold dark-and-white edition with a floating header and a custom cursor.",
    styles: [
      "Smooth inertial scroll",
      "Script-line curtain preloader",
      "Header that hides on scroll",
      "Blend-mode cursor with labels",
      "Side rails with a scroll dot",
      "Bold Poppins type",
      "Brush-stroke highlight",
      "Word-by-word statement",
      "Falling, draggable tags",
      "Drag-to-change quote slider",
      "Photo follows the pointer",
      "3D word-cube scroll scene",
      "Blue wash on card hover",
    ],
    img: "/templates/home4.jpg",
  },
];
