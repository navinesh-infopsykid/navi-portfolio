import React, { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, FileText } from "lucide-react";
import { profile, asset } from "../data/portfolio";
import "./Navbar.css";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

type Theme = "light" | "dark";

const currentTheme = (): Theme => {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [theme, setTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
    setTheme(next);
  };

  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <div className="wrap nav__inner">
        <a href="#top" className="nav__brand" aria-label={`${profile.name}, back to top`}>
          <span className="nav__mark" aria-hidden="true">N</span>
          <span className="nav__name">{profile.name}</span>
        </a>

        <nav className={`nav__links${open ? " is-open" : ""}`} aria-label="Sections">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav__link${active === l.id ? " is-active" : ""}`}
              aria-current={active === l.id ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          {profile.resume && (
            <a className="btn btn-line nav__resume-mobile" href={asset(profile.resume)} target="_blank" rel="noopener noreferrer">
              <FileText aria-hidden="true" /> Résumé
            </a>
          )}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="nav__icon-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </button>
          {profile.resume ? (
            <a className="btn btn-solid nav__cta" href={asset(profile.resume)} target="_blank" rel="noopener noreferrer">
              Résumé
            </a>
          ) : (
            <a className="btn btn-solid nav__cta" href={`mailto:${profile.email}`}>
              Email me
            </a>
          )}
          <button
            type="button"
            className="nav__icon-btn nav__burger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
