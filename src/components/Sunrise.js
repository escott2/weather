import React from 'react';
import './Sunrise.css';

function Sunrise({sunrise}) {
    return (
        <div className="Sunrise">
            <p>Sunrise: {sunrise} AM</p>
        </div>
    )
}

export default Sunrise;