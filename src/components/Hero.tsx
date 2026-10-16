import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "../data/portfolio";
import StackVisual from "./StackVisual";
import "./Hero.css";

const Hero: React.FC = () => {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] },
        };

  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <motion.p className="hero__kicker" {...rise(0)}>
            {profile.available && <span className="hero__dot" aria-hidden="true" />}
            {profile.name}, {profile.title.toLowerCase()} in {profile.location.split(",")[0]}
            {profile.available && <span className="sr-only">, open to new roles</span>}
          </motion.p>

          <motion.h1 className="hero__title" {...rise(0.08)}>
            I build whole products: the schema, the API and the screen people&nbsp;use.
          </motion.h1>

          <motion.p className="hero__intro" {...rise(0.16)}>
            {profile.intro}
          </motion.p>

          <motion.div className="hero__actions" {...rise(0.24)}>
            <a href="#work" className="btn btn-solid">
              See my work
            </a>
            <a href="#contact" className="btn btn-line">
              Get in touch
            </a>
          </motion.div>

          <motion.ul className="hero__social" {...rise(0.32)}>
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <FaGithub aria-hidden="true" /> GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin aria-hidden="true" /> LinkedIn
              </a>
            </li>
            {profile.available && <li className="hero__open">Open to full-stack roles</li>}
          </motion.ul>
        </div>

        <StackVisual />
      </div>
    </section>
  );
};

export default Hero;
