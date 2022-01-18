import React from "react";
import { NavLink } from "react-router-dom";
// import PropTypes from "prop-types";
import "./MainHeader.scss";

function MainHeader() {
  return (
    <header>
      <nav className="header__nav">
        <ul className="nav__list header__nav__list">
          <li className="nav__list__item header__nav__list__item">
            <NavLink to="/home/current">Home</NavLink>
          </li>
          <li className="nav__list__item header__nav__list__item">
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
      <h1 className="title">
        <span className="title__span">The Great </span>Outdoorcast
      </h1>
    </header>
  );
}

export default MainHeader;
