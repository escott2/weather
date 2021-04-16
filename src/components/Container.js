import React from 'react';
import PropTypes from 'prop-types';
// import halfSun from '../img/half-sun.svg';
import './Container.scss';
import Temperature from './Temperature';
import LightMeter from './LightMeter';
import Sun from './Sun';
import WeatherIcon from './WeatherIcon';
import Sunrise from './Sunrise';
import Sunset from './Sunset';

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
                    <Sunrise sunrise={sunrise}/>
                    <div className="horizon"></div>
                    <Sunset sunset={sunset}/>
                </div>  
             </div>
          
            {/* <div className="SunTimes">
              <Sunrise sunrise={sunrise}/>
              <div className="horizon"></div>
              <Sunset sunset={sunset}/>
            </div>      */}
        </main>
    );
}

export default Container;