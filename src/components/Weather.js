import React from "react";
import "./Weather.scss";
import CurrentWeather from "./CurrentWeather";
import HourlyWeather from "./HourlyWeather";

function Weather({
  currentWeather,
  hourlyWeatherData,
  displayTemp,
  date,
  timezone,
  toLocalTime,
}) {
  return (
    <div className="weather">
      {displayTemp ? (
        <React.Fragment>
          <CurrentWeather
            currentWeather={currentWeather}
            displayTemp={displayTemp}
          />
          <HourlyWeather
            hourlyWeatherData={hourlyWeatherData}
            timezone={timezone}
            date={date}
            toLocalTime={toLocalTime}
          />
        </React.Fragment>
      ) : (
        <div className="sun-forecast-info-wrapper">
          <div className="sun-forecast-info">
            <p>
              The forecast displayed is for a date other than today. Select
              today's date to view the current Outdoorcast forecast.
            </p>
            <h4 className="sun-forecast-info__heading">Date selected:</h4>
            <p className="date-block">{date.fullDateString}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
