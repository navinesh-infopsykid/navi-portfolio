import { motion } from "framer-motion";
import CatchStarGame from "./Cube3D";

const Hero = () => {
  return (
    <section id="home" className="hero section">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Hello, I’m <span className="gradient-text">Navineshraj</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Software Engineer crafting
          <span className="highlight"> clean</span>,
          <span className="highlight"> scalable</span> & high-impact digital
          experiences.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            className="btn primary"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Get in Touch
          </button>

          <button
            className="btn outline"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Projects
          </button>
        </motion.div>
      </motion.div>

     <CatchStarGame/>

    </section>
  );
};

export default Hero;
