import React from 'react';
import PropTypes from 'prop-types';
import './Temperature.scss';

Temperature.propTypes = {
    temp: PropTypes.number
}

function Temperature({displayTemp, currentWeather}) {
    const isTemperature = (currentWeather.temp !== -500);

    return (
        <div className="Temperature">
   

            { (isTemperature && displayTemp) &&
                <div>
                    <div className="flex--row">
                        <p className="text--min-max">H: {currentWeather.highTemp}°</p>
                        <p className="text--min-max">L: {currentWeather.lowTemp}°</p>
                    </div>
                <p className="current-temp">{currentWeather.temp}°F</p>
                <p>Feels like: {currentWeather.feelsLike}°</p>
                <p>Wind: {currentWeather.windSpeed}</p>
                <p>{currentWeather.windDirection}</p>
                <p>Humidity: {currentWeather.humidity}%</p>
                <p>{currentWeather.condition}</p>
                </div>
            }


        </div>
    )
}

export default Temperature;