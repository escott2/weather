import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import "./Main.scss";
import LightMeter from "./LightMeter";
import Sun from "./Sun";
import WeatherIcon from "./WeatherIcon";
import SunTime from "./SunTime";
import Weather from "./Weather";

import halfSun from "../img/half-sun--orange.svg";

Main.propTypes = {
  temp: PropTypes.number,
  dayLength: PropTypes.number,
  dayHours: PropTypes.number,
  nightHours: PropTypes.number,
  sunrise: PropTypes.string,
  sunset: PropTypes.string,
};

function Main({
  currentWeather,
  hourlyWeatherData,
  dayLength,
  dayHours,
  nightHours,
  sunrise,
  sunset,
  displayTemp,
  displayLoader,
  date,
  timezone,
  toLocalTime,
}) {
  const forecastType = displayTemp ? "Weather and Sun" : "Sun";
  const hasTemperature = currentWeather.temp !== -500;

  return (
    <div className="main">
      <div className="main__header">
        <h2 className="main__heading">{forecastType} Forecast</h2>
      </div>
      <svg
        className="wave-svg--bottom"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 160"
      >
        <path
          fill="#D9F0FC"
          fillOpacity="1"
          d="M0,96L40,96C80,96,160,96,240,85.3C320,75,400,53,480,74.7C560,96,640,160,720,160C800,160,880,96,960,85.3C1040,75,1120,117,1200,133.3C1280,149,1360,139,1400,133.3L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>
      <Loader
        type="RevolvingDot"
        color="#ffffff"
        height={100}
        width={100}
        visible={displayLoader}
        // timeout={3000} //3 secs
        className="loader"
      />
      {displayTemp && hasTemperature && (
        <nav className="main__nav">
          <ul className="main__nav__list">
            <li className="main__nav__list__item">
              <NavLink
                to="/home/current"
                activeClassName="main__nav__list__item__link--active"
              >
                Current
              </NavLink>
            </li>
            <li className="main__nav__list__item">
              <NavLink
                to="/home/hourly"
                activeClassName="main__nav__list__item__link--active"
              >
                Hourly
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      <Weather
        currentWeather={currentWeather}
        hourlyWeatherData={hourlyWeatherData}
        dayHours={dayHours}
        nightHours={nightHours}
        displayTemp={displayTemp}
        date={date}
        timezone={timezone}
        toLocalTime={toLocalTime}
      />
      <div className="weather-scene">
        <Sun />
        {displayTemp && <WeatherIcon currentWeather={currentWeather} />}
        <LightMeter
          dayLength={dayLength}
          dayHours={dayHours}
          nightHours={nightHours}
        />
        <div className="SunTimes">
          <SunTime
            time={sunrise}
            imgSrc={halfSun}
            imgClassName="half-sun-img sunrise-img"
          />
          <SunTime
            time={sunset}
            imgSrc={halfSun}
            imgClassName="half-sun-img sunset-img"
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
