import React from 'react';
import PropTypes from 'prop-types';
import './Container.scss';
import Temperature from './Temperature';
import LightMeter from './LightMeter';
import Sun from './Sun';
import WeatherIcon from './WeatherIcon';
import SunTime from './SunTime';


import halfSun from '../img/half-sun--orange.svg';


Container.propTypes = {
    temp: PropTypes.number,
    dayLength: PropTypes.number,
    dayHours: PropTypes.number,
    nightHours: PropTypes.number,
    sunrise: PropTypes.string,
    sunset: PropTypes.string
};

function Container({currentWeather, dayLength, dayHours, nightHours, sunrise, sunset, displayTemp}) {

    return (
        <main className="Container">

            <Temperature currentWeather={currentWeather} dayHours={dayHours} nightHours={nightHours} displayTemp={displayTemp} />
         
            <div className="weather-scene">
                <Sun />
                <WeatherIcon currentWeather={currentWeather}/>
                <LightMeter dayLength={dayLength} dayHours={dayHours} nightHours={nightHours}/>
                <div className="SunTimes">
                    
                    <SunTime time={sunrise} imgSrc={halfSun} imgClassName="half-sun-img sunrise-img" />
                    <SunTime time={sunset} imgSrc={halfSun} imgClassName="half-sun-img sunset-img" />
                </div>  
             </div>
        </main>
    );
}

export default Container;