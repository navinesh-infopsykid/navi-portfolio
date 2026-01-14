import { motion } from "framer-motion";
import { useState } from "react";
import "./Projects.css";

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

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () =>
    setActiveIndex((prev) => (prev + 1) % projects.length);

  const prev = () =>
    setActiveIndex(
      (prev) => (prev - 1 + projects.length) % projects.length
    );

  const getPosition = (index: number) => {
    const diff =
      (index - activeIndex + projects.length) % projects.length;

    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === projects.length - 1) return "left";
    return "hidden";
  };

  const variants = {
    center: {
      x: 0,
      scale: 1.05,
      opacity: 1,
      zIndex: 3,
    },
    left: {
      x: -260,
      scale: 0.9,
      opacity: 0.6,
      zIndex: 2,
    },
    right: {
      x: 260,
      scale: 0.9,
      opacity: 0.6,
      zIndex: 2,
    },
    hidden: {
      opacity: 0,
      scale: 0.6,
      zIndex: 0,
    },
  };

  return (
    <section className="projects-section">
      <h2>Featured Projects</h2>

      <div className="carousel-wrapper">
        {/* LEFT BUTTON */}
        <button className="nav-btn left" onClick={prev}>
          ‹
        </button>

        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="carousel-card"
            variants={variants}
            animate={getPosition(index)}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) next();
              if (info.offset.x > 60) prev();
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
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* RIGHT BUTTON */}
        <button className="nav-btn right" onClick={next}>
          ›
        </button>
      </div>
    </section>
  );
};

export default Projects;
