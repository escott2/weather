import React from "react";
import "./Weather.scss";
import { Route, Switch } from "react-router-dom";

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
          <Switch>
            <Route path="/home/current">
              <CurrentWeather
                currentWeather={currentWeather}
                displayTemp={displayTemp}
              />
            </Route>
            <Route path="/home/hourly">
              <HourlyWeather
                hourlyWeatherData={hourlyWeatherData}
                timezone={timezone}
                date={date}
                toLocalTime={toLocalTime}
              />
            </Route>
          </Switch>
        </React.Fragment>
      ) : (
        <div className="sun-forecast-info-wrapper">
          <div className="sun-forecast-info">
            <h4 className="sun-forecast-info__heading">Sun forecast for:</h4>
            <p className="date-block">{date.fullDateString}</p>
            <p>
              You are viewing the sun forecast for a date other than today.
              Looking for current weather conditions? Select today's date to
              view the full Outdoorcast forecast.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
