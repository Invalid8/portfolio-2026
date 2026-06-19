/**
 * Typed site content for portfolio-2026.
 *
 * Phase 3 consumes these objects directly (static page). Phase 4 reuses the
 * same shapes for the Postgres seed + CMS reads, so keep them serializable.
 *
 * Owner content is real (Daniel Fadamitan / dalgoridim), mined from
 * portfolio-2025. Replace freely via the live CMS once wired.
 */

export type NavLink = { label: string; href: string };

export type Social = { name: string; label: string; href: string };

export type Stat = { value: string; label: string };

export type Service = {
  index: string;
  title: string;
  description: string;
};

export type Tool = {
  key: string;
  name: string;
  img: string;
  color: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  link: string;
  github?: string;
  year: string;
};

export type Experience = {
  id: string;
  company: string;
  href?: string;
  role: string;
  blurb: string;
  period: string;
};

export type Principle = { index: string; title: string; description: string };

// ── Identity ────────────────────────────────────────────────────────────────
export const owner = {
  name: "Daniel Fadamitan",
  handle: "dalgoridim",
  role: "Frontend Developer",
  location: "Lagos, Nigeria",
  email: "b.fadamitan2019@gmail.com",
  phone: "+234 703 4797 467",
  resume:
    "https://drive.google.com/file/d/1ixmuBYgzXQdXrTn1n9aoz4SWYRU715h-/view",
  available: true,
};

export const nav: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const socials: Social[] = [
  { name: "GitHub", label: "GH", href: "https://github.com/Invalid8" },
  {
    name: "LinkedIn",
    label: "LI",
    href: "https://www.linkedin.com/in/daniel-fadamitan-a08052247",
  },
  { name: "Twitter", label: "X", href: "https://x.com/D_Invalid1" },
];

// ── Hero ──────────────────────────────────────────────────────────────────
export const hero = {
  // Rendered two-tone; the bracketed words get the accent/muted treatment.
  headlineLead: "Daniel builds",
  headlineAccent: "accessible, fast",
  headlineTail: "web experiences people actually enjoy.",
  subtitle:
    "A Nigeria-based frontend developer turning complex problems into clean, user-friendly interfaces with React, Next.js, and TypeScript.",
};

// ── About / intro ───────────────────────────────────────────────────────────
export const about = {
  leading:
    "I'm a frontend developer based in Nigeria with a strong Computer Science foundation. I specialise in building accessible, user-friendly web applications - with a particular focus on React.js, React Native, Next.js, and TypeScript.",
  trailing:
    "When I'm not coding, I'm gaming (currently Mobile Legends) and digging into new tech to stay sharp. Always curious, always shipping.",
};

// ── Stats ─────────────────────────────────────────────────────────────────
export const stats: Stat[] = [
  { value: "5+", label: "Years building for the web" },
  { value: "20+", label: "Projects shipped" },
  { value: "2", label: "Hackathons won" },
];

// ── Skills & Services ───────────────────────────────────────────────────────
export const services: Service[] = [
  {
    index: "01",
    title: "Frontend Engineering",
    description:
      "Production React & Next.js apps with TypeScript - component systems, state, and data fetching built to scale.",
  },
  {
    index: "02",
    title: "Mobile Development",
    description:
      "Cross-platform apps with React Native and Flutter that share a codebase without feeling like a compromise.",
  },
  {
    index: "03",
    title: "Performance & Accessibility",
    description:
      "Fast, inclusive interfaces - semantic markup, Core Web Vitals, and keyboard/screen-reader support baked in.",
  },
  {
    index: "04",
    title: "Design to Code",
    description:
      "Faithful translation of Figma into responsive, pixel-considered UI with Tailwind and a clean design system.",
  },
];

// ── Tools (curated subset of the skill set, with devicon logos) ─────────────
export const tools: Tool[] = [
  { key: "typescript", name: "TypeScript", color: "#3178C6", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { key: "react", name: "React", color: "#61DAFB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { key: "nextjs", name: "Next.js", color: "#FFFFFF", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { key: "tailwind", name: "Tailwind CSS", color: "#06B6D4", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { key: "react-native", name: "React Native", color: "#61DAFB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { key: "flutter", name: "Flutter", color: "#02569B", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { key: "node", name: "Node.js", color: "#339933", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { key: "svelte", name: "Svelte", color: "#FF3E00", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" },
  { key: "graphql", name: "GraphQL", color: "#E535AB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { key: "figma", name: "Figma", color: "#F24E1E", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { key: "git", name: "Git", color: "#F05032", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { key: "firebase", name: "Firebase", color: "#FFCA28", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
];

// ── Featured projects ───────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "pollproxy",
    title: "Pollproxy",
    description:
      "A Svelte-based realtime polling app - create a poll, share it, watch results update live over WebSockets.",
    thumbnail: "/images/pollproxy.png",
    tags: ["Svelte", "WebSockets", "Fullstack"],
    link: "https://pollproxy.vercel.app",
    github: "https://github.com/invalid8/ninjapolls",
    year: "2024",
  },
  {
    id: "haza-wallet",
    title: "Haza Wallet",
    description:
      "A financial dashboard for managing payments and insights - transactions, analytics, and role-based access.",
    thumbnail: "/images/haza-wallet.png",
    tags: ["React", "Tailwind", "Dashboard"],
    link: "https://haza-wallet.vercel.app/",
    year: "2024",
  },
  {
    id: "campus-talks",
    title: "Campus Talks",
    description:
      "A platform for hosting and sharing educational talks - scheduling, live sessions, and community Q&A.",
    thumbnail: "/images/campus-talks.png",
    tags: ["Fullstack", "Live", "Hackathon"],
    link: "https://campus-talks.vercel.app",
    year: "2024",
  },
  {
    id: "turbo",
    title: "Turbo Analytics",
    description:
      "A lightweight analytics dashboard with customisable widgets and Chart.js visualisations for small teams.",
    thumbnail: "/images/turbo.png",
    tags: ["React", "Chart.js", "REST"],
    link: "https://analytics-blond.vercel.app",
    github: "https://github.com/invalid8/analytics",
    year: "2024",
  },
  {
    id: "reader-x",
    title: "Reader X",
    description:
      "A manga reading beta focused on a smooth reader - instant search, responsive layouts, and bookmarking.",
    thumbnail: "/images/reader-x.png",
    tags: ["Frontend", "Search", "UX"],
    link: "https://readerx.vercel.app",
    year: "2024",
  },
  {
    id: "web3-landing",
    title: "Web3 Landing",
    description:
      "An Angular-built web3 landing page - motion-led marketing site with a crisp, modern aesthetic.",
    thumbnail: "/images/web3-landing.png",
    tags: ["Angular", "Landing", "Motion"],
    link: "https://web3-portfolio-three.vercel.app/",
    github: "https://github.com/invalid8/web3-portfolio",
    year: "2025",
  },
];

// ── Experience timeline (replaces the reference's testimonials slot) ────────
export const experiences: Experience[] = [
  {
    id: "thegigs",
    company: "TheGigs",
    href: "https://thegigs.co",
    role: "Frontend Developer",
    blurb:
      "Architected and maintained scalable frontend systems with modern frameworks, keeping performance and UX sharp across the platform.",
    period: "May 2024 - Jan 2025",
  },
  {
    id: "hynitr",
    company: "Hynitr",
    role: "Frontend Developer",
    blurb:
      "Built and maintained a scalable React + TypeScript component library, cutting development time across multiple projects.",
    period: "Feb 2024 - Apr 2024",
  },
  {
    id: "upwork",
    company: "Upwork (Freelance)",
    href: "https://www.upwork.com",
    role: "Frontend Developer",
    blurb:
      "Delivered e-commerce platforms, SPAs, and SEO-focused sites for a diverse range of clients as an independent developer.",
    period: "2020 - 2023",
  },
  {
    id: "integrity",
    company: "Integrity Ventures",
    role: "Frontend Developer",
    blurb:
      "Led development of responsive, cross-browser websites with a focus on clean, seamless user experiences.",
    period: "2019 - 2020",
  },
];

// ── How I work (replaces the reference's FAQ slot) ──────────────────────────
export const principles: Principle[] = [
  {
    index: "01",
    title: "Accessible by default",
    description:
      "Semantic markup, real keyboard support, and screen-reader care aren't an afterthought - they're the baseline.",
  },
  {
    index: "02",
    title: "Performance is a feature",
    description:
      "I sweat bundle size, Core Web Vitals, and perceived speed, because a fast interface is a usable one.",
  },
  {
    index: "03",
    title: "Ship, then refine",
    description:
      "I get something real in front of people early, then iterate with feedback instead of polishing in the dark.",
  },
];

export const contact = {
  title: "Let's work together",
  subtitle:
    "Have a project in mind? Tell me what you're building - I'll reply within a day.",
};

// ── Optional sections, built but NOT mounted yet (no source data) ──────────
// Wire these into app/page.tsx once real content exists.
export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
};

export type FaqItem = { id: string; question: string; answer: string };

export const testimonials: Testimonial[] = [];

export const faqs: FaqItem[] = [];
