import React from 'react';
import PropTypes from 'prop-types';
import halfSun from '../img/half-sun--orange.svg';

import './Sunrise.scss';

Sunrise.propTypes = {
    sunrise: PropTypes.string
}

function Sunrise({sunrise}) {
    return (
        <div className="Sunrise flex--row">
            <img className="half-sun-img sunrise-img" src={halfSun} alt="sun"></img>
            <p>{sunrise}</p>
        </div>
    )
}

export default Sunrise;