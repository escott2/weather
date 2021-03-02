import React from 'react';
import './Sunrise.css';

function Sunrise({sunrise}) {
    return (
        <div className="Sunrise">
            <p>{`${sunrise.sunriseHour}:${sunrise.sunriseMinute}`} AM</p>
        </div>
    )
}

export default Sunrise;