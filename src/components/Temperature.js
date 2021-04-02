import React from 'react';
import PropTypes from 'prop-types';
import './Temperature.scss'

Temperature.propTypes = {
    temp: PropTypes.number
}

function Temperature({temp}) {
    const isTemperature = (temp !== -500);

    return (
        <div className="Temperature">
            { isTemperature && 
                <p>{temp}°F</p>
            }
        </div>
    )
}

export default Temperature;