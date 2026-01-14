import React, { useEffect } from "react";
import {
  FiHome,
  FiUser,
  FiStar,
  FiFolder,
  FiMail,
} from "react-icons/fi";
import type { IconType } from "react-icons";

interface Section {
  id: string;
  name: string;
  icon: IconType;
}

/**
 * Desktop sections (NO Home here)
 */
const desktopSections: Section[] = [
  { id: "about", name: "About", icon: FiUser },
  { id: "skills", name: "Skills", icon: FiStar },
  { id: "projects", name: "Projects", icon: FiFolder },
  { id: "contact", name: "Contact", icon: FiMail },
];

/**
 * Mobile sections (Home INCLUDED)
 */
const mobileSections: Section[] = [
  { id: "home", name: "Home", icon: FiHome },
  ...desktopSections,
];

const Navbar: React.FC = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="navbar floating">
      {/* Logo → Home */}
      <button
  type="button"
  className="logo desktop-only"
  onClick={() => scrollTo("home")}
>
  <span className="logo-icon">◆</span>
  <span className="logo-name">Navineshraj</span>
</button>


      {/* Desktop links */}
      <div className="nav-links desktop-only">
        {desktopSections.map((sec) => (
          <button key={sec.id} onClick={() => scrollTo(sec.id)}>
            {sec.name}
          </button>
        ))}
      </div>

      {/* Mobile icons */}
      <div className="nav-links mobile-only">
        {mobileSections.map((sec) => {
          const Icon = sec.icon;
          return (
            <button key={sec.id} onClick={() => scrollTo(sec.id)}>
              <Icon size={22} />
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
