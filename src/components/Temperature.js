import React from 'react';
import PropTypes from 'prop-types';
import './Temperature.scss';

Temperature.propTypes = {
    temp: PropTypes.number
}

function Temperature({displayTemp, currentWeather}) {
    const isTemperature = (currentWeather.temp !== -500);

    return (
        <div className="Weather">
   

            { (isTemperature && displayTemp) &&
                <React.Fragment>
                    <div className="temperature">
                        <p className="text--min-max">H: {currentWeather.highTemp}°</p>
                        <div className="current-temp">
                            <p className="current-temp--degree">{currentWeather.temp}°F</p>
                            <p>Feels like: {currentWeather.feelsLike}°</p>
                        </div>
                        <p className="text--min-max">L: {currentWeather.lowTemp}°</p>
                    </div>
                    <div className="wind">
                        <p>Wind: {currentWeather.windSpeed}</p>
                        <p>{currentWeather.windDirection}</p>
                    </div>
                    <div>
                        <p>Humidity: {currentWeather.humidity}%</p>
                        <p>{currentWeather.condition}</p>
                    </div>
                </React.Fragment>
            }


        </div>
    )
}

export default Temperature;