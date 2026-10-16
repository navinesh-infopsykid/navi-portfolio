/* ──────────────────────────────────────────────────────────────
   ALL PORTFOLIO CONTENT LIVES IN THIS FILE.
   Edit text here; the components never need to change.

   Media: put files in  public/media/<project-id>/  and reference
   them as "media/<project-id>/file.webp". Videos: .mp4 (H.264),
   keep each under ~10 MB. YouTube links also work (type "youtube").
   A project with no media gets a clean typographic cover instead.
   ────────────────────────────────────────────────────────────── */

export const profile = {
  name: "Navineshraj R",
  title: "Full-stack engineer",
  location: "Bangalore, India",
  email: "inavineshraj@gmail.com",
  github: "https://github.com/navinesh-infopsykid",
  linkedin: "https://www.linkedin.com/in/navineshrajr/",
  linkedinLabel: "in/navineshrajr",
  resume: "", // e.g. "media/Navineshraj-R-Resume.pdf" (leave "" to hide the button)
  available: true,
  intro:
    "I'm a software engineer at Trudosys, and I build complete products: the database schema, the API, the screen people use, and the pipeline that ships it. React, TypeScript, Node.js and Flutter are my everyday tools.",
  about: [
    "I joined Trudosys in 2023 and was promoted from SDE-L1 to SDE-L2 in 18 months. I was the only frontend engineer on a CRM that went from an empty repo to production, built two Flutter apps people use every day, and set up the CI/CD pipelines the team still relies on.",
    "Outside work I build products end to end on my own. Navora is a billing and inventory system for a patisserie, running on Cloud Run with PostgreSQL. NavTracker is the study planner I open every morning. I also run sprints as Scrum Master and mentor junior engineers.",
  ],
  facts: [
    { value: "3+", label: "years shipping production software" },
    { value: "7", label: "products built across web and mobile" },
    { value: "18 mo", label: "from SDE-L1 to SDE-L2" },
    { value: "~40%", label: "faster code reviews after mentoring" },
  ],
};

/* ─── PROJECTS ─────────────────────────────────────────────── */

export type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; webm?: string; poster?: string; alt: string }
  | { type: "youtube"; id: string; alt: string };

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  /** Short descriptor shown under the title */
  kind: string;
  summary: string;
  role: string;
  year: string;
  /** What you built / what it achieved: 3 to 5 short lines */
  highlights: string[];
  stack: string[];
  media: MediaItem[];
  links?: ProjectLink[];
  /** Featured projects get a full case-study row; others go in the compact list */
  featured: boolean;
  /** Optional small tag on the media, e.g. "Demo data" */
  mediaNote?: string;
}

export const projects: Project[] = [
  {
    id: "navora",
    title: "Navora",
    kind: "Billing and inventory for a small food business",
    summary:
      "Counter billing, stock and sales reporting for a patisserie. Staff bill dine-in, takeaway and delivery orders in seconds, stock can never be oversold, and invoices go to customers as PDFs on WhatsApp.",
    role: "Solo full-stack build",
    year: "2026",
    highlights: [
      "Cut the time to save a bill from 3.08 s to 0.33 s by removing most of the 23 database round trips per bill, pooling connections and moving the database next to the shop",
      "Each bill saves in one transaction with conditional stock updates, so two counters billing at once can't oversell",
      "Money is stored as whole paise and every total is recalculated on the server, so prices can't be changed from the browser",
      "Invoice PDFs, split payments, held bills, packaging rules and a sales dashboard by day, week or financial year",
      "Owner and staff logins with hashed passwords, httpOnly sessions and rate limiting, plus 98 automated tests",
    ],
    stack: ["React 19", "TypeScript", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Prisma", "Zod", "Vitest", "Docker", "Cloud Run"],
    media: [
      { type: "video", src: "media/navora/demo.mp4", webm: "media/navora/demo.webm", poster: "media/navora/dashboard.webp", alt: "Navora walkthrough: billing a takeaway order, then the dashboard and invoice search" },
      { type: "image", src: "media/navora/dashboard.webp", alt: "Navora dashboard with sales, payments by method, order types and low-stock items" },
      { type: "image", src: "media/navora/billing.webp", alt: "New bill screen with a delivery order, packaging charges and split payment" },
      { type: "image", src: "media/navora/invoices.webp", alt: "Invoice list with date filters, search and paid or unpaid status" },
      { type: "image", src: "media/navora/invoice-detail.webp", alt: "Invoice detail with PDF download and WhatsApp sharing" },
    ],
    links: [{ label: "Source code", href: "https://github.com/navinesh-infopsykid/navora" }],
    featured: true,
    mediaNote: "Demo data",
  },
  {
    id: "navtracker",
    title: "NavTracker",
    kind: "Study and career-prep planner",
    summary:
      "Turns a 12-week learning plan into daily targets, tasks and revision, then shows honestly whether I'm on pace. It runs on my own machine and installs on my phone as a home-screen app.",
    role: "Personal project, full stack",
    year: "2026",
    highlights: [
      "Weekly planner that compares time left with work left, carries unfinished tasks over and pulls work in from next week",
      "Recovery plan: after missed days it spreads overdue tasks across the next working days, capped at an extra hour a day",
      "DSA tracker with spaced revision at 1, 3, 7, 14, 30 and 60 days, and interview practice weighted toward weak answers",
      "Dashboard with activity rings, streaks, XP levels, a consistency heatmap and daily, weekly and monthly charts",
      "26 API routes with every input validated by Zod, backed by Prisma and SQLite",
    ],
    stack: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Prisma", "SQLite", "Zod", "Recharts"],
    media: [
      { type: "video", src: "media/navtracker/demo.mp4", webm: "media/navtracker/demo.webm", poster: "media/navtracker/dashboard.webp", alt: "NavTracker walkthrough: dashboard, weekly plan, DSA tracker and skills" },
      { type: "image", src: "media/navtracker/dashboard.webp", alt: "NavTracker dashboard with activity rings, streak, XP and study chart" },
      { type: "image", src: "media/navtracker/week.webp", alt: "This Week view with weekly target, day-by-day progress and tasks" },
      { type: "image", src: "media/navtracker/dsa.webp", alt: "DSA tracker with difficulty counts and revision dates" },
      { type: "image", src: "media/navtracker/skills.webp", alt: "Skills page with levels and prep checklists" },
    ],
    links: [{ label: "Source code", href: "https://github.com/navinesh-infopsykid/navtracker" }],
    featured: true,
    mediaNote: "Demo data",
  },
  {
    id: "crm",
    title: "Multi-Role CRM Platform",
    kind: "Admin, Sales and Viewer portals behind one login",
    summary:
      "A CRM built from an empty repo to production at Trudosys, with three portals that each have their own navigation and permissions. I was the only frontend engineer.",
    role: "Sole frontend engineer, Trudosys",
    year: "2025",
    highlights: [
      "Route-level access control with Auth0 across three portals",
      "Axios interceptor layer for silent token refresh, retries and error handling on 20+ endpoints",
      "Typed, reusable component library in an MVVM structure that sped up sprint delivery",
      "Jest test suites run on every pull request through Jenkins quality gates",
    ],
    stack: ["React", "TypeScript", "Zustand", "Auth0", "Tailwind CSS", "Jest", "Jenkins"],
    media: [],
    featured: true,
  },
  {
    id: "community-app",
    title: "Community Management App",
    kind: "Flutter app for residential communities",
    summary:
      "Work orders, live updates, location-based issue reports and push notifications for residents and staff. It also gave the company its first CI/CD pipeline.",
    role: "Mobile engineer, Trudosys",
    year: "2024",
    highlights: [
      "JIRA-style work orders with real-time Firestore updates",
      "Issue reports pinned on Google Maps, plus voice search",
      "Rich push notifications through Firebase Cloud Messaging",
    ],
    stack: ["Flutter", "Dart", "GetX", "Firebase", "Google Maps", "Jenkins"],
    media: [],
    featured: false,
  },
  {
    id: "marketplace",
    title: "Owner / Vendor Marketplace",
    kind: "One Flutter app, two experiences",
    summary:
      "Separate flows for property owners and vendors in a single codebase, with booking alerts and in-app chat that supports text, voice notes and images.",
    role: "Mobile engineer, Trudosys",
    year: "2024",
    highlights: [
      "Separate dashboards and flows per user type",
      "Real-time booking and status notifications",
      "In-app chat with text, voice notes and images",
    ],
    stack: ["Flutter", "GetX", "Firebase FCM", "REST APIs", "MVVM"],
    media: [],
    featured: false,
  },
  {
    id: "pdf-chatbot",
    title: "AI PDF Chatbot",
    kind: "Retrieval-augmented answers from your documents",
    summary:
      "Ask questions about any PDF and get answers grounded in its text. The pipeline chunks the document, embeds it, retrieves the relevant passages and answers with a local LLM.",
    role: "Personal project",
    year: "2025",
    highlights: [
      "PDF ingestion, chunking and vector embeddings",
      "Semantic retrieval feeding a local Ollama model",
      "FastAPI backend with each stage in its own module",
    ],
    stack: ["Python", "FastAPI", "Ollama", "Vector search", "RAG"],
    media: [],
    featured: false,
  },
  {
    id: "community-portal",
    title: "Community Web Portal",
    kind: "Flutter Web admin dashboard",
    summary:
      "The admin side of the community app: live dashboards, issue tracking and map-based reports for each role.",
    role: "Frontend engineer, Trudosys",
    year: "2023",
    highlights: [
      "Role-based dashboards with live Firestore data",
      "Issue tracking with geolocation reports on Google Maps",
    ],
    stack: ["Flutter Web", "Firestore", "GetX", "Google Maps"],
    media: [],
    featured: false,
  },
];

/* ─── EXPERIENCE ───────────────────────────────────────────── */

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  promoted?: boolean;
  bullets: string[];
}

export const experiences: ExperienceItem[] = [
  {
    role: "Software Development Engineer II",
    company: "Trudosys TECH LLP",
    location: "Bangalore",
    period: "Apr 2025 – Present",
    promoted: true,
    bullets: [
      "Took a multi-role CRM from zero to production as the sole frontend engineer (React, TypeScript, Zustand, Tailwind)",
      "Implemented Auth0 login with fine-grained role-based access across Admin, Sales and Viewer portals",
      "Built the Axios layer for silent token refresh, retries and error handling across 20+ endpoints",
      "Wrote Jest suites and enforced Jenkins quality gates on every pull request",
      "Scrum Master for the team; mentored two junior engineers and cut review cycles by about 40%",
      "Contributed to system design: API contracts, database schema and multi-tenancy planning",
    ],
  },
  {
    role: "Software Development Engineer I",
    company: "Trudosys TECH LLP",
    location: "Bangalore",
    period: "Oct 2023 – Mar 2025",
    bullets: [
      "Shipped two production Flutter apps using GetX and MVVM",
      "Built a Flutter Web community portal with live Firestore data and Google Maps",
      "Added Firebase push notifications and in-app chat with text, audio and images",
      "Set up CI/CD from scratch with Jenkins and Bitbucket Pipelines",
      "Added Firebase and Google Analytics; the data shaped the product roadmap",
    ],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "Elevado Softwares",
    location: "Coimbatore",
    period: "Jul 2023 – Oct 2023",
    bullets: [
      "Built frontend features and REST API integrations across the application",
      "Learned production Git workflows and Agile delivery on a real team",
    ],
  },
];

export const education = {
  degree: "Master of Computer Applications (MCA)",
  school: "JAIN University, Bangalore",
};

/* ─── SKILLS ───────────────────────────────────────────────── */

export interface SkillGroup {
  layer: string;
  note: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    layer: "Frontend",
    note: "Where most of my production work lives",
    items: ["React 19", "TypeScript", "Next.js 14", "Tailwind CSS", "Zustand", "Redux Toolkit", "React Query", "React Router"],
  },
  {
    layer: "Backend and APIs",
    note: "REST services, auth and business rules",
    items: ["Node.js", "Express", "Next.js route handlers", "Python", "FastAPI", "Zod validation", "Auth0, JWT and sessions", "Role-based access"],
  },
  {
    layer: "Data",
    note: "Modelling, migrations and transactions",
    items: ["PostgreSQL", "Prisma ORM", "Supabase", "SQLite", "Firebase Firestore", "Schema design and migrations"],
  },
  {
    layer: "Mobile",
    note: "Two production apps on Android and iOS",
    items: ["Flutter", "Dart", "GetX", "Firebase Cloud Messaging", "Google Maps SDK"],
  },
  {
    layer: "DevOps and testing",
    note: "Getting code to production safely",
    items: ["Docker", "Google Cloud Run", "GitHub Actions", "Jenkins", "Bitbucket Pipelines", "AWS", "Vitest", "Jest and Testing Library"],
  },
  {
    layer: "AI",
    note: "Applied LLM work",
    items: ["RAG pipelines", "Ollama", "Vector search", "Prompt design"],
  },
];

/** Turns "media/x.webp" into a URL that works on GitHub Pages and in Docker */
export const asset = (path: string): string =>
  /^https?:\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
