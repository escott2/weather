import React from "react";
import PropTypes from "prop-types";
import { FiTarget } from "react-icons/fi";
import "./CurrentWeather.scss";
import Wind from "./Wind";

CurrentWeather.propTypes = {
  temp: PropTypes.number,
};

function CurrentWeather({ displayTemp, currentWeather }) {
  const hasTemperature = currentWeather.temp !== -500;

  const tempRange = currentWeather.highTemp - currentWeather.lowTemp;
  const tempUnitInPixels = 200 / tempRange;
  const tempDifference = currentWeather.highTemp - currentWeather.temp;
  const tempScalePosition = tempDifference * tempUnitInPixels;

  const tempIconPositionStyle = {
    top: `${tempScalePosition}px`,
  };

  return (
    <div className={hasTemperature ? "current-weather" : ""}>
      {hasTemperature && displayTemp && (
        <React.Fragment>
          <div className="temperature">
            <FiTarget
              className="current-temp--icon"
              style={tempIconPositionStyle}
            />
            <p className="text--min-max">H: {currentWeather.highTemp}°</p>
            <div className="current-temp">
              <p className="current-temp--degree">{currentWeather.temp}°F</p>
              <p>Feels like: {currentWeather.feelsLike}°</p>
            </div>
            <p className="text--min-max">L: {currentWeather.lowTemp}°</p>
          </div>

          <Wind
            speed={currentWeather.windSpeed}
            direction={currentWeather.windDirection}
          />

          <div className="conditions">
            <div className="condition">
              <h4 className="condition__heading">Condition</h4>
              <p>{currentWeather.description}</p>
            </div>
            <div className="humidity">
              <h4 className="condition__heading">Humidity</h4>
              <p>{currentWeather.humidity}%</p>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default CurrentWeather;
