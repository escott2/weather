import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      <nav className="header__nav">
        <ul className="nav__list">
          <li className="nav__list__item">
            <Link to="/home">Home</Link>
          </li>
        </ul>
      </nav>
      <p>Weather app created by Emily Scott.</p>
    </div>
  );
}

export default About;
