import React from 'react';
import PropTypes from 'prop-types';
import './Sunset.css';

Sunset.propTypes = {
    sunset: PropTypes.string
}

function Sunset({sunset}) {
    return (
        <div className="Sunset">
            <p>{sunset} PM</p>
        </div>
    )
}

export default Sunset;