import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { stats } from "../data/portfolio";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  r: number;
}

const scrollTo = (id: string): void => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const particles: Particle[] = Array.from({ length: 72 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      alpha: Math.random() * 0.35 + 0.05,
      r: Math.random() * 1.4 + 0.4,
    }));

    const draw = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,192,${p.alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,192,${0.055 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section id="hero" className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

      <div className="hero-blob hero-blob--teal" aria-hidden="true" />
      <div className="hero-blob hero-blob--violet" aria-hidden="true" />

      <div className="hero-inner">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          <span className="hero-badge" aria-label="Available for opportunities">
            <span className="hero-badge__dot" aria-hidden="true" />
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          I build things<br />
          <span className="gradient-text">people love</span><br />
          to use.
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Frontend Engineer · SDE-L2 at Trudosys · Bangalore
          <br />
          React · TypeScript · Flutter · Auth0 · CI/CD
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <button
            type="button"
            className="btn-primary"
            onClick={() => scrollTo("contact")}
          >
            Let's Work Together
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button
            type="button"
            className="btn-outline"
            onClick={() => scrollTo("projects")}
          >
            View Projects
          </button>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="hero-stat"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.08 }}
            >
              <span className="hero-stat__val">{s.value}</span>
              <span className="hero-stat__lbl">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="scroll-indicator__line" />
        <span>scroll</span>
      </motion.div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-canvas {
          position: absolute; inset: 0;
          pointer-events: none; z-index: 0;
        }
        .hero-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(130px);
        }
        .hero-blob--teal {
          width: 560px; height: 560px;
          background: rgba(0,229,192,0.11);
          top: -200px; left: -180px;
          animation: blobFloat 20s ease-in-out infinite alternate;
        }
        .hero-blob--violet {
          width: 480px; height: 480px;
          background: rgba(123,97,255,0.09);
          bottom: -150px; right: -120px;
          animation: blobFloat 25s ease-in-out infinite alternate-reverse;
        }
        @keyframes blobFloat {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(50px,35px) scale(1.07); }
        }
        .hero-inner {
          position: relative; z-index: 2;
          max-width: 860px;
          margin: 0 auto;
          padding: 130px 48px 90px;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 8px 18px;
          border-radius: 999px;
          border: 1px solid var(--teal);
          color: var(--teal);
          font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          font-family: var(--font-display);
          margin-bottom: 30px;
        }
        .hero-badge__dot {
          width: 7px; height: 7px;
          border-radius: 50%; background: var(--teal);
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink {
          0%,100% { opacity:1; } 50% { opacity:0.35; }
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 7.5vw, 5.2rem);
          font-weight: 800;
          line-height: 1.04;
          letter-spacing: -0.02em;
          color: var(--white);
          margin-bottom: 26px;
        }
        .hero-sub {
          font-size: clamp(0.95rem, 1.8vw, 1.1rem);
          color: var(--muted);
          line-height: 1.85;
          margin-bottom: 42px;
          font-weight: 300;
        }
        .hero-actions {
          display: flex; gap: 14px; flex-wrap: wrap;
          margin-bottom: 68px;
        }
        .hero-stats { display: flex; gap: 44px; flex-wrap: wrap; }
        .hero-stat { display: flex; flex-direction: column; gap: 4px; }
        .hero-stat__val {
          font-family: var(--font-display);
          font-size: 1.9rem; font-weight: 800;
          color: var(--white); line-height: 1;
        }
        .hero-stat__lbl {
          font-size: 0.74rem; color: var(--muted);
          text-transform: uppercase; letter-spacing: 0.09em; font-weight: 500;
        }
        .scroll-indicator {
          position: absolute; bottom: 38px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          z-index: 2;
        }
        .scroll-indicator__line {
          width: 1px; height: 44px;
          background: linear-gradient(to bottom, transparent, var(--teal));
          animation: lineGrow 2.2s ease-in-out infinite;
        }
        .scroll-indicator span {
          font-size: 0.68rem; letter-spacing: 0.17em;
          text-transform: uppercase; color: var(--muted);
        }
        @keyframes lineGrow {
          0%,100%{ opacity:0.3; transform:scaleY(0.6); transform-origin:top; }
          50%    { opacity:1;   transform:scaleY(1);   }
        }
        @media (max-width: 600px) {
          .hero-inner { padding: 110px 22px 72px; }
          .hero-stats { gap: 26px; }
          .hero-stat__val { font-size: 1.5rem; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
