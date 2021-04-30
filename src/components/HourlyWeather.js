import React from "react";
import Card from "./UI/Card";

function HourlyWeather({ hourlyWeatherData }) {
  const hasData = hourlyWeatherData.temp !== -500;

  return (
    <div>
      {hasData && (
        <div>
          {hourlyWeatherData.map((hour) => {
            return (
              <Card>
                <p>{hour.dt}</p>
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
      {console.log(hourlyWeatherData)}
      <p>test</p>
    </div>
  );
}

export default HourlyWeather;
