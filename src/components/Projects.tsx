import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "../data/portfolio";

const Projects: React.FC = () => {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const proj = projects[active];

  const prev = (): void =>
    setActive((a) => (a - 1 + projects.length) % projects.length);
  const next = (): void =>
    setActive((a) => (a + 1) % projects.length);

  return (
    <section id="projects" className="sec proj-bg" ref={ref}>
      <div className="sec-inner">
        <motion.p
          className="sec-label"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Featured Work
        </motion.p>

        <motion.h2
          className="sec-title"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          Projects That Ship.
        </motion.h2>

        <div className="proj-layout">
          {/* Sidebar */}
          <motion.nav
            className="proj-sidebar"
            aria-label="Project list"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            {projects.map((p, i) => (
              <button
                key={p.title}
                type="button"
                className={`proj-tab${active === i ? " active" : ""}`}
                onClick={() => setActive(i)}
                aria-current={active === i ? "true" : "false"}
              >
                <span className="proj-tab__num">0{i + 1}</span>
                <div className="proj-tab__info">
                  <span className="proj-tab__title">{p.title}</span>
                  <span className="proj-tab__sub">{p.tagline}</span>
                </div>
                {active === i && (
                  <motion.div
                    className="proj-tab__bar"
                    layoutId="projTabBar"
                  />
                )}
              </button>
            ))}
          </motion.nav>

          {/* Detail card */}
          <AnimatePresence mode="wait">
            <motion.article
              key={proj.title}
              className="proj-card card"
              aria-label={proj.title}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="proj-card__grad"
                style={{ background: proj.accent }}
                aria-hidden="true"
              />
              <div className="proj-card__body">
                <header className="proj-card__header">
                  <div>
                    <span className="proj-card__tagline">{proj.tagline}</span>
                    <h3 className="proj-card__title">{proj.title}</h3>
                  </div>
                  <span className="proj-badge">{proj.badge}</span>
                </header>

                <p className="proj-card__desc">{proj.description}</p>

                <div className="proj-tech">
                  {proj.tech.map((t) => (
                    <span key={t} className="proj-tech__item">{t}</span>
                  ))}
                </div>

                <div className="proj-card__footer">
                  <div className="proj-nav" aria-label="Navigate projects">
                    <button
                      type="button"
                      className="proj-arrow"
                      onClick={prev}
                      aria-label="Previous project"
                    >
                      ←
                    </button>
                    <span className="proj-count" aria-live="polite">
                      {active + 1} / {projects.length}
                    </span>
                    <button
                      type="button"
                      className="proj-arrow"
                      onClick={next}
                      aria-label="Next project"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .proj-bg { background: linear-gradient(180deg,var(--black) 0%,var(--surface) 50%,var(--black) 100%); }
        .proj-layout { display: grid; grid-template-columns: 270px 1fr; gap: 28px; }
        .proj-sidebar { display: flex; flex-direction: column; gap: 6px; }
        .proj-tab {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 16px 14px;
          border-radius: var(--r-md);
          border: 1px solid transparent;
          text-align: left; cursor: pointer;
          position: relative; overflow: hidden;
          transition: background 0.22s, border-color 0.22s;
        }
        .proj-tab:hover { background: var(--surface-2); border-color: var(--border); }
        .proj-tab.active { background: var(--surface-2); border-color: var(--border-hi); }
        .proj-tab__num { font-family: var(--font-display); font-size: 0.72rem; font-weight: 700; color: var(--muted-2); margin-top: 2px; flex-shrink: 0; }
        .proj-tab.active .proj-tab__num { color: var(--teal); }
        .proj-tab__info { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
        .proj-tab__title { font-size: 0.88rem; font-weight: 600; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .proj-tab.active .proj-tab__title { color: var(--white); }
        .proj-tab__sub { font-size: 0.72rem; color: var(--muted-2); }
        .proj-tab__bar {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, var(--teal), var(--violet));
          border-radius: 0 2px 2px 0;
        }
        .proj-card { position: relative; overflow: hidden; min-height: 440px; }
        .proj-card__grad { position: absolute; inset: 0; opacity: 0.07; pointer-events: none; }
        .proj-card__body {
          position: relative; z-index: 1;
          padding: 44px;
          display: flex; flex-direction: column; gap: 22px; height: 100%;
        }
        .proj-card__header { display: flex; justify-content: space-between; align-items: flex-start; gap: 18px; }
        .proj-card__tagline { display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--muted); margin-bottom: 8px; font-weight: 600; }
        .proj-card__title { font-family: var(--font-display); font-size: clamp(1.4rem,2.5vw,1.9rem); font-weight: 800; color: var(--white); line-height: 1.12; }
        .proj-badge {
          padding: 7px 14px; border-radius: 999px; white-space: nowrap; flex-shrink: 0;
          background: rgba(0,229,192,0.1); border: 1px solid rgba(0,229,192,0.28);
          color: var(--teal); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.03em;
        }
        .proj-card__desc { font-size: 0.97rem; color: var(--muted); line-height: 1.82; flex: 1; }
        .proj-tech { display: flex; flex-wrap: wrap; gap: 8px; }
        .proj-tech__item {
          padding: 5px 12px; border-radius: 999px;
          background: var(--surface-3); border: 1px solid var(--border-hi);
          font-size: 0.78rem; font-weight: 500; color: var(--white);
        }
        .proj-card__footer { display: flex; justify-content: flex-end; }
        .proj-nav { display: flex; align-items: center; gap: 14px; }
        .proj-count { font-family: var(--font-display); font-size: 0.82rem; color: var(--muted); min-width: 36px; text-align: center; }
        .proj-arrow {
          width: 38px; height: 38px; border-radius: 50%;
          background: var(--surface-3); border: 1px solid var(--border-hi);
          color: var(--white); font-size: 1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.22s ease;
        }
        .proj-arrow:hover { background: var(--teal); color: var(--black); border-color: var(--teal); }
        @media (max-width: 900px) {
          .proj-layout { grid-template-columns: 1fr; }
          .proj-sidebar { flex-direction: row; overflow-x: auto; padding-bottom: 4px; gap: 8px; }
          .proj-tab { flex-shrink: 0; width: 190px; }
          .proj-tab__bar { top: auto; left: 0; right: 0; bottom: 0; width: auto; height: 3px; border-radius: 2px 2px 0 0; }
        }
        @media (max-width: 600px) {
          .proj-card__body { padding: 26px 22px; }
          .proj-card__header { flex-direction: column; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
