import React from "react";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import "./Main.scss";
import Header from "./Header";
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
  dayLength,
  dayHours,
  nightHours,
  sunrise,
  sunset,
  displayTemp,
  displayLoader,
  date,
}) {
  //Ready to Forecast
  //Current Weather and Sun Forecast
  //Hourly Weather and Sun Forecast
  //Sun Forecast
  // const forecastType = displayTemp ? "Weather and Sun" : "Sun";

  return (
    <main className="main">
      <Loader
        type="RevolvingDot"
        color="#ffffff"
        height={100}
        width={100}
        visible={displayLoader}
        // timeout={3000} //3 secs
        className="loader"
      />
      {/* <Header /> */}
      {/* <div className="main__header">
        <h2 className="main__heading">{forecastType} Forecast</h2>
      </div> */}
      <Weather
        currentWeather={currentWeather}
        dayHours={dayHours}
        nightHours={nightHours}
        displayTemp={displayTemp}
        date={date}
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
    </main>
  );
}

export default Main;
