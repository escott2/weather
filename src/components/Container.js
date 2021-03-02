import React from 'react';
// import PropTypes from 'prop-types';
import halfSun from '../img/half-sun.svg';
import './Container.css';
import Temperature from './Temperature';
import LightMeter from './LightMeter';
import Sunrise from './Sunrise';
import Sunset from './Sunset';

// Container.propTypes = {
    
// };

function Container({temp, dayLength, dayHours, nightHours, sunrise, sunset}) {
    return (
        <div className="Container">
            <Temperature temp={temp} dayHours={dayHours} nightHours={nightHours}/>
            <LightMeter dayLength={dayLength} dayHours={dayHours} nightHours={nightHours}/>
            
            <div className="SunTimes">
              <Sunrise sunrise={sunrise}/>
              <div className="horizon"></div>
              <Sunset sunset={sunset}/>
              <img className="sun-img" src={halfSun} alt="sun"></img>

            </div>
            


            
        </div>
    );
}

export default Container;