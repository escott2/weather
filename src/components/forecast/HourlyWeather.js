import React from "react";
import spacetime from "spacetime";
import "./HourlyWeather.scss";
import Card from "../UI/Card";

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
            return (
              <Card className="hourly-weather">
                <h5 className="hourly-weather__heading">{time}</h5>
                <p>{Math.round(hour.temp)}°F</p>
                <p>Wind speed:{hour.wind_speed}</p>
                <p>Wind direction:{hour.wind_deg}</p>
                <p>Condition: {hour.weather[0].description}</p>
                <p>icon: {hour.weather[0].icon}</p>
              </Card>
            );
          })}
        </div>
      )}
      <p>test</p>
    </div>
  );
}

export default HourlyWeather;
