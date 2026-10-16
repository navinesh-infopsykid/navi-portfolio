import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App: React.FC = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <Work />
      <About />
      <Experience />
      <Skills />
      <Contact />
    </main>
    <Footer />
  </>
);

export default App;
