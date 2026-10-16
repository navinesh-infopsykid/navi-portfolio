import React from "react";
import { skillGroups } from "../data/portfolio";
import "./Skills.css";

const Skills: React.FC = () => (
  <section className="section" id="skills">
    <div className="wrap">
      <div className="section-head">
        <h2 className="section-title">Skills</h2>
        <p className="section-lede">
          Grouped by the layer of the stack they belong to. Everything here has been used in a shipped project.
        </p>
      </div>
      <div className="skills">
        {skillGroups.map((g) => (
          <section key={g.layer} className="skills__group" aria-labelledby={`sk-${g.layer}`}>
            <h3 id={`sk-${g.layer}`}>{g.layer}</h3>
            <p className="skills__note">{g.note}</p>
            <ul className="skills__list">
              {g.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
