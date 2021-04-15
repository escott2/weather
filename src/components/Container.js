import React from 'react';
import PropTypes from 'prop-types';
import halfSun from '../img/half-sun.svg';
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

             </div>
          
            {/* <LightMeter dayLength={dayLength} dayHours={dayHours} nightHours={nightHours}/> */}

            <div className="SunTimes">
              <img className="half-sun-img sunrise-img" src={halfSun} alt="sun"></img>
              <Sunrise sunrise={sunrise}/>
              <div className="horizon"></div>
              <Sunset sunset={sunset}/>
              <img className="half-sun-img sunset-img" src={halfSun} alt="sun"></img>
            </div>     
        </main>
    );
}

export default Container;