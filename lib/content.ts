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
  category: string;
  img: string;
  color: string;
};

export type Project = {
  id: string;
  /** URL slug for the optional case-study page (`/projects/[slug]`). */
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  link: string;
  github?: string;
  year: string;
  /** "YYYY-MM" display date. */
  date?: string;
  /** Optional Markdown/MDX case study, rendered on the project detail page. */
  content?: string;
};

export type Experience = {
  id: string;
  company: string;
  href?: string;
  role: string;
  blurb: string;
  /** "YYYY-MM"; the list is sorted by `start` descending. */
  start: string;
  /** "YYYY-MM" or "" for present/ongoing. */
  end: string;
};

export type Principle = { index: string; title: string; description: string };

export type FeedPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  date: string;
  tags: string[];
  published: boolean;
};

// ── Identity ────────────────────────────────────────────────────────────────
export const owner = {
  name: "Daniel Fadamitan",
  handle: "dalgoridim",
  role: "Frontend Developer",
  location: "Lagos, Nigeria",
  email: "b.fadamitan2019@gmail.com",
  phone: "+234 703 4797 467",
  calendar: "https://calendly.com/b-fadamitan2019/30min",
  resume:
    "https://drive.google.com/file/d/1ixmuBYgzXQdXrTn1n9aoz4SWYRU715h-/view",
  available: true,
};

export const nav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Feed", href: "/feed" },
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

// ── Skills (3 categorized columns, mirrors the reference layout) ────────────
export type SkillGroup = { category: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      "React & Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Design Systems",
    ],
  },
  {
    category: "Mobile",
    items: ["React Native", "Flutter", "Expo", "App Store delivery"],
  },
  {
    category: "Engineering",
    items: [
      "Performance & Core Web Vitals",
      "Accessibility (a11y)",
      "Node.js APIs",
      "Git & CI/CD",
    ],
  },
];

// ── Tools (curated subset of the skill set, with devicon logos) ─────────────
export const tools: Tool[] = [
  { key: "html", name: "HTML", category: "Markup", color: "#E34F26", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { key: "tailwind-css", name: "Tailwind CSS", category: "Styling", color: "#06B6D4", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { key: "css", name: "CSS", category: "Styling", color: "#1572B6", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { key: "javascript", name: "JavaScript", category: "Language", color: "#F7DF1E", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { key: "git", name: "Git", category: "Version Control", color: "#F05032", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { key: "next-js", name: "Next.js", category: "Framework", color: "#FFFFFF", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { key: "typescript", name: "TypeScript", category: "Language", color: "#3178C6", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { key: "react", name: "React", category: "UI Library", color: "#61DAFB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { key: "react-native", name: "React Native", category: "Mobile", color: "#61DAFB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { key: "node-js", name: "Node.js", category: "Runtime", color: "#339933", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { key: "cloudinary", name: "Cloudinary", category: "Media", color: "#3448C5", img: "https://res.cloudinary.com/demo/image/upload/cloudinary_icon.png" },
  { key: "zod", name: "Zod", category: "Validation", color: "#3068B7", img: "https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg" },
  { key: "material-ui", name: "Material UI", category: "UI Kit", color: "#007FFF", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" },
  { key: "flutter", name: "Flutter", category: "Mobile", color: "#02569B", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { key: "svelte", name: "Svelte", category: "UI Framework", color: "#FF3E00", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" },
  { key: "firebase", name: "Firebase", category: "Backend", color: "#FFCA28", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { key: "graphql", name: "GraphQL", category: "API", color: "#E535AB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { key: "npm", name: "NPM", category: "Package Manager", color: "#CB3837", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
];

// ── Featured projects ───────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "airsofte",
    slug: "airsofte",
    title: "Airsofte",
    description: "Airsofte is a modern desktop arcade shooter built with Electron, Svelte 5, and TypeScript, enhanced with Google Gemini AI to create dynamic gameplay experiences. The game demonstrates how AI can intelligently augment traditional game mechanics without replacing player skill. Key AI features include real-time tactical advice, dynamic AI commentary, adaptive boss behavior, and procedural mission generation, where Gemini analyzes live game state data and generates contextual gameplay responses. The project uses a Node.js + Express backend to handle Gemini API integration while the Svelte-based frontend manages rendering, gameplay logic, and user interaction. Performance optimizations such as object pooling, spatial partitioning, and event-driven architecture allow the game to maintain 60 FPS with over 100 entities on screen. This project was developed as a submission for the Google Gemini Developer Competition, demonstrating practical AI integration in interactive gaming systems.",
    thumbnail: "https://res.cloudinary.com/dxaqtdt72/image/upload/v1773157977/portfolio/cvwnckukptcrccdihhwq.png",
    tags: ["Hackathon","Frontend"],
    link: "https://airsofte.vercel.app",
    year: "2026",
    date: "2026-01",
  },
  {
    id: "waysdrop",
    slug: "waysdrop",
    title: "Waysdrop",
    description: "Waysdrop has you covered with reliable, on-demand deliveries and real-time tracking. Send and receive packages effortlessly with friends, family, or anyone, from anywhere at any time. With Waysdrop, you can effortlessly order and request affordable deliveries fulfilled by independent couriers from anywhere, at any time. Experience the relief of real-time tracking that keeps you informed, allowing you to focus on what truly matters in your day.",
    thumbnail: "https://res.cloudinary.com/dxaqtdt72/image/upload/v1771978756/portfolio/xyxa3nerdry7p7dglp6x.png",
    tags: ["Contract","Frontend"],
    link: "https://waysdrop.com",
    year: "2026",
    date: "2026-01",
  },
  {
    id: "ecadoc-ai",
    slug: "ecadoc-ai",
    title: "Ecadoc AI",
    description: "Ecadoc AI is an intelligent document analysis platform designed for the architecture, engineering, and construction (AEC) industry. The platform transforms complex architectural drawings and blueprints into a searchable, AI-assisted workspace where teams can analyze plans, extract measurements, and collaborate directly within project documents. Key platform capabilities include AI-powered blueprint interpretation, intelligent object recognition, collaborative annotations, and real-time document insights, allowing architects, engineers, and contractors to make faster and more informed decisions during project reviews. The platform also normalizes and structures uploaded PDFs, CAD exports, and scanned drawings, ensuring sheets remain aligned and easy to analyze.",
    thumbnail: "https://res.cloudinary.com/dxaqtdt72/image/upload/v1773158922/portfolio/hld1f92uic29epjh7bms.png",
    tags: ["Contract","Frontend"],
    link: "https://app.ecadoc.ai",
    year: "2025",
    date: "2025-09",
  },
  {
    id: "web-portfolio",
    slug: "web-portfolio",
    title: "Web Portfolio",
    description: "A personal web portfolio showcasing my skills and projects using Svelte.",
    thumbnail: "https://res.cloudinary.com/dxaqtdt72/image/upload/v1771518791/portfolio/lbr5yazjgozh4esbyytu.png",
    tags: ["Freelance","Web"],
    link: "https://dantolu35.vercel.app",
    github: "https://github.com/Invalid8/web_portfolio",
    year: "2025",
    date: "2025-07",
    content: "## Overview\nThis portfolio showcases my journey as a web developer, featuring projects, skills, and testimonials. Built with Svelte, it highlights my ability to create performant and visually appealing web apps.\n\n### Features\n- **Dynamic Project Showcase:** Interactive gallery for featured projects.\n- **Testimonial Section:** Client feedback displayed with smooth animations.\n- **Responsive Layout:** Optimized for devices of all sizes.\n\n### Development Process\nI focused on minimalism and responsiveness, ensuring the portfolio reflects both creativity and professionalism. Animations were carefully designed to enhance user engagement without compromising performance.",
  },
  {
    id: "pharmaserv",
    slug: "pharmaserv",
    title: "Pharmaserv",
    description: "PharmaServ is an AI-driven engagement and field service platform designed for pharmaceutical and life-science companies to streamline sales operations, medical detailing, and healthcare professional (HCP) engagement. The platform enables pharma teams to manage field activities, track performance, and improve brand adoption through data-driven insights and automation. The system combines AI-powered analytics with omnichannel engagement tools that help medical representatives plan visits, conduct digital detailing sessions, and deliver personalized product presentations to healthcare professionals. By analyzing sales activities, prescription trends, and field interactions, PharmaServ provides actionable insights that help teams make more informed decisions and optimize their sales strategies.",
    thumbnail: "https://res.cloudinary.com/dxaqtdt72/image/upload/v1773159313/portfolio/modew2l85kivv6tcdfmt.png",
    tags: ["Contract","Frontend"],
    link: "https://ng.pharmaserv.co",
    year: "2025",
    date: "2025-07",
  },
  {
    id: "cbi-news",
    slug: "cbi-news",
    title: "CBI News",
    description: "A high-performance multimedia news application built for CBI Digital Media to deliver verified, real-time journalism to a global audience with a focus on the African continent. This digital-first platform serves as a premier destination for credible reporting, engineered to reclaim the African narrative through high-integrity, fact-checked storytelling. The application is built to provide a \"clean reading experience,\" featuring a sleek, intuitive interface that prioritizes readability and user engagement. It leverages a smart personalization system that allows users to tailor their feeds, follow specific categories like Politics or Tech, and receive timely alerts on breaking stories.",
    thumbnail: "https://res.cloudinary.com/dxaqtdt72/image/upload/v1771979502/portfolio/o3lorfa6syfutgctr2db.png",
    tags: ["Contract","Frontend Engineer"],
    link: "https://cbinews.tv",
    year: "2025",
    date: "2025-07",
  },
  {
    id: "web3-landing",
    slug: "web3-landing",
    title: "Web3 Landing",
    description: "An angular developed web3 landing page.",
    thumbnail: "/images/web3-landing.png",
    tags: ["Vibe Code","Frontend"],
    link: "https://web3-portfolio-three.vercel.app/",
    github: "https://github.com/invalid8/web3-portfolio",
    year: "2025",
    date: "2025-03",
    content: "### About Web3 Landing\nWeb3 landing page is angular developed",
  },
  {
    id: "irunner-app",
    slug: "irunner-app",
    title: "iRunner App",
    description: "The iRunner connects you with trusted runners for all your errands. Whether you need groceries, deliveries, or any other task handled, our advanced AI instantly matches you with a reliable runner. \n\nEnjoy real‑time tracking, secure payments, and a seamless experience anytime, anywhere. Get things done faster with fast, secure, and reliable runners.",
    thumbnail: "https://res.cloudinary.com/dxaqtdt72/image/upload/v1771978557/portfolio/lmvvqfjoriu7d9xyds2p.png",
    tags: ["Contract","Mobile"],
    link: "https://play.google.com/store/apps/details?id=com.instarunners",
    year: "2025",
    date: "2025-01",
  },
  {
    id: "pollproxy",
    slug: "pollproxy",
    title: "Pollproxy",
    description: "A Svelte-based polling application for quick and interactive polls.",
    thumbnail: "/images/pollproxy.png",
    tags: ["Challenge","Fullstack"],
    link: "https://pollproxy.vercel.app",
    github: "https://github.com/invalid8/ninjapolls",
    year: "2024",
    date: "2024-06",
    content: "### About Pollproxy\nPollproxy is a dynamic web application designed to enable users to create and participate in interactive polls seamlessly. Built using **Svelte**, the project focuses on delivering a lightweight yet powerful experience for real-time polling.\n\n#### Features:\n- **Real-time Updates**: Powered by WebSockets for instant results.\n- **User-friendly Interface**: Simplistic and intuitive design for easy navigation.\n- **Responsive Design**: Fully optimized for both mobile and desktop users.\n\n#### My Role:\nAs a **Fullstack Developer**, I:\n- Designed the backend to handle high concurrency and real-time data sync.\n- Implemented a WebSocket-based architecture for seamless communication.\n- Ensured cross-browser compatibility and responsive UI.",
  },
  {
    id: "haza-wallet",
    slug: "haza-wallet",
    title: "Haza Wallet",
    description: "A dashboard application for managing payments and financial data.",
    thumbnail: "/images/haza-wallet.png",
    tags: ["Contract","Frontend"],
    link: "https://haza-wallet.vercel.app/",
    year: "2024",
    date: "2024-05",
    content: "### About Haza Wallet\nHaza Wallet is a comprehensive financial dashboard built for businesses and individuals to efficiently manage their payment records and financial insights.\n\n#### Features:\n- **Transaction Management**: Visualize and manage all transactions in one place.\n- **Data Insights**: Interactive charts and analytics for better decision-making.\n- **User Management**: Role-based access for admins and users.\n\n#### My Role:\nAs a **Frontend Developer**, I:\n- Developed the UI using **React.js** and integrated it with a secure backend.\n- Worked on responsive design principles to ensure accessibility across devices.\n- Utilized **TailwindCSS** to achieve a sleek, modern design.",
  },
  {
    id: "campus-talks",
    slug: "campus-talks",
    title: "Campus Talks",
    description: "A platform for hosting and sharing educational talks and events.",
    thumbnail: "/images/campus-talks.png",
    tags: ["Hackathon","Fullstack"],
    link: "https://campus-talks.vercel.app",
    year: "2024",
    date: "2024-05",
    content: "### About Campus Talks\nCampus Talks is an interactive platform designed to bridge the gap between educators and students by hosting and sharing educational talks and events.\n\n#### Features:\n- **Event Scheduling**: Organize talks with specific dates and times.\n- **Live Sessions**: Support for hosting live interactive talks.\n- **Community Engagement**: Tools for questions and discussions during events.\n\n#### My Role:\nAs the **Lead Developer**, I:\n- Oversaw the entire development process from design to deployment.\n- Built scalable REST APIs to support real-time functionality.\n- Optimized the app for low-latency live streaming.",
  },
  {
    id: "how-to-center-a-div",
    slug: "how-to-center-a-div",
    title: "How to Center a Div",
    description: "A simple guide application demonstrating various ways to center a div.",
    thumbnail: "https://placehold.co/800x400/343A40/FFFFFF?text=How+to+Center+a+Div",
    tags: ["Challenge","Frontend"],
    link: "https://how-to-center-a-div.vercel.app",
    github: "https://github.com/invalid8/how-to-center-a-div",
    year: "2024",
    date: "2024-03",
    content: "### About How to Center a Div\nThis project is an educational resource aimed at teaching developers how to center a div using various **CSS techniques**.\n\n#### Features:\n- **Interactive Code Examples**: Users can try out different centering methods.\n- **Browser Compatibility Notes**: Tips for handling edge cases in different browsers.\n- **Beginner-Friendly**: Written in simple language for new developers.\n\n#### My Role:\nAs a **Frontend Developer**, I:\n- Designed the UI to be clean and accessible.\n- Wrote interactive components for live CSS previews.\n- Focused on fast load times and simplicity.](https://github.com/invalid8/how-to-center-a-div)",
  },
  {
    id: "turbo-analytics",
    slug: "turbo-analytics",
    title: "Turbo Analytics",
    description: "A lightweight analytics dashboard for monitoring data metrics.",
    thumbnail: "/images/turbo.png",
    tags: ["Freelance","Frontend"],
    link: "https://analytics-blond.vercel.app",
    github: "https://github.com/invalid8/analytics",
    year: "2024",
    date: "2024-02",
    content: "### About Turbo Analytics\nTurbo Analytics is a web-based analytics tool designed for small to medium-sized projects that require simple and actionable data insights.\n\n#### Features:\n- **Data Visualizations**: Charts and graphs powered by **Chart.js**.\n- **Lightweight Design**: Focused on delivering performance and clarity.\n- **Customizable Widgets**: Allows users to personalize their dashboards.\n\n#### My Role:\nAs a **Frontend Developer**, I:\n- Created dynamic, interactive widgets using React.js.\n- Worked with **REST APIs** to fetch real-time data.\n- Ensured the app adhered to accessibility standards.cs)",
  },
  {
    id: "reader-x",
    slug: "reader-x",
    title: "Reader X",
    description: "A frontend beta for a manga reading platform with search and display features.",
    thumbnail: "/images/reader-x.png",
    tags: ["Challenge","Frontend"],
    link: "https://readerx.vercel.app",
    year: "2024",
    date: "2024-02",
    content: "## Overview\nReader X is a beta platform catering to manga enthusiasts. It focuses on delivering a seamless reading experience with advanced search functionality and optimized layouts for various screen sizes.\n\n### Features\n- **Search Engine:** Instant search results for manga titles and authors.\n- **Responsive Reader:** Ensures a smooth reading experience on all devices.\n- **Bookmarking System:** Allows users to save their progress and favorite manga.\n\n### Contributions\nAs the frontend developer, I prioritized user experience and accessibility, ensuring intuitive navigation and fast load times for media-rich content.",
  },
  {
    id: "tacky-fruits",
    slug: "tacky-fruits",
    title: "Tacky Fruits",
    description: "A colorful showcase of fruits with quirky and engaging designs.",
    thumbnail: "/images/tacky.png",
    tags: ["Challenge","Fullstack"],
    link: "https://tackyfruits.vercel.app",
    year: "2024",
    date: "2024-01",
    content: "## Overview\nTacky Fruits is a playful project designed to experiment with animation and creative illustrations. It combines artistic design with interactive elements to create an engaging user experience.\n\n### Features\n- **Vibrant Animations:** Brings fruits to life with creative motion effects.\n- **Interactive Elements:** Allows users to interact with the designs through clicks and hover actions.\n- **Custom Illustrations:** Unique, hand-drawn fruit designs that stand out.\n\n### Purpose\nThis project was an exercise in pushing the boundaries of CSS and JavaScript animations, while also exploring design-driven development.",
  },
];

// ── Experience timeline (replaces the reference's testimonials slot) ────────
export const experiences: Experience[] = [
  {
    id: "1",
    company: "TheGigs",
    href: "https://thegigs.co",
    role: "Frontend Developer",
    blurb: "Architect and maintain scalable frontend systems using modern frameworks, ensuring optimal performance and seamless user experiences for The Gigs platform.",
    start: "2024-05",
    end: "2025-01",
  },
  {
    id: "2",
    company: "Hynitr",
    role: "Frontend Developer",
    blurb: "Created and maintained a scalable component library using React and TypeScript, significantly reducing development time across multiple projects.",
    start: "2024-02",
    end: "2024-04",
  },
  {
    id: "3",
    company: "Upwork",
    href: "https://www.upwork.com",
    role: "Frontend Developer",
    blurb: "Developed high-quality web applications as a freelancer, focusing on e-commerce platforms, SEO optimization, and single-page applications for a diverse range of clients.",
    start: "2020-01",
    end: "2023-01",
  },
  {
    id: "4",
    company: "Integrity Ventures",
    role: "Frontend Developer",
    blurb: "Led the development of responsive and user-friendly websites, ensuring cross-browser compatibility and seamless user experiences.",
    start: "2019-01",
    end: "2020-01",
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

export const feedPosts: FeedPost[] = [
  {
    id: "why-feed",
    title: "Why I call this a feed",
    slug: "why-i-call-this-a-feed",
    excerpt:
      "Not every thought needs to become a serious essay. This is where the useful, unfinished, and occasionally unserious things go.",
    date: "2026-06-22",
    tags: ["Meta", "Notes"],
    published: true,
    body: `# Why I call this a feed

A blog sounds organised. A **feed** can breathe.

Some posts here will be detailed engineering notes. Others might be a quick observation, something I learned while shipping, or an idea that is not ready to wear a suit yet.

That is the point: serious work, unserious thoughts, and the useful space between them.

## What belongs here

- Frontend and product engineering notes
- Things I learned the hard way
- Small experiments
- Opinions that may age badly

If it came from my work or my curiosity, it belongs in the feed.`,
  },
];

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

// PLACEHOLDER copy — replace with real client quotes (editable inline once
// the section is wired to a collection). Kept realistic so the layout reads true.
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Daniel turned a vague brief into a fast, polished site in days. Clear communication and the details were spot on.",
    name: "Aisha Bello",
    role: "Founder, Lumen Studio",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "The build was accessible, quick, and exactly on spec. He flagged problems early and shipped without drama.",
    name: "Tunde Okafor",
    role: "Product Lead, Paystack-adjacent",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Rare to find someone who cares this much about both the code and the craft. Our Lighthouse scores jumped.",
    name: "Maria Santos",
    role: "Design Director, Northwind",
    rating: 5,
  },
];

// PLACEHOLDER copy — replace with real answers.
export const faqs: FaqItem[] = [
  {
    id: "f1",
    question: "What kind of projects do you take on?",
    answer:
      "Marketing sites, web apps, and design-system work — mostly React/Next.js front-ends where performance and accessibility matter.",
  },
  {
    id: "f2",
    question: "How do you charge?",
    answer:
      "Fixed-price per milestone for defined scopes, or a weekly rate for ongoing work. I'll recommend whichever fits the project after a quick call.",
  },
  {
    id: "f3",
    question: "What's your typical timeline?",
    answer:
      "A focused landing page is about a week; a full multi-page site or app is usually three to six weeks depending on scope.",
  },
  {
    id: "f4",
    question: "Do you work with existing teams?",
    answer:
      "Yes — I drop into existing codebases and design systems regularly, and I'm comfortable pairing with designers and back-end engineers.",
  },
  {
    id: "f5",
    question: "Will I be able to edit the site myself?",
    answer:
      "Absolutely. I build with inline editing so you can update copy and images directly on the live site, no dashboard required.",
  },
  {
    id: "f6",
    question: "How do we get started?",
    answer:
      "Send a short note about what you're building. I'll reply within a day and we'll take it from there.",
  },
];
