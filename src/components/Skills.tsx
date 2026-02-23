import React from "react";
import { motion, type Variants } from "framer-motion";
import "./Skills.css";

import { FaReact, FaGitAlt, FaPython ,FaAws, FaFire} from "react-icons/fa";
import { SiDart, SiFlutter, SiGithubactions, SiMongodb, SiNextdotjs, SiOllama, SiTypescript } from "react-icons/si";
import { DiNodejsSmall } from "react-icons/di";

/* =========================
   TYPES
========================= */
type Skill = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

/* =========================
   SKILLS CONFIG (DATA-DRIVEN)
========================= */
const SKILLS: Skill[] = [
  { name: "React", icon: <FaReact />, color: "#61DAFB" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#000000" }, // Use #FFFFFF if on a dark background
  { name: "Flutter", icon: <SiFlutter />, color: "#02569B" },
  { name: "Node.js", icon: <DiNodejsSmall />, color: "#339933" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" }, // Or #00ED64 for the vibrant version
  { name: "Dart", icon: <SiDart />, color: "#0175C2" },
  { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
  { name: "Python", icon: <FaPython />, color: "#3776AB" },
  { name: "AWS", icon: <FaAws />, color: "#FF9900" }, // Official AWS Squid Ink/Orange
  { name: "Firebase", icon: <FaFire />, color: "#FFCA28" },
  { name: "Ollama (LLMs)", icon: <SiOllama />, color: "#000000" }, // Ollama branding is typically monochrome
  { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
  { name: "CI / CD", icon: <SiGithubactions />, color: "#2088FF" } // Using GitHub Actions as a standard CI/CD icon
];

/* =========================
   MEDIA QUERY HOOK (BEST PRACTICE)
========================= */
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = React.useState(
    window.matchMedia(query).matches
  );

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

/* =========================
   FRAMER MOTION VARIANTS
========================= */
const containerVariants: Variants = {
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
};

/* =========================
   SKILL CARD (PURE UI)
========================= */
interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <motion.div
      className="skill-card"
      variants={cardVariants}
      whileHover={{ scale: 1.08, rotateX: 6, rotateY: -6 }}
      role="listitem"
      aria-label={skill.name}
    >
      {/* Glow background */}
      <span
        className="skill-glow"
        style={{ backgroundColor: skill.color }}
      />

      {/* Floating Icon */}
     <motion.div
  className="skill-icon"
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  style={{
    color: skill.color,
    width: "60px",
    height: "60px",
  }}
>
  {skill.icon}
</motion.div>


      <h3>{skill.name}</h3>
    </motion.div>
  );
};

/* =========================
   MAIN COMPONENT
========================= */
const Skills: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");

  const half = Math.ceil(SKILLS.length / 2);
  const topRow = SKILLS.slice(0, half);
  const bottomRow = SKILLS.slice(half);

  return (
    <section id="skills" className="section">
      <h2>Skills</h2>

      {/* MOBILE → GRID */}
      {isMobile ? (
        <div className="skills-grid" role="list">
          {SKILLS.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      ) : (
        /* DESKTOP → INFINITE MARQUEE */
        <div className="skills-marquee">
          <motion.div
            className="skills-track left"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[...topRow, ...topRow].map((skill, i) => (
              <SkillCard key={`top-${i}`} skill={skill} />
            ))}
          </motion.div>

          <motion.div
            className="skills-track right"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[...bottomRow, ...bottomRow].map((skill, i) => (
              <SkillCard key={`bottom-${i}`} skill={skill} />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Skills;
