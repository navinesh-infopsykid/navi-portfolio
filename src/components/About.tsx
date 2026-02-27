import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Pillar {
  icon: string;
  title: string;
  text: string;
  color: string;
}

const PILLARS: Pillar[] = [
  {
    icon: "⚡",
    title: "Engineering-First",
    text: "Architecture, performance, and long-term scalability guide every decision — from state management to pixel-perfect UI.",
    color: "var(--teal)",
  },
  {
    icon: "🎨",
    title: "Design × Code",
    text: "I bridge design and development. Smooth animations, micro-interactions, and delightful UX are not optional — they are essential.",
    color: "var(--violet)",
  },
  {
    icon: "📈",
    title: "Impact-Driven",
    text: "Measurable outcomes over vanity metrics. I optimise workflows, mentor teams, and ship things that move numbers.",
    color: "var(--amber)",
  },
];

const TAGS = ["React 18", "TypeScript", "Flutter", "Auth0", "CI/CD", "Scrum Master"];

const About: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });

  return (
    <section id="about" className="sec about-bg" ref={ref}>
      <div className="sec-inner">
        <motion.p
          className="sec-label"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.p>

        <motion.h2
          className="sec-title"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          SDE-L2. Scrum Master.<br />Full-Stack Builder.
        </motion.h2>

        <div className="about-layout">
          {/* Bio */}
          <motion.div
            className="about-bio"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <p>
              I&apos;m <strong>Navineshraj R</strong> — a Frontend Engineer
              with 2+ years building production-grade web and mobile apps from
              scratch. Promoted from{" "}
              <span className="hi-teal">SDE-L1 to SDE-L2 in just 18 months</span>,
              I&apos;ve been the sole frontend engineer, Scrum Master, and
              technical mentor shipping real products.
            </p>
            <p>
              My north star:{" "}
              <em>build things people actually love to use</em>. I obsess over
              clean architecture, smooth performance, and UX that feels
              effortless. Currently expanding into full-stack (Node.js, MongoDB)
              and applied AI/ML (RAG pipelines, LLM systems).
            </p>
            <div className="about-tags">
              {TAGS.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Identity card */}
          <motion.div
            className="about-card-wrap"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.28 }}
          >
            <div className="id-card card">
              <div className="id-card__head">
                <div className="id-avatar" aria-hidden="true">NR</div>
                <div>
                  <div className="id-name">Navineshraj R</div>
                  <div className="id-role">Software Engineer · SDE-L2</div>
                </div>
              </div>
              <div className="id-divider" />
              <ul className="id-meta">
                <li><span aria-hidden="true">📍</span> Bangalore, KA, India</li>
                <li><span aria-hidden="true">🎓</span> MCA – JAIN University</li>
                <li><span aria-hidden="true">🏢</span> Trudosys TECH LLP</li>
                <li className="id-avail"><span aria-hidden="true">✅</span> Open to opportunities</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="pillars-grid">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.title}
              className="pillar card"
              style={{ "--pc": p.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.35 + i * 0.1 }}
              data-hover
            >
              <span className="pillar__icon" role="img" aria-label={p.title}>
                {p.icon}
              </span>
              <h3 className="pillar__title">{p.title}</h3>
              <p className="pillar__text">{p.text}</p>
              <div className="pillar__bar" />
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .about-bg { background: linear-gradient(180deg,var(--black) 0%,var(--surface) 50%,var(--black) 100%); }
        .about-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 56px;
          margin-bottom: 60px;
          align-items: start;
        }
        .about-bio p { color: var(--muted); font-size: 1.02rem; line-height: 1.82; margin-bottom: 18px; }
        .about-bio strong { color: var(--white); font-weight: 600; }
        .about-bio em    { color: var(--teal); font-style: normal; font-weight: 500; }
        .hi-teal { color: var(--teal); font-weight: 600; }
        .about-tags { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 24px; }
        .tag {
          padding: 5px 13px;
          border-radius: 999px;
          border: 1px solid var(--border-hi);
          background: var(--surface-3);
          font-size: 0.8rem; font-weight: 500; color: var(--white);
        }
        .about-card-wrap { position: relative; }
        .id-card { padding: 28px; }
        .id-card__head { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .id-avatar {
          width: 52px; height: 52px; border-radius: 14px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--teal), var(--violet));
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display); font-weight: 800; font-size: 1rem;
          color: var(--black);
        }
        .id-name { font-family: var(--font-display); font-weight: 700; font-size: 1.05rem; color: var(--white); }
        .id-role { font-size: 0.8rem; color: var(--muted); margin-top: 3px; }
        .id-divider { height: 1px; background: var(--border); margin-bottom: 20px; }
        .id-meta { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .id-meta li { display: flex; align-items: center; gap: 10px; font-size: 0.88rem; color: var(--muted); }
        .id-avail { color: var(--teal) !important; font-weight: 600; }
        .pillars-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .pillar { padding: 28px 24px; cursor: default; position: relative; overflow: hidden; }
        .pillar:hover { transform: translateY(-5px); box-shadow: 0 24px 60px rgba(0,0,0,0.3); }
        .pillar__icon { font-size: 1.9rem; display: block; margin-bottom: 14px; }
        .pillar__title { font-family: var(--font-display); font-size: 1.05rem; font-weight: 700; color: var(--white); margin-bottom: 8px; }
        .pillar__text  { font-size: 0.88rem; color: var(--muted); line-height: 1.72; }
        .pillar__bar {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2.5px;
          background: var(--pc);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s var(--ease);
        }
        .pillar:hover .pillar__bar { transform: scaleX(1); }
        @media (max-width: 1000px) {
          .about-layout { grid-template-columns: 1fr; }
          .pillars-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .pillars-grid { gap: 14px; }
          .pillar { padding: 22px 18px; }
        }
      `}</style>
    </section>
  );
};

export default About;
