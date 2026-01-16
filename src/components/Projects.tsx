import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./Projects.css";

import {
  FaReact,
  FaDatabase,
  FaNodeJs,
  FaRobot,
  FaFire,
} from "react-icons/fa";
import { SiSupabase, SiMongodb, SiPostgresql } from "react-icons/si";
import type { JSXElement } from "../global";

/* ================= SKILL ICON MAP ================= */
type SkillIconConfig = {
  icon: JSXElement;
  color: string;
};

const skillIcons: Record<string, SkillIconConfig> = {
  React: { icon: <FaReact />, color: "#61DAFB" },
  "Node.js": { icon: <FaNodeJs />, color: "#3C873A" },
  MongoDB: { icon: <SiMongodb />, color: "#47A248" },
  PostgreSQL: { icon: <SiPostgresql />, color: "#336791" },
  Firebase: { icon: <FaFire />, color: "#FFCA28" },
  Supabase: { icon: <SiSupabase />, color: "#3ECF8E" },
  "Vector DB": { icon: <FaDatabase />, color: "#A855F7" },
  LLMs: { icon: <FaRobot />, color: "#F97316" },
  RBAC: { icon: <FaDatabase />, color: "#0EA5E9" },
  "Framer Motion": { icon: <FaReact />, color: "#E879F9" },
};

/* ================= PROJECTS DATA ================= */
const projects = [
  {
    title: "PDF Chatbot",
    description: "Chat with PDFs using LLM-powered semantic search.",
    skills: ["React", "LLMs", "Supabase", "Vector DB"],
  },
  {
    title: "Task Manager",
    description: "High-performance task tracking platform.",
    skills: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Portfolio Website",
    description: "Animated personal portfolio with modern UI.",
    skills: ["React", "Framer Motion"],
  },
  {
    title: "Community Management Software",
    description: "Role-based moderation & analytics system.",
    skills: ["React", "Firebase", "RBAC"],
  },
  {
    title: "CRM Application",
    description: "Customer lifecycle & sales pipeline manager.",
    skills: ["React", "Node.js", "MongoDB"],
  },
];

const AUTO_SWIPE_DELAY = 2000; // ⏱ 3.5 seconds

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const next = () =>
    setActiveIndex((prev) => (prev + 1) % projects.length);

  const prev = () =>
    setActiveIndex(
      (prev) => (prev - 1 + projects.length) % projects.length
    );

  /* ================= AUTOPLAY ================= */
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = window.setInterval(() => {
      next();
    }, AUTO_SWIPE_DELAY);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  /* ================= POSITION LOGIC ================= */
  const getPosition = (index: number) => {
    const diff =
      (index - activeIndex + projects.length) % projects.length;

    if (diff === 0) return "center";
    if (diff === 1) return "right1";
    if (diff === 2) return "right2";
    if (diff === projects.length - 1) return "left1";
    if (diff === projects.length - 2) return "left2";
    return "hidden";
  };

  const variants = {
    center: { x: 0, scale: 1.1, opacity: 1, zIndex: 5 },
    left1: { x: -240, scale: 0.95, opacity: 0.75, zIndex: 4 },
    right1: { x: 240, scale: 0.95, opacity: 0.75, zIndex: 4 },
    left2: { x: -420, scale: 0.85, opacity: 0.4, zIndex: 3 },
    right2: { x: 420, scale: 0.85, opacity: 0.4, zIndex: 3 },
    hidden: { opacity: 0, scale: 0.6, zIndex: 0 },
  };

  return (
    <section id="projects" className="projects-section">
      <h2>Featured Projects</h2>

      <div
        className="carousel-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          className="nav-btn left"
          onClick={() => {
            setIsPaused(true);
            prev();
          }}
        >
          ‹
        </button>

        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="carousel-card"
            variants={variants}
            animate={getPosition(index)}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={() => {
              setIsPaused(true);
              setActiveIndex(index);
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) next();
              if (info.offset.x > 60) prev();
              setIsPaused(false);
            }}
          >
            <div className="card-glow" />

            <div className="card-content">
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              <div className="card-skills">
                {project.skills.map((skill) => (
                  <span key={skill} className="skill-chip">
                    <span
                      className="skill-icon"
                      style={{ color: skillIcons[skill].color }}
                    >
                      {skillIcons[skill].icon}
                    </span>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        <button
          className="nav-btn right"
          onClick={() => {
            setIsPaused(true);
            next();
          }}
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default Projects;
