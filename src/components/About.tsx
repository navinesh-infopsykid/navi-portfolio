import React from "react";
import { profile, education } from "../data/portfolio";
import "./About.css";

const About: React.FC = () => (
  <section className="section" id="about">
    <div className="wrap about">
      <h2 className="section-title">About</h2>
      <div className="about__body">
        {profile.about.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
        <p className="about__edu">
          {education.degree}, {education.school}
        </p>
      </div>
      <dl className="about__facts">
        {profile.facts.map((f) => (
          <div key={f.label} className="about__fact">
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default About;
