import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Header.scss";
import Location from "./Location";
import Date from "./Date";
import Card from "./UI/Card";

Header.propTypes = {
  location: PropTypes.object,
  changeLocation: PropTypes.func,
  date: PropTypes.object,
  changeDate: PropTypes.func,
  locationData: PropTypes.object,
};

function Header({
  location,
  changeLocation,
  date,
  changeDate,
  locationData,
  changeFormLocation,
  clearFormLocationData,
  saveLocation,
  savedLocations,
  // forecastType,
}) {
  return (
    <header>
      <svg
        className="wave-svg--top"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 160"
      >
        <path
          fill="#024959"
          fillOpacity="1"
          d="M0,96L40,96C80,96,160,96,240,85.3C320,75,400,53,480,74.7C560,96,640,160,720,160C800,160,880,96,960,85.3C1040,75,1120,117,1200,133.3C1280,149,1360,139,1400,133.3L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>
      <h1 className="title">
        <span className="title__span">The Great </span>Outdoorcast
      </h1>
      <nav className="header__nav">
        <ul className="nav__list header__nav__list">
          {/* <li>
              <Link to="/home">Home</Link>
            </li> */}
          <li className="nav__list__item header__nav__list__item">
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <div className="header__select-wrapper">
        <Card className="header__card header__card--location">
          <Location
            location={location}
            changeLocation={changeLocation}
            clearFormLocationData={clearFormLocationData}
            changeFormLocation={changeFormLocation}
            locationData={locationData}
            saveLocation={saveLocation}
            savedLocations={savedLocations}
          />
        </Card>
        <Card className="header__card header__card--date">
          <Date date={date} changeDate={changeDate} />
        </Card>
      </div>
    </header>
  );
}

export default Header;
