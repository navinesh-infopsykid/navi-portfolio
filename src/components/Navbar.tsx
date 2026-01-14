import React, { useEffect,  } from "react";
import {
  FiHome,
  FiUser,
  FiStar,
  FiFolder,
  FiMail,
//   FiSun,
//   FiMoon,
} from "react-icons/fi";
import type { IconType } from "react-icons";

interface Section {
  id: string;
  name: string;
  icon: IconType;
}

const sections: Section[] = [
  { id: "home", name: "Home", icon: FiHome },
  { id: "about", name: "About", icon: FiUser },
  { id: "skills", name: "Skills", icon: FiStar },
  { id: "projects", name: "Projects", icon: FiFolder },
  { id: "contact", name: "Contact", icon: FiMail },
];

const Navbar: React.FC = () => {

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light";
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);



  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar floating">
      {/* Logo */}
      <div className="logo desktop-only">
        <span className="logo-icon">◆</span>
        <span className="logo-name">Navineshraj</span>
      </div>

      {/* Desktop links */}
      <div className="nav-links desktop-only">
        {sections.map((sec) => (
          <button key={sec.id} onClick={() => scrollTo(sec.id)}>
            {sec.name}
          </button>
        ))}
      </div>

      {/* Mobile icons */}
      <div className="nav-links mobile-only">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <button key={sec.id} onClick={() => scrollTo(sec.id)}>
              <Icon size={22} />
            </button>
          );
        })}
      </div>

      {/* Theme Toggle */}
      {/* <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button> */}
    </nav>
  );
};

export default Navbar;
