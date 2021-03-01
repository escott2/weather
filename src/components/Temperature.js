import React from 'react';
import './Temperature.css'

function Temperature({temp, dayHours, nightHours}) {

    // const midDay = dayHours / 2;
    // console.log(midDay);

    return <div className="Temperature">
        <p>{temp}°F</p>
    </div>
}

export default Temperature;