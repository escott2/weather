import React from 'react';
import './Temperature.css'

function Temperature({temp}) {
    return <div className="Temperature">
        <p>{temp}°F</p>
    </div>
}

export default Temperature;