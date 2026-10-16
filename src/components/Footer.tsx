import React from "react";
import { profile } from "../data/portfolio";

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="wrap footer__inner">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <p>
        Built with React, TypeScript and Vite.{" "}
        <a href="https://github.com/navinesh-infopsykid/navi-portfolio" target="_blank" rel="noopener noreferrer">
          Source on GitHub
        </a>
      </p>
      <a href="#top">Back to top</a>
    </div>
    <style>{`
      .footer { border-top: 1px solid var(--line); padding: 28px 0 36px; color: var(--ink-3); font-size: 0.9rem; }
      .footer__inner { display: flex; flex-wrap: wrap; gap: 8px 28px; justify-content: space-between; }
      .footer a { color: var(--ink-2); text-decoration: none; font-weight: 500; }
      .footer a:hover { color: var(--ink); }
    `}</style>
  </footer>
);

export default Footer;
