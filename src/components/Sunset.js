import React from 'react';
import './Sunset.css';

function Sunset({sunset}) {
    return (
        <div className="Sunset">
            <p>{sunset} PM</p>
        </div>
    )
}

export default Sunset;