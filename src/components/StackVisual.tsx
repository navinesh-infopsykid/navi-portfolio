import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./StackVisual.css";

/** A deterministic sales-like series so the chart looks the same on every load */
const series = (() => {
  const pts: number[] = [];
  let v = 54;
  for (let i = 0; i < 48; i++) {
    v += Math.sin(i * 0.55) * 0.9 + Math.cos(i * 0.23) * 0.6 + 0.19;
    pts.push(v);
  }
  return pts;
})();

const W = 320;
const H = 92;

const toPath = (pts: number[]) => {
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  return pts
    .map((p, i) => {
      const x = (i / (pts.length - 1)) * W;
      const y = H - 6 - ((p - min) / (max - min)) * (H - 14);
      return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
};

const LOG = [
  { m: "POST", p: "/api/invoices", s: "201", t: "84 ms" },
  { m: "GET", p: "/api/dashboard?range=month", s: "200", t: "41 ms" },
  { m: "PATCH", p: "/api/products/12/status", s: "200", t: "37 ms" },
];

const StackVisual: React.FC = () => {
  const reduce = useReducedMotion();
  const line = useMemo(() => toPath(series), []);
  const area = `${line} L${W},${H} L0,${H} Z`;

  const layer = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: 0.35 + i * 0.22, ease: [0.2, 0.8, 0.2, 1] },
        };

  return (
    <figure className="stack" aria-label="Illustration of the three layers I build: interface, API and data">
      {/* Interface layer */}
      <motion.div className="stack__layer" {...layer(0)}>
        <span className="stack__rail">Interface</span>
        <div className="sv-invoice">
          <div className="sv-invoice__top">
            <div>
              <p className="sv-muted">Invoice INV-02872, takeaway</p>
              <p className="sv-strong">Ananya Rao</p>
            </div>
            <span className="sv-pill sv-pill--paid">Paid</span>
          </div>
          <div className="sv-invoice__rows">
            <p><span>Chocolate truffle cake × 1</span><span>₹650.00</span></p>
            <p><span>Butter croissant × 3</span><span>₹270.00</span></p>
            <p><span>Packaging, 4 boxes and 1 bag</span><span>₹50.00</span></p>
          </div>
          <p className="sv-invoice__total"><span>Total</span><span>₹970.00</span></p>
        </div>
      </motion.div>

      <div className="stack__joint" aria-hidden="true" />

      {/* API layer */}
      <motion.div className="stack__layer" {...layer(1)}>
        <span className="stack__rail">API</span>
        <ul className="sv-log">
          {LOG.map((l, i) => (
            <motion.li
              key={l.p}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 0.9 + i * 0.25 }}
            >
              <span className={`sv-m sv-m--${l.m.toLowerCase()}`}>{l.m}</span>
              <span className="sv-path">{l.p}</span>
              <span className="sv-s">{l.s}</span>
              <span className="sv-t">{l.t}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <div className="stack__joint" aria-hidden="true" />

      {/* Data layer */}
      <motion.div className="stack__layer" {...layer(2)}>
        <span className="stack__rail">Data</span>
        <div className="sv-nav">
          <div className="sv-nav__head">
            <div>
              <p className="sv-muted">Sales this month, 491 bills</p>
              <p className="sv-strong sv-num">₹2,59,380</p>
            </div>
            <p className="sv-up">+12.4% vs last month</p>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="sv-chart" aria-hidden="true">
            <defs>
              <linearGradient id="svArea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--sv-chart)" stopOpacity="0.28" />
                <stop offset="1" stopColor="var(--sv-chart)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={area}
              fill="url(#svArea)"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 1.9, duration: 0.6 }}
            />
            <motion.path
              d={line}
              fill="none"
              stroke="var(--sv-chart)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              strokeLinejoin="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: reduce ? 0 : 1.1, duration: 1.2, ease: "easeInOut" }}
            />
          </svg>
          <div className="sv-ranges" aria-hidden="true">
            <span>Today</span><span>Week</span><span className="is-on">Month</span><span>FY</span>
          </div>
        </div>
      </motion.div>
    </figure>
  );
};

export default StackVisual;
