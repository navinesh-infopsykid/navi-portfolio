import React, { useEffect, useRef, useState } from "react";
import VanillaTilt from "vanilla-tilt";
import "./App.css";

const projects = [
  { title: "Unqueue", image: "https://via.placeholder.com/400x300?text=Project+1", desc: "E-commerce platform" },
  { title: "InfiniteVPS", image: "https://via.placeholder.com/400x300?text=Project+2", desc: "High performance VPS hosting" },
];

function App() {
  const sectionsRef = useRef<HTMLElement[]>([]);

  // Smooth scroll on anchor click
  const handleScrollTo = (idx: number) => {
    sectionsRef.current[idx]?.scrollIntoView({ behavior: "smooth" });
  };

  // Fade-in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("fade-in");
        });
      },
      { threshold: 0.2 }
    );
    sectionsRef.current.forEach((section) => observer.observe(section));
  }, []);

  // Tilt cards
useEffect(() => {
  const cards = document.querySelectorAll<HTMLElement>(".project-card, .service-card");
  // Convert NodeList to array
  VanillaTilt.init(Array.from(cards), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.3,
  });
}, []);


  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">Navinesh</h1>
        <ul className="nav-links">
          {["Home", "Projects", "Services", "Contact"].map((name, idx) => (
            <li key={name}>
              <button onClick={() => handleScrollTo(idx)}>{name}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero */}
      <section ref={(el) => el && (sectionsRef.current[0] = el)} className="hero section">
        <div className="hero-content">
          <h1>
            Hello, I'm <span>Navinesh</span>
          </h1>
          <p>Experienced Software Engineer crafting unique digital experiences.</p>
          <div className="hero-buttons">
            <a href="mailto:inavineshraj@gmail.com" className="btn primary">
              Get in Touch
            </a>
            <button onClick={() => handleScrollTo(1)} className="btn outline">
              See Projects
            </button>
          </div>
          <div className="scroll-indicator">Scroll ↓</div>
        </div>
        <div className="hero-media">
          <img src="https://via.placeholder.com/800x500?text=Hero+Image" alt="Hero" />
        </div>
      </section>
{/* Projects Section */}
{/* Projects Section */}
<section
  ref={(el) => el && (sectionsRef.current[1] = el)}
  className="projects section"
>
  <h2 className="section-title">Featured Projects</h2>
  <div className="project-grid">
    {[
      {
        title: "Flutter E-Commerce App",
        image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?auto=format&fit=crop&w=800&q=80",
        desc: "A modern mobile app for seamless online shopping built with Flutter.",
        tech: ["Flutter", "Firebase", "Stripe"],
      },
      {
        title: "Portfolio Website",
        image: "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=800&q=80",
        desc: "Personal portfolio showcasing projects and skills, made with React.",
        tech: ["React", "Vite", "CSS3"],
      },
      {
        title: "Task Manager Web App",
        image: "https://images.unsplash.com/photo-1612831662375-295c1003d3ca?auto=format&fit=crop&w=800&q=80",
        desc: "A Jira-like task management tool built for teams.",
        tech: ["Flutter Web", "GetX", "Supabase"],
      },
    ].map((proj, idx) => (
      <div key={idx} className="project-card">
        <img src={proj.image} alt={proj.title} className="project-img" />
        <div className="project-info">
          <h3>{proj.title}</h3>
          <p>{proj.desc}</p>
          <div className="tech-stack">
            {proj.tech.map((t) => (
              <span key={t} className="tech">{t}</span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


{/* Services Section */}
<section ref={(el) => el && (sectionsRef.current[2] = el)} className="services section">
  <h2>Services</h2>
  <div className="service-grid">
    {["Frontend Development", "UX Design", "SEO Optimization"].map((service, idx) => (
      <div key={idx} className="service-card">
        <h3>{service}</h3>
        <p>Creating high-quality work with attention to detail.</p>
      </div>
    ))}
  </div>
</section>

{/* Contact Section */}
<section ref={(el) => el && (sectionsRef.current[3] = el)} className="contact section">
  <h2>Let's work together</h2>
  <p>Available for freelance work or new projects.</p>
  <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
    <input type="text" placeholder="Your Name" required />
    <input type="email" placeholder="Your Email" required />
    <textarea placeholder="Your Message" rows={5} required></textarea>
    <button type="submit" className="btn primary">Send Message</button>
  </form>
</section>

    </div>
  );
}

export default App;
