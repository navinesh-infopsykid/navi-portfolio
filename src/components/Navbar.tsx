import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"] as const;
type NavLink = (typeof NAV_LINKS)[number];

const scrollTo = (id: string): void => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 50);

      const ids = NAV_LINKS.map((l) => l.toLowerCase());
      let found = "";
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY + 180 >= el.offsetTop) {
          found = ids[i];
          break;
        }
      }
      setActive(found);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (item: NavLink): void => {
    scrollTo(item.toLowerCase());
    setOpen(false);
  };

  return (
    <>
      <motion.header
        className={`nav-shell${scrolled ? " nav-shell--scrolled" : ""}`}
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          className="nav-logo"
          onClick={() => scrollTo("hero")}
          aria-label="Scroll to top"
        >
          <span className="nav-logo__mark">N</span>
          <span className="nav-logo__name">Navineshraj</span>
        </button>

        <nav className="nav-links" aria-label="Main navigation">
          {NAV_LINKS.map((item) => (
            <button
              key={item}
              type="button"
              className={`nav-link${active === item.toLowerCase() ? " nav-link--active" : ""}`}
              onClick={() => handleNav(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <a href="mailto:navineshrajr@gmail.com" className="nav-cta" data-hover>
          Hire Me
        </a>

        <button
          type="button"
          className="nav-burger"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`burger-bar${open ? " open" : ""}`} />
          <span className={`burger-bar${open ? " open" : ""}`} />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-nav"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
          >
            {NAV_LINKS.map((item, i) => (
              <motion.button
                key={item}
                type="button"
                className="mobile-nav__item"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleNav(item)}
              >
                {item}
              </motion.button>
            ))}
            <a
              href="mailto:navineshrajr@gmail.com"
              className="mobile-nav__cta"
              data-hover
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-shell {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 900;
          display: flex;
          align-items: center;
          padding: 20px 48px;
          transition: background 0.4s ease, backdrop-filter 0.4s ease, padding 0.35s ease, border-bottom 0.35s ease;
        }
        .nav-shell--scrolled {
          background: rgba(2,2,5,0.82);
          backdrop-filter: blur(22px) saturate(160%);
          border-bottom: 1px solid var(--border);
          padding: 14px 48px;
        }
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          margin-right: auto;
          cursor: pointer;
        }
        .nav-logo__mark {
          width: 34px; height: 34px;
          border-radius: 9px;
          background: linear-gradient(135deg, var(--teal), var(--violet));
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display); font-weight: 800; font-size: 0.95rem;
          color: var(--black);
        }
        .nav-logo__name {
          font-family: var(--font-display); font-weight: 700; font-size: 0.95rem;
          color: var(--white);
        }
        .nav-links { display: flex; gap: 4px; }
        .nav-link {
          padding: 8px 15px;
          border-radius: 999px;
          font-size: 0.88rem; font-weight: 500;
          color: var(--muted);
          transition: color 0.2s, background 0.2s;
          cursor: pointer;
        }
        .nav-link:hover, .nav-link--active { color: var(--white); background: rgba(255,255,255,0.07); }
        .nav-link--active { color: var(--teal) !important; }
        .nav-cta {
          margin-left: 22px;
          padding: 9px 22px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--teal), var(--violet));
          color: var(--black);
          font-family: var(--font-display); font-weight: 700; font-size: 0.85rem;
          letter-spacing: 0.03em;
          transition: opacity 0.2s, transform 0.2s;
          white-space: nowrap;
        }
        .nav-cta:hover { opacity: 0.82; transform: translateY(-1px); }
        .nav-burger {
          display: none; flex-direction: column; gap: 6px;
          margin-left: 16px; cursor: pointer; padding: 4px;
        }
        .burger-bar {
          display: block; width: 22px; height: 2px;
          background: var(--white); border-radius: 2px;
          transition: transform 0.28s ease, opacity 0.28s ease;
          transform-origin: center;
        }
        .burger-bar.open:first-child  { transform: rotate(45deg) translate(4px,4px); }
        .burger-bar.open:last-child   { transform: rotate(-45deg) translate(4px,-4px); }

        .mobile-nav {
          position: fixed; top: 70px; left: 14px; right: 14px;
          z-index: 899;
          background: rgba(12,12,20,0.97);
          backdrop-filter: blur(28px);
          border: 1px solid var(--border-hi);
          border-radius: var(--r-lg);
          padding: 18px;
          display: flex; flex-direction: column; gap: 4px;
        }
        .mobile-nav__item {
          text-align: left;
          padding: 13px 16px;
          border-radius: var(--r-md);
          font-family: var(--font-display); font-weight: 600; font-size: 1rem;
          color: var(--muted);
          cursor: pointer;
          transition: color 0.2s, background 0.2s;
        }
        .mobile-nav__item:hover { color: var(--white); background: var(--surface-3); }
        .mobile-nav__cta {
          margin-top: 8px; padding: 13px 16px;
          border-radius: var(--r-md);
          background: linear-gradient(135deg, var(--teal), var(--violet));
          color: var(--black);
          font-family: var(--font-display); font-weight: 700; font-size: 0.95rem;
          text-align: center;
        }

        @media (max-width: 900px) {
          .nav-shell  { padding: 16px 22px; }
          .nav-shell--scrolled { padding: 12px 22px; }
          .nav-links, .nav-cta { display: none; }
          .nav-burger { display: flex; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
