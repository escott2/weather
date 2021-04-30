import React from "react";
import spacetime from "spacetime";
import Card from "./UI/Card";

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
          <p>{timezone}</p>
          {hourlyWeatherData.map((hour) => {
            const time = hourToLocalTime(hour.dt);
            return (
              <Card>
                <p>{time}</p>
                <p>{hour.temp}</p>
                <p>{hour.wind_speed}</p>
                <p>{hour.wind_deg}</p>
                <p>{hour.weather[0].description}</p>
                <p>{hour.weather[0].icon}</p>
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
