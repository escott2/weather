import React from 'react';
import PropTypes from 'prop-types';
import './Sunrise.css';

Sunrise.propTypes = {
    sunrise: PropTypes.object
}

function Sunrise({sunrise}) {
    return (
        <div className="Sunrise">
            {/* <p>{`${sunrise.sunriseHour}:${sunrise.sunriseMinute}`} AM</p> */}
            <p>{sunrise.sunriseTime}</p>

        </div>
    )
}

export default Sunrise;