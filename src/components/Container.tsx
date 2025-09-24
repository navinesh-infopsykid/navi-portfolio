import React, { useState, useEffect } from "react";
import styles from "../styles/Container.module.css";

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, title, description, className }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {/* Simple Navbar */}
      <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}>
      <span className={styles.logo}>Navinesh</span>
      <ul className={styles.navLinks}>
        {["Home", "About", "Projects", "Services"].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} className={styles.link}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>

      {/* Page Content */}
      <main>{children}</main>

      {/* Simple Footer */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} Navinesh. All rights reserved.
      </footer>
    </div>
  );
};

export default Container;
