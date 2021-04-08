import React from 'react';
import PropTypes from 'prop-types';
import halfSun from '../img/half-sun.svg';
import './Container.scss';
import Temperature from './Temperature';
import LightMeter from './LightMeter';
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

function Container({temp, dayLength, dayHours, nightHours, sunrise, sunset}) {
    return (
        <main className="Container">
            <Temperature temp={temp} dayHours={dayHours} nightHours={nightHours}/>
            <LightMeter dayLength={dayLength} dayHours={dayHours} nightHours={nightHours}/>

            <div className="SunTimes">
              <img className="sun-img sunrise-img" src={halfSun} alt="sun"></img>
              <Sunrise sunrise={sunrise}/>
              <div className="horizon"></div>
              <Sunset sunset={sunset}/>
              <img className="sun-img sunset-img" src={halfSun} alt="sun"></img>


            </div>     
        </main>
    );
}

export default Container;