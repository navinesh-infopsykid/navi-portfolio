import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experiences } from "../data/portfolio";

const Experience: React.FC = () => {
  const [expanded, setExpanded] = useState<number>(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  const toggle = (i: number): void => {
    setExpanded((prev) => (prev === i ? -1 : i));
  };

  return (
    <section id="experience" className="sec" ref={ref}>
      <div className="sec-inner">
        <motion.p
          className="sec-label"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Career
        </motion.p>

        <motion.h2
          className="sec-title"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          Experience &amp; Growth
        </motion.h2>

        <div className="tl" role="list" aria-label="Work experience">
          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              className={`tl-item${expanded === i ? " tl-item--open" : ""}`}
              role="listitem"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.18 + i * 0.13 }}
            >
              {/* Timeline rail */}
              <div className="tl-rail" aria-hidden="true">
                <div className="tl-dot" />
                {i < experiences.length - 1 && <div className="tl-line" />}
              </div>

              {/* Card */}
              <div
                className="tl-card card"
                onClick={() => toggle(i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggle(i); }}
                role="button"
                tabIndex={0}
                aria-expanded={expanded === i}
                aria-label={`${exp.role} at ${exp.company}`}
              >
                <div className="tl-card__head">
                  <div className="tl-meta">
                    <span className="tl-period">{exp.period}</span>
                    {exp.promoted === true && (
                      <span className="tl-promo" aria-label="Promoted">▲ Promoted</span>
                    )}
                  </div>
                  <h3 className="tl-role">{exp.role}</h3>
                  <p className="tl-company">
                    {exp.company}
                    <span className="tl-loc"> · {exp.location}</span>
                  </p>
                  <button
                    type="button"
                    className={`tl-toggle${expanded === i ? " open" : ""}`}
                    aria-label={expanded === i ? "Collapse" : "Expand"}
                    onClick={(e) => { e.stopPropagation(); toggle(i); }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {expanded === i && (
                    <motion.div
                      className="tl-card__body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ul className="tl-bullets" aria-label="Responsibilities">
                        {exp.bullets.map((b) => (
                          <li key={b} className="tl-bullet">
                            <span className="tl-bullet__dot" aria-hidden="true" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65 }}
        >
          <p className="sec-label" style={{ marginBottom: 24 }}>Education</p>
          <div className="edu-grid">
            <article className="edu-card card">
              <span className="edu-icon" role="img" aria-label="Graduation cap">🎓</span>
              <div>
                <p className="edu-degree">Master of Computer Application (MCA)</p>
                <p className="edu-field">Computer Science &amp; IT</p>
                <p className="edu-school">JAIN University, Bangalore · 2024–2026</p>
              </div>
            </article>
            <article className="edu-card card">
              <span className="edu-icon" role="img" aria-label="Books">📚</span>
              <div>
                <p className="edu-degree">Bachelor of Science (BSc)</p>
                <p className="edu-field">Psychology</p>
                <p className="edu-school">PSG College of Arts &amp; Science, Coimbatore · 2020–2023</p>
              </div>
            </article>
          </div>
        </motion.div>
      </div>

      <style>{`
        .tl { display: flex; flex-direction: column; margin-bottom: 72px; }
        .tl-item { display: grid; grid-template-columns: 28px 1fr; gap: 18px; align-items: start; }
        .tl-rail { display: flex; flex-direction: column; align-items: center; padding-top: 26px; }
        .tl-dot {
          width: 11px; height: 11px; border-radius: 50%;
          background: var(--surface-3); border: 2px solid var(--border-hi);
          flex-shrink: 0; transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
          z-index: 1;
        }
        .tl-item--open .tl-dot {
          background: var(--teal); border-color: var(--teal);
          box-shadow: 0 0 12px var(--teal-glow);
        }
        .tl-line { width: 1px; flex: 1; min-height: 20px; background: linear-gradient(to bottom,var(--border-hi),transparent); margin: 6px 0; }
        .tl-card {
          padding: 26px 30px; margin-bottom: 14px;
          cursor: pointer; position: relative; outline: none;
        }
        .tl-card:focus-visible { box-shadow: 0 0 0 2px var(--teal); }
        .tl-item--open .tl-card { border-color: rgba(0,229,192,0.28); }
        .tl-card__head { position: relative; }
        .tl-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .tl-period { font-size: 0.78rem; color: var(--muted); font-weight: 500; }
        .tl-promo {
          padding: 2px 9px; border-radius: 999px; font-size: 0.7rem; font-weight: 700;
          background: rgba(0,229,192,0.1); border: 1px solid rgba(0,229,192,0.28); color: var(--teal);
        }
        .tl-role { font-family: var(--font-display); font-size: 1.08rem; font-weight: 700; color: var(--white); margin-bottom: 5px; }
        .tl-company { font-size: 0.87rem; color: var(--muted); }
        .tl-loc { color: var(--muted-2); }
        .tl-toggle {
          position: absolute; right: 0; top: 50%; transform: translateY(-50%);
          width: 30px; height: 30px; border-radius: 50%;
          background: var(--surface-3); border: 1px solid var(--border);
          color: var(--muted); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.25s ease;
        }
        .tl-toggle.open { background: var(--teal-dim); border-color: var(--teal); color: var(--teal); transform: translateY(-50%) rotate(180deg); }
        .tl-card__body { overflow: hidden; }
        .tl-bullets { list-style: none; padding: 20px 0 4px; display: flex; flex-direction: column; gap: 11px; }
        .tl-bullet { display: flex; align-items: flex-start; gap: 11px; }
        .tl-bullet__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--teal); flex-shrink: 0; margin-top: 8px; }
        .tl-bullet span:last-child { font-size: 0.88rem; color: var(--muted); line-height: 1.72; }
        .edu-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 18px; }
        .edu-card { display: flex; align-items: flex-start; gap: 18px; padding: 26px; }
        .edu-icon { font-size: 1.9rem; flex-shrink: 0; }
        .edu-degree { font-family: var(--font-display); font-weight: 700; font-size: 0.97rem; color: var(--white); margin-bottom: 4px; }
        .edu-field  { font-size: 0.82rem; color: var(--teal); font-weight: 500; margin-bottom: 5px; }
        .edu-school { font-size: 0.8rem; color: var(--muted); }
        @media (max-width: 700px) {
          .edu-grid { grid-template-columns: 1fr; }
          .tl-card { padding: 20px 18px; }
          .tl-item { grid-template-columns: 22px 1fr; gap: 12px; }
        }
      `}</style>
    </section>
  );
};

export default Experience;
