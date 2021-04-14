import React from 'react';
import PropTypes from 'prop-types';
import './Temperature.scss';
import WeatherIcon from './WeatherIcon';

Temperature.propTypes = {
    temp: PropTypes.number
}

function Temperature({displayTemp, currentWeather}) {
    const isTemperature = (currentWeather.temp !== -500);

    // const conditionCode = currentWeather.icon;

    // //Add icon and style
    // let conditionIcon;
    // switch (conditionCode) {
    //     case "01d":
    //     case "01n":
    //         conditionIcon = undefined;
    //         break;
    //     case 'Mangoes':
    //     case 'Papayas':
    //         console.log('Mangoes and papayas are $2.79 a pound.');
    //         // expected output: "Mangoes and papayas are $2.79 a pound."
    //         break;
    //     default:
    //         console.log(`Sorry, we are out of ${expr}.`);
    // }

    // const conditionIconUrl = `http://openweathermap.org/img/wn/${conditionIcon}@2x.png`;

    //if date is not today, do not display temp


    return (
        <div className="Temperature">
   

            { (isTemperature && displayTemp) &&
                <div>
                <p className="text--min-max">H: {currentWeather.highTemp}</p>
                <p>{currentWeather.temp}°F</p>
                <p className="text--min-max">L: {currentWeather.lowTemp}</p>
                <WeatherIcon currentWeather={currentWeather}/>
                </div>
            }


        </div>
    )
}

export default Temperature;