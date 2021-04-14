import React, {useState} from 'react';
import './LightMeter.scss';
import PropTypes from 'prop-types';

LightMeter.propTypes = {
    dayLength: PropTypes.number,
    dayHours: PropTypes.number,
    nightHours: PropTypes.number
}

function LightMeter({dayLength, dayHours, nightHours}) {

    const [isShown, setIsShown] = useState(false);
    // const dayDegrees = Math.round(dayLength * 360);
    const dayPercent = Math.round(dayLength * 100);

    // const percentStyle = {
    //     backgroundImage:
    //         `conic-gradient(from 270deg, #E8F6FD ${dayDegrees}deg, #024959 0)`
    // }

    const percentFill = {
        height: `${dayPercent}%`
    };

    // function toggleHover() {
    //     setIsShown(!isShown);
    // }

    function displayStats() {
        setIsShown(true);
    }

    function hideStats() {
        setIsShown(false);
    }

    return (
    <div className="LightMeter" onMouseEnter={displayStats} onMouseLeave={hideStats}>
        <div className="percent" style={percentFill}></div>
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