import React from 'react';
import PropTypes from 'prop-types';
import halfSun from '../img/half-sun--orange.svg';
import './Sunset.scss';

Sunset.propTypes = {
    sunset: PropTypes.string
}

function Sunset({sunset}) {
    return (
        <div className="Sunset flex--row">
            <p>{sunset}</p>
            <img className="half-sun-img sunset-img" src={halfSun} alt="sun"></img>
        </div>
    )
}

export default Sunset;