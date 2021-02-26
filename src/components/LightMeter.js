import React from 'react';
import './LightMeter.css';
import Temperature from './Temperature.js';



function LightMeter({temp, daylength, nightlength}) {

    const dayDegrees = Math.round(daylength * 360);

    const percentStyle = {
        backgroundImage:
            `conic-gradient(from 270deg, #d9f0fc ${dayDegrees}deg, black 0)`
    }

    return (
    <div className="LightMeter" style={percentStyle}>
        {/* <Temperature temp={temp} /> */}
    </div>
    )
}

export default LightMeter;