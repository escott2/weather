import React from 'react';
import './Attribution.scss';

function Attribution() {
    return (
        <div className="Attribution">
            <p>Sunset and sunrise times from &nbsp;
                <a href="https://sunrise-sunset.org/api">https://sunrise-sunset.org/api</a>
            </p>
            <p>Weather data from &nbsp;
                <a href="https://openweathermap.org/">https://openweathermap.org</a>
            </p>

        </div>
    )
}

export default Attribution;