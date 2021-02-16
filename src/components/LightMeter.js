import React from 'react';
import './LightMeter.css';
import Temperature from './Temperature.js';

function LightMeter({temp}) {
    return (
    <div className="LightMeter">
        <Temperature temp={temp} />
    </div>
    )
}

export default LightMeter;