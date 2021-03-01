import React from 'react';
// import PropTypes from 'prop-types';
import './Container.css';
import Temperature from './Temperature';
import LightMeter from './LightMeter';

// Container.propTypes = {
    
// };

function Container({temp, dayLength, dayHours, nightHours}) {
    return (
        <div className="Container">
            <Temperature temp={temp} dayHours={dayHours} nightHours={nightHours}/>
            <LightMeter dayLength={dayLength} dayHours={dayHours} nightHours={nightHours}/>



            
        </div>
    );
}

export default Container;