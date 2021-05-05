import React from 'react';
import PropTypes from 'prop-types';
// import halfSun from '../img/half-sun--orange.svg';

import './SunTime.scss';

Sunrise.propTypes = {
    sunrise: PropTypes.string
}

function Sunrise({time, imgSrc, imgClassName}) {
    return (
        <div className="SunTime">
            <img className={imgClassName} src={imgSrc} alt="sun"></img>
            <p>{time}</p>
        </div>
    )
}

export default Sunrise;