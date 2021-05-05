import React from "react";
import "./About.scss";

function About() {
  return (
    <div className="about">
      <p>Weather app created by Emily Scott.</p>
      <ul>
        <li>
          <a
            href="https://github.com/escott2/weather.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github repository
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/emily-e-scott"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
      </ul>

      <p>More information coming soon.</p>
    </div>
  );
}

export default About;
