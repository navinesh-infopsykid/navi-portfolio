import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import "./Skills.css";

import { FaReact, FaFire, FaGitAlt, FaPython } from "react-icons/fa";
import { SiFlutter, SiTypescript, SiSupabase } from "react-icons/si";
type Skill = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

/* ================= SKILLS DATA ================= */
const skills: Skill[] = [
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


/* ================= FRAMER VARIANTS ================= */

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -120,
    rotateZ: -6,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    x: 0,
    rotateZ: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 16,
    },
  },
};
interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => (
  <motion.div
    className="skill-card"
    variants={cardVariants}
    whileHover={{ scale: 1.08, rotateX: 6, rotateY: -6 }}
  >
    <span
      className="skill-glow"
      style={{ backgroundColor: skill.color }}
    />

    <motion.div
      className="skill-icon"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ color: skill.color }}
    >
      {skill.icon}
    </motion.div>

    <h3>{skill.name}</h3>
  </motion.div>
);

/* ================= COMPONENT ================= */

const Skills = () => {
  const topRow = skills.slice(0, Math.ceil(skills.length / 2));
  const bottomRow = skills.slice(Math.ceil(skills.length / 2));

  return (
    <section id="skills" className="section">
      <h2>Skills</h2>

      <div className="skills-marquee">
        {/* TOP ROW → LEFT */}
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

        {/* BOTTOM ROW → RIGHT */}
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
    </section>
  );
};

export default Skills;
