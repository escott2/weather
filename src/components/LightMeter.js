import React from 'react';
import './LightMeter.css';

function LightMeter({dayLength}) {

    const dayDegrees = Math.round(dayLength * 360);

    const percentStyle = {
        backgroundImage:
            `conic-gradient(from 270deg, #d9f0fc ${dayDegrees}deg, black 0)`
    }

    return (
    <div className="LightMeter" style={percentStyle}></div>
    )
}

export default LightMeter;