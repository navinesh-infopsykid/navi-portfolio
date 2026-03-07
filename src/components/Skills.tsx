import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "../data/portfolio";

const CATEGORIES = [
  "All", "Frontend", "Mobile", "State", "Backend",
  "Cloud", "AI/ML", "DevOps", "Security", "Testing",
] as const;
type Category = (typeof CATEGORIES)[number];

const CAT_COLOR: Record<string, string> = {
  Frontend: "#00e5c0",
  Mobile:   "#7b61ff",
  State:    "#ff6eb4",
  Backend:  "#ffb340",
  Cloud:    "#00c6ff",
  "AI/ML":  "#ff6b6b",
  DevOps:   "#7fff00",
  Security: "#ff9900",
  Testing:  "#e879f9",
};

interface BarItem { label: string; pct: number; }
const BARS: BarItem[] = [
  { label: "React + TypeScript", pct: 95 },
  { label: "Flutter / Dart",     pct: 88 },
  { label: "Python / FAST APIs",     pct: 78 },
  { label: "AI/ML Engineering",  pct: 70 },
];

const Skills: React.FC = () => {
  const [cat, setCat] = useState<Category>("All");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = cat === "All" ? skills : skills.filter((s) => s.category === cat);

  return (
    <section id="skills" className="sec" ref={ref}>
      <div className="sec-inner">
        <motion.p
          className="sec-label"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Technical Skills
        </motion.p>

        <motion.h2
          className="sec-title"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          My Toolbox
        </motion.h2>

        {/* Category tabs */}
        <motion.div
          className="sk-tabs"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          role="tablist"
          aria-label="Skill categories"
        >
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={cat === c}
              className={`sk-tab${cat === c ? " active" : ""}`}
              onClick={() => setCat(c)}
              style={
                cat === c && c !== "All"
                  ? { borderColor: CAT_COLOR[c] ?? "var(--teal)", color: CAT_COLOR[c] ?? "var(--teal)" }
                  : {}
              }
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Pills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            className="sk-grid"
            role="list"
            aria-label={`${cat} skills`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32 }}
          >
            {filtered.map((sk, i) => (
              <motion.div
                key={sk.name}
                role="listitem"
                className="sk-pill card"
                style={{ "--cc": CAT_COLOR[sk.category] ?? "var(--teal)" } as React.CSSProperties}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.025, duration: 0.28 }}
                data-hover
              >
                <span className="sk-pill__dot" aria-hidden="true" />
                <span className="sk-pill__name">{sk.name}</span>
                <span className="sk-pill__cat">{sk.category}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Proficiency bars */}
        <motion.div
          className="sk-bars card"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45 }}
        >
          {BARS.map((b, i) => (
            <div key={b.label} className="sk-bar">
              <div className="sk-bar__head">
                <span className="sk-bar__lbl">{b.label}</span>
                <span className="sk-bar__val">{b.pct}%</span>
              </div>
              <div className="sk-bar__track" role="progress" aria-valuenow={b.pct} aria-valuemin={0} aria-valuemax={100} aria-label={b.label}>
                <motion.div
                  className="sk-bar__fill"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${b.pct}%` } : {}}
                  transition={{ duration: 1.1, delay: 0.5 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .sk-tabs {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-bottom: 36px;
        }
        .sk-tab {
          padding: 7px 17px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--surface-2);
          color: var(--muted);
          font-size: 0.82rem; font-weight: 500;
          cursor: pointer;
          transition: all 0.22s ease;
        }
        .sk-tab:hover { border-color: var(--muted-2); color: var(--white); }
        .sk-tab.active { background: var(--teal-dim); border-color: var(--teal); color: var(--teal); }
        .sk-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(185px,1fr));
          gap: 12px;
          margin-bottom: 48px;
          min-height: 80px;
        }
        .sk-pill {
          display: flex; align-items: center; gap: 11px;
          padding: 14px 18px;
          border-radius: var(--r-md);
          cursor: default;
        }
        .sk-pill:hover { border-color: var(--cc); transform: translateY(-3px); }
        .sk-pill__dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--cc);
          flex-shrink: 0;
        }
        .sk-pill__name { font-size: 0.88rem; font-weight: 500; color: var(--white); flex: 1; }
        .sk-pill__cat  { font-size: 0.68rem; color: var(--muted-2); text-transform: uppercase; letter-spacing: 0.07em; white-space: nowrap; }
        .sk-bars { padding: 36px 40px; display: flex; flex-direction: column; gap: 28px; }
        .sk-bar { display: flex; flex-direction: column; gap: 9px; }
        .sk-bar__head { display: flex; justify-content: space-between; }
        .sk-bar__lbl { font-size: 0.88rem; font-weight: 500; color: var(--white); }
        .sk-bar__val { font-family: var(--font-display); font-size: 0.85rem; color: var(--teal); font-weight: 700; }
        .sk-bar__track { height: 5px; background: var(--surface-3); border-radius: 3px; overflow: hidden; }
        .sk-bar__fill  { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--teal), var(--violet)); }
        @media (max-width: 700px) {
          .sk-grid { grid-template-columns: repeat(2,1fr); }
          .sk-bars { padding: 24px 22px; gap: 22px; }
        }
      `}</style>
    </section>
  );
};

export default Skills;
