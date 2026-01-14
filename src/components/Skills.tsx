import { motion } from "framer-motion";
import "./Skills.css";
import type { Variants } from "framer-motion";
import {
  FaReact,
  FaFire,
  FaGitAlt,
  FaPython,
} from "react-icons/fa";
import {
  SiFlutter,
  SiTypescript,
  SiSupabase,
} from "react-icons/si";

/* ================= SKILLS DATA ================= */
const skills = [
  { name: "React", icon: <FaReact />, color: "#61DAFB" },
  { name: "Next.js", icon: <FaReact />, color: "#ffffff" },
  { name: "Flutter", icon: <SiFlutter />, color: "#00E5FF" },
  { name: "Dart", icon: <SiFlutter />, color: "#0175C2" },
  { name: "TypeScript", icon: <SiTypescript />, color: "#00B0FF" },
  { name: "Node.js", icon: <FaReact />, color: "#68A063" },
  { name: "Python", icon: <FaPython />, color: "#3776AB" },
  { name: "Firebase", icon: <FaFire />, color: "#FFCA29" },
  { name: "Supabase", icon: <SiSupabase />, color: "#3ECF8E" },
  { name: "Ollama (LLMs)", icon: <FaReact />, color: "#A855F7" },
  { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
  { name: "CI / CD", icon: <FaGitAlt />, color: "#22C55E" },
];

/* ================= ANIMATION VARIANTS ================= */

/* Container controls the "train" timing */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08, // 🚆 train spacing
      delayChildren: 0.2,
    },
  },
};

/* Each card flies in from left */
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -300,       // start far left
    rotateZ: -8,
    scale: 0.85,
  },
  show: {
    opacity: 1,
    x: 0,
    rotateZ: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
      mass: 0.8,
    } ,
  },
};

const Skills = () => {
  return (
    <section id="skills" className="section">
      <h2>Skills</h2>

      {/* Train container */}
      <motion.div
        className="service-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            className="skill-card"
            variants={cardVariants}
            whileHover={{
              scale: 1.1,
              rotateX: 6,
              rotateY: -6,
            }}
          >
            {/* Glow blob */}
            <span
              className="skill-glow"
              style={{ backgroundColor: skill.color }}
            />

            {/* Floating icon */}
            <motion.div
              className="skill-icon"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ color: skill.color }}
            >
              {skill.icon}
            </motion.div>

            {/* Skill name */}
            <h3>{skill.name}</h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
