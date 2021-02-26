import React from 'react';
// import PropTypes from 'prop-types';
import './Container.css';
import Temperature from './Temperature';
import LightMeter from './LightMeter';

// Container.propTypes = {
    
// };

function Container({temp, dayLength}) {
    return (
        <div className="Container">
            <Temperature temp={temp}/>
            <LightMeter dayLength={dayLength}/>



            
        </div>
    );
}

export default Container;