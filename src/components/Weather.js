import React from "react";
import "./Weather.scss";
import CurrentWeather from "./CurrentWeather";

function Weather({ currentWeather, dayHours, nightHours, displayTemp, date }) {
  return (
    <div className="weather">
      {displayTemp ? (
        <CurrentWeather
          currentWeather={currentWeather}
          dayHours={dayHours}
          nightHours={nightHours}
          displayTemp={displayTemp}
        />
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
      {/* <div>
        <h2>Hourly Weather</h2>
      </div> */}
    </div>
  );
}

export default Weather;
