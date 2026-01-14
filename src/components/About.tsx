import { motion } from "framer-motion";
import "./About.css";


const About = () => {
  return (
    <section id="about" className="section about glass">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      <motion.p
        className="about-intro"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        I’m a <span>Software Engineer</span> who loves transforming complex ideas
        into <span>clean, scalable</span> and <span>high-impact</span> digital
        products. I don’t just build apps , I craft experiences that feel fast,
        intuitive, and purposeful.
      </motion.p>

      <div className="about-grid">
        {[
          {
            title: " Engineering Mindset",
            text: "I focus on architecture, performance, and long-term scalability. Every decision is intentional, from state management to pixel-perfect UI."
          },
          {
            title: " Design + Code",
            text: "I bridge the gap between design and development. Smooth animations, micro-interactions, and delightful UX are not optional , they’re essential."
          },
          {
            title: " Impact Driven",
            text: "I care about solving real problems. Whether its optimizing workflows or improving usability, my goal is measurable impact."
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="about-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            viewport={{ once: true }}
          >
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="about-highlight"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
      >
        <p>
          💡 Currently building modern applications using{" "}
          <span>Flutter</span>, <span>React</span>, <span>TypeScript</span>, and{" "}
          <span>Firebase</span> - with a strong focus on clean architecture,
          performance optimization, and delightful user experiences.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
