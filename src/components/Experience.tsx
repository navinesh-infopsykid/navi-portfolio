import React from "react";
import { experiences } from "../data/portfolio";
import "./Experience.css";

const Experience: React.FC = () => (
  <section className="section" id="experience">
    <div className="wrap">
      <div className="section-head">
        <h2 className="section-title">Experience</h2>
        <p className="section-lede">
          Three years on product teams, from intern to SDE II, shipping web and mobile apps to real users.
        </p>
      </div>
      <ol className="xp">
        {experiences.map((x) => (
          <li key={x.role + x.period} className="xp__item">
            <div className="xp__when">
              <span>{x.period}</span>
              <span className="xp__where">{x.location}</span>
            </div>
            <div className="xp__what">
              <h3>
                {x.role}
                {x.promoted && <span className="xp__badge">Promoted</span>}
              </h3>
              <p className="xp__company">{x.company}</p>
              <ul>
                {x.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Experience;
