export interface Skill {
  name: string;
  category: string;
}

export interface Project {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  badge: string;
  accent: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  promoted?: boolean;
  bullets: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "5+",  label: "Production Apps Shipped" },
  { value: "18m", label: "L1 → L2 Promotion" },
  { value: "2+",  label: "Years Experience" },
  { value: "40%", label: "Faster Code Reviews" },
];

export const skills: Skill[] = [
  { name: "React 18",        category: "Frontend"  },
  { name: "TypeScript",      category: "Frontend"  },
  { name: "Next.js",         category: "Frontend"  },
  { name: "Tailwind CSS",    category: "Frontend"  },
  { name: "Flutter",         category: "Mobile"    },
  { name: "Dart",            category: "Mobile"    },
  { name: "Zustand",         category: "State"     },
  { name: "Redux Toolkit",   category: "State"     },
  { name: "React Query",     category: "State"     },
  { name: "Auth0 / RBAC",    category: "Security"  },
  { name: "JWT / OAuth 2.0", category: "Security"  },
  { name: "Jest / RTL",      category: "Testing"   },
  // { name: "Node.js",         category: "Backend"   },
  // { name: "Express.js",      category: "Backend"   },
  // { name: "MongoDB",         category: "Backend"   },
  { name: "Python",          category: "Backend"   },
  { name: "FastAPI",         category: "Backend"   },
  { name: "Firebase",        category: "Cloud"     },
  { name: "AWS",             category: "Cloud"     },
  { name: "Ollama LLM",      category: "AI/ML"     },
  { name: "RAG Pipelines",   category: "AI/ML"     },
  { name: "Vector Search",   category: "AI/ML"     },
  { name: "Jenkins",         category: "DevOps"    },
  { name: "GitHub Actions",  category: "DevOps"    },
  { name: "Docker",          category: "DevOps"    },
  { name: "Git",             category: "DevOps"    },
];

export const projects: Project[] = [
  {
    title: "Multi-Role CRM Platform",
    tagline: "Greenfield · Sole Frontend Engineer",
    description:
      "Architected and delivered a CRM web platform from zero to production. Supports Admin, Sales, and Viewer portals with distinct navigation flows, route-level RBAC via Auth0, centralized Axios interceptors for silent token refresh, and Jest CI quality gates.",
    tech: ["React", "TypeScript", "Zustand", "Auth0", "Tailwind", "Jest", "Jenkins"],
    badge: "Zero → Production",
    accent: "linear-gradient(135deg,#00e5c0,#7b61ff)",
  },
  {
    title: "Community Management App",
    tagline: "Flutter · Production Mobile",
    description:
      "Multi-role Flutter mobile app with JIRA-style work order management, real-time Firestore data binding, Google Maps geolocation reporting, Firebase FCM multi-format push notifications, and voice search. Established the org's first CI/CD pipeline.",
    tech: ["Flutter", "Dart", "GetX", "Firebase", "Google Maps", "Jenkins"],
    badge: "First CI/CD the org had",
    accent: "linear-gradient(135deg,#7b61ff,#ff6eb4)",
  },
  {
    title: "Owner / Vendor Marketplace",
    tagline: "Flutter · Dual-Mode Mobile",
    description:
      "Dual-mode mobile app with fully distinct UX flows, dashboards, and feature sets for Owners and Vendors. Real-time booking alerts, status notifications, and multi-format in-app chat (text, audio, image) via Firebase FCM.",
    tech: ["Flutter", "GetX", "Firebase FCM", "REST APIs", "MVVM"],
    badge: "2 apps in 1",
    accent: "linear-gradient(135deg,#ff6eb4,#ffb340)",
  },
  {
    title: "AI-Powered PDF Chatbot",
    tagline: "RAG Pipeline · Self-Initiated",
    description:
      "End-to-end Retrieval-Augmented Generation pipeline: PDF ingestion → text chunking → vector embedding → semantic retrieval → Ollama LLM contextual answer generation. Modular FastAPI backend with decoupled layers.",
    tech: ["Python", "FastAPI", "Ollama", "RAG", "Vector DB", "Semantic Search"],
    badge: "Self-Initiated AI Project",
    accent: "linear-gradient(135deg,#ffb340,#00e5c0)",
  },
  {
    title: "Flutter Web Community Portal",
    tagline: "Flutter Web · Multi-Role Dashboard",
    description:
      "Flutter Web multi-role portal featuring visual dashboards, real-time Firebase Firestore data binding, issue tracking, and geolocation-based reporting with Google Maps API integration.",
    tech: ["Flutter Web", "Firebase Firestore", "GetX", "Google Maps"],
    badge: "Real-time across all roles",
    accent: "linear-gradient(135deg,#00c6ff,#7b61ff)",
  },
];

export const experiences: ExperienceItem[] = [
  {
    role: "Software Development Engineer – L2",
    company: "Trudosys TECH LLP",
    location: "Bangalore, KA",
    period: "Apr 2025 – Present",
    promoted: true,
    bullets: [
      "Architected multi-role CRM from zero to production as sole frontend engineer — React, TypeScript, Zustand, Tailwind CSS",
      "Implemented Auth0 authentication with fine-grained RBAC across 3 portals (Admin / Sales / Viewer)",
      "Designed Axios interceptor layer handling silent token refresh, retry logic & error propagation across 20+ endpoints",
      "Applied MVVM throughout the codebase; built typed reusable component library accelerating sprint delivery",
      "Authored Jest unit test suites; enforced automated quality gates via Jenkins CI on every pull request",
      "Served as Scrum Master — sprint planning, backlog grooming, daily standups, retrospectives",
      "Mentored 2 junior engineers on React architecture & Agile practices, reducing review cycles by ~40%",
      "Collaborated on system design: API contracts, DB schema, modular feature boundaries & multi-tenancy planning",
    ],
  },
  {
    role: "Software Development Engineer – L1",
    company: "Trudosys TECH LLP",
    location: "Bangalore, KA",
    period: "Oct 2023 – Mar 2025",
    bullets: [
      "Developed Flutter Web multi-role community portal with real-time Firestore data & Google Maps integration",
      "Built two production Flutter mobile apps using GetX state management and MVVM architecture",
      "Integrated Firebase FCM for real-time push notifications and in-app chat (text, audio, image)",
      "Built CI/CD infrastructure from scratch with Jenkins & Bitbucket Pipelines; automated test execution",
      "Instrumented Firebase Analytics & Google Analytics — insights directly shaped the product roadmap",
    ],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "Elevado Softwares Pvt. Ltd.",
    location: "Coimbatore, TN",
    period: "Jul 2023 – Oct 2023",
    bullets: [
      "Contributed to frontend development and REST API integration across the full application stack",
      "Gained foundational experience in SDLC, Git workflows, and collaborative Agile engineering",
    ],
  },
];
