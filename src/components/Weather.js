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
        <div className="sun-forecast-info">
          {/* <h3 className="sun-forecast-info__heading">
            Sun forecast:{" "}
            <span className="date-block">{date.fullDateString}</span>
          </h3> */}
          <p>
            Date selected:{" "}
            <span className="date-block">{date.fullDateString}</span>
          </p>
          <p>Select today's date to view weather forecast.</p>
        </div>
      )}
      {/* <div>
        <h2>Hourly Weather</h2>
      </div> */}
    </div>
  );
}

export default Weather;
