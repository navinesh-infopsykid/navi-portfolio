
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ParticleBackground from "./components/SpaceBackground";
import SmokeyCursor from "./components/SmokyCursor";

const App = () => {
  return (
    <>
  
      <ParticleBackground />
    
      <SmokeyCursor/>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
};

export default App;
