import React from 'react';
import PropTypes from 'prop-types';
import './Temperature.scss'

Temperature.propTypes = {
    temp: PropTypes.number
}

function Temperature({temp}) {
    return <div className="Temperature">
        <p>{temp}°F</p>
    </div>
}

export default Temperature;