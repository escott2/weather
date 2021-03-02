import React from 'react';
import './LightMeter.css';

function LightMeter({dayLength, dayHours, nightHours}) {

    const dayDegrees = Math.round(dayLength * 360);

    const percentStyle = {
        backgroundImage:
            `conic-gradient(from 270deg, #E8F6FD ${dayDegrees}deg, #41484C 0)`
    }

    return (
    <div className="LightMeter" style={percentStyle}>
        {/* <p className="light-stats">{dayHours} hrs</p>
        <p className="light-stats">{nightHours} hrs</p> */}
    </div>
    )
}

export default LightMeter;