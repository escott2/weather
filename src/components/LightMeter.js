import React, {useState} from 'react';
import './LightMeter.css';
import PropTypes from 'prop-types';

LightMeter.propTypes = {
    dayLength: PropTypes.number,
    dayHours: PropTypes.number,
    nightHours: PropTypes.number
}

function LightMeter({dayLength, dayHours, nightHours}) {

    const [isShown, setIsShown] = useState(false);
    const dayDegrees = Math.round(dayLength * 360);

    const percentStyle = {
        backgroundImage:
            `conic-gradient(from 270deg, #E8F6FD ${dayDegrees}deg, #024959 0)`
    }

    function toggleHover() {
        setIsShown(!isShown);
    }

    return (
    <div className="LightMeter" style={percentStyle} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
        {isShown && (
            <div className="light-stats">
                <p>Sunlight: {dayHours} hrs</p>
                <p>Darkness: {nightHours} hrs</p>
            </div>
        )}

    </div>
    )
}

export default LightMeter;