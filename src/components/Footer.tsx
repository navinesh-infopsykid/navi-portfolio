import React from "react";

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__brand">
        <span className="footer__mark" aria-hidden="true">◆</span>
        <span className="footer__name">Navineshraj R</span>
      </div>
      <p className="footer__copy">Built with React &amp; TypeScript · 2025</p>
      <p className="footer__motto">&ldquo;Ship things people love.&rdquo;</p>
    </div>

    <style>{`
      .footer {
        border-top: 1px solid var(--border);
        padding: 44px 48px;
        text-align: center;
      }
      .footer__inner { display: flex; flex-direction: column; align-items: center; gap: 10px; }
      .footer__brand { display: flex; align-items: center; gap: 8px; }
      .footer__mark  { color: var(--teal); font-size: 0.95rem; }
      .footer__name  { font-family: var(--font-display); font-weight: 700; color: var(--white); font-size: 0.95rem; }
      .footer__copy  { font-size: 0.8rem; color: var(--muted-2); }
      .footer__motto { font-size: 0.83rem; color: var(--muted); font-style: italic; }
      @media (max-width: 600px) {
        .footer { padding: 36px 22px; }
      }
    `}</style>
  </footer>
);

export default Footer;
