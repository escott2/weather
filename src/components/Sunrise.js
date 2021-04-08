import React from 'react';
import PropTypes from 'prop-types';
import './Sunrise.scss';

Sunrise.propTypes = {
    sunrise: PropTypes.string
}

function Sunrise({sunrise}) {
    return (
        <div className="Sunrise">
            {/* <p>{`${sunrise.sunriseHour}:${sunrise.sunriseMinute}`} AM</p> */}
            <p>{sunrise}</p>

        </div>
    )
}

export default Sunrise;