import React from "react";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App: React.FC = () => (
  <>
    <Cursor />
    <Navbar />
    <main id="main-content">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
    <Footer />

    <style>{`
      /* hide cursor for touch / pointer-coarse devices */
      @media (hover: none), (pointer: coarse) {
        .cur-dot, .cur-ring { display: none !important; }
      }
    `}</style>
  </>
);

export default App;
