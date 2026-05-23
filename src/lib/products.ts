export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  cat: "tote" | "tshirt";
  color: "black" | "cream" | "white";
  accent: string;
  isNew: boolean;
  tags: string[];
  /**
   * Optional product photo path, e.g. "/products/save-me.jpg".
   * Drop the file into /public/products/ and set this field.
   * Omit (or leave undefined) to render the branded SVG fallback.
   * See /public/products/README.md for details.
   */
  image?: string;
};

/** Shared placeholder used when you want all products to show the same fill image. */
export const PLACEHOLDER_IMAGE = "/products/placeholder.svg";

/** Build a /public path to a product photo inside images_with_yellow_bg. */
const IMG = (filename: string) =>
  `/products/images_with_yellow_bg/${encodeURIComponent(filename)}`;

export const products: Product[] = [
  {
    id: "1",
    name: "Save Me. JPG or PDF?",
    tagline: "For everyone trapped in \"just one more revision\" hell. Comic-book scream energy, printed loud.",
    price: 1850,
    cat: "tote",
    color: "cream",
    accent: "#7c4dff",
    isNew: true,
    tags: ["tech", "office", "design"]
  },
  {
    id: "2",
    name: "Gen ZZZZZzz",
    tagline: "Sleep is the personality. Born tired, staying iconic. Bas screen time low rakho.",
    price: 1750,
    cat: "tote",
    color: "cream",
    accent: "#5b9bd5",
    isNew: true,
    tags: ["gen-z", "lazy"]
  },
  {
    id: "3",
    name: "Tension Lene Ka Nahi Dene Ka",
    tagline: "The absolute law of the land. Desi street wisdom, printed for peace of mind.",
    price: 1800,
    cat: "tote",
    color: "cream",
    accent: "#4dd0c4",
    isNew: false,
    tags: ["wisdom", "classic"]
  },
  {
    id: "4",
    name: "All I Need is LOVE bohot paisa",
    tagline: "Love is cute, but have you tried paying rent in Karachi? Paisa sub kuch hai.",
    price: 1850,
    cat: "tote",
    color: "cream",
    accent: "#FF7A00",
    isNew: false,
    tags: ["relatable", "money"]
  },
  {
    id: "5",
    name: "National Food of Pakistan, Kasam",
    tagline: "We're not saying it's biryani. But we're not saying it's not. Kasam khao.",
    price: 1950,
    cat: "tote",
    color: "cream",
    accent: "#d4f062",
    isNew: true,
    tags: ["food", "pride", "desi"]
  },
  {
    id: "6",
    name: "Haye Garmi",
    tagline: "Karachi summer pain, externalised. Carry it on your shoulder and let everyone know.",
    price: 1800,
    cat: "tote",
    color: "cream",
    accent: "#FFD600",
    isNew: true,
    tags: ["karachi", "weather", "relatable"]
  },
  {
    id: "7",
    name: "Hooshiyaar",
    tagline: "A warning. A blessing. A whole personality on one cream tote.",
    price: 1800,
    cat: "tote",
    color: "cream",
    accent: "#7c4dff",
    isNew: false,
    tags: ["wisdom", "vibe"]
  },
  {
    id: "8",
    name: "From Another POV",
    tagline: "Same situation. Different angle. Built for the chronically reflective.",
    price: 1850,
    cat: "tote",
    color: "cream",
    accent: "#5b9bd5",
    isNew: true,
    tags: ["meta", "thinky"]
  },
  {
    id: "9",
    name: "Mein Apni Favourite Hoon",
    tagline: "The official self-love manifesto. Worn by people with main-character syndrome (us).",
    price: 1900,
    cat: "tote",
    color: "cream",
    accent: "#FF7A00",
    isNew: true,
    tags: ["self-love", "iconic"]
  },
  {
    id: "10",
    name: "Mein Apni Favourite Hoon — v2",
    tagline: "Same energy, on a tee. So now the whole room sees the affirmation before you walk in.",
    price: 2400,
    cat: "tshirt",
    color: "cream",
    accent: "#d4f062",
    isNew: true,
    tags: ["self-love", "iconic"]
  },
  {
    id: "11",
    name: "You Look Really Weird With Your Head Doing That",
    tagline: "The intrusive thought in tote form. Polite, precise, slightly cursed.",
    price: 1900,
    cat: "tote",
    color: "cream",
    accent: "#4dd0c4",
    isNew: false,
    tags: ["weird", "funny"]
  },
  {
    id: "12",
    name: "Pi Pi Ka Hisaab Loonga",
    tagline: "Every chai. Every Coke. Every kharcha. The accountant inside you, finally heard.",
    price: 1800,
    cat: "tote",
    color: "cream",
    accent: "#FFD600",
    isNew: false,
    tags: ["money", "desi", "classic"]
  },
  {
    id: "13",
    name: "Pi Pi Ka Hisaab Loonga — v2",
    tagline: "Now on a tee, in case the message needs to be louder. (It does.)",
    price: 2400,
    cat: "tshirt",
    color: "cream",
    accent: "#7c4dff",
    isNew: true,
    tags: ["money", "desi"]
  },
  {
    id: "14",
    name: "Dead Inside",
    tagline: "The truth, in cotton form. Wear it Monday so HR knows.",
    price: 2300,
    cat: "tshirt",
    color: "cream",
    accent: "#5b9bd5",
    isNew: false,
    tags: ["mood", "office"]
  },
  {
    id: "15",
    name: "I Hate Programming. It Works. I Love It.",
    tagline: "Every dev's emotional arc, compressed into one shirt. Stack-overflow approved.",
    price: 2500,
    cat: "tshirt",
    color: "cream",
    accent: "#d4f062",
    isNew: true,
    tags: ["tech", "dev", "relatable"]
  },
  {
    id: "16",
    name: "No Thanks, I Use AI",
    tagline: "2026's flex. Worn ironically. Or not. We're not asking.",
    price: 2400,
    cat: "tshirt",
    color: "cream",
    accent: "#FF7A00",
    isNew: true,
    tags: ["tech", "ai", "meta"]
  },
  {
    id: "17",
    name: "Teachers Be Like: Everything is Just Fine",
    tagline: "The smile that hides the syllabus deadline. For every miss/sir surviving the term.",
    price: 2400,
    cat: "tshirt",
    color: "cream",
    accent: "#4dd0c4",
    isNew: false,
    tags: ["school", "relatable"]
  },
  {
    id: "18",
    name: "Teacher Stuff",
    tagline: "Marker, register, chai, sanity. Built to carry all four. Mostly the last one.",
    price: 1900,
    cat: "tote",
    color: "cream",
    accent: "#7c4dff",
    isNew: false,
    tags: ["school", "teacher"]
  },
  {
    id: "19",
    name: "What the Fat-Free Nihari",
    tagline: "A crime against nihari. A great shirt though. Wear it to spite your nutritionist.",
    price: 2400,
    cat: "tshirt",
    color: "cream",
    accent: "#FFD600",
    isNew: true,
    tags: ["food", "desi", "funny"]
  },
  {
    id: "custom-tshirt",
    name: "Custom Graphic Tee",
    tagline: "Your own print. Designed by you in our interactive studio.",
    price: 2600,
    cat: "tshirt",
    color: "black",
    accent: "#d4f062",
    isNew: true,
    tags: ["custom", "interactive"],
    image: "/products/Plain Black T Shirt.jpg"
  }
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export type TiltedGridItem = {
  id: string;
  src: string;
  name: string;
};

export function productsForTiltedGrid(): TiltedGridItem[] {
  return products.map((p) => ({
    id: p.id,
    src: p.image ?? PLACEHOLDER_IMAGE,
    name: p.name,
  }));
}
