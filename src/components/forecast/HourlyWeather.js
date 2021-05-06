import React from "react";
import spacetime from "spacetime";
import uuid from "react-uuid";
import "./HourlyWeather.scss";
import Card from "../UI/Card";
import Wind from "./Wind";

function HourlyWeather({ hourlyWeatherData, date, timezone, toLocalTime }) {
  const hasData = hourlyWeatherData.temp !== -500;

  function hourToLocalTime(hour) {
    const timeInMilliseconds = hour * 1000;
    const today = new Date(timeInMilliseconds);
    let time = today.toLocaleTimeString();
    time = toString(time).padStart(11, "0");
    let s = spacetime(timeInMilliseconds);
    s = s.time(time);
    s = s.goto(timezone);
    const localTime = s.time();
    return localTime;
  }

  return (
    <div>
      {hasData && (
        <div>
          {hourlyWeatherData.map((hour) => {
            const time = hourToLocalTime(hour.dt);
            const iconURL = `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`;
            return (
              <Card className="hourly-weather" key={uuid()}>
                <h5 className="hourly-weather__heading">{time}</h5>
                <p className="current-temp--degree">
                  {Math.round(hour.temp)}°F
                </p>
                <Wind
                  speed={hour.wind_speed}
                  direction={hour.wind_deg}
                  className="hourly__wind"
                />
                <div className="hourly__other-weather">
                  <h4>Condition</h4>
                  <p className="text--margin-left">
                    {hour.weather[0].description}
                  </p>
                </div>
                <img
                  className="hourly__icon"
                  src={iconURL}
                  alt="hour.weather[0].description"
                />
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HourlyWeather;
