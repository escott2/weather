import React from 'react';
import './WeatherIcon.scss';
import {IoIosCloud} from 'react-icons/io';
import {WiFog} from 'react-icons/wi';
import {IoRainySharp} from 'react-icons/io5';
import {IoIosThunderstorm} from 'react-icons/io';
import {IoIosSnow} from 'react-icons/io';


function WeatherIcon({currentWeather}) {
  // const conditionCode = currentWeather.icon;
  // const condition = currentWeather.condition;
  const conditionCode = '04d';
  const condition = "scattered-clouds";

  //Add icon and style
  let conditionIcon;
  switch (conditionCode) {
      case "01d":
      case "01n":
          conditionIcon = undefined;
          break;
      case '02d':
      case '02n':
          conditionIcon = <IoIosCloud className={`weather-icon ${condition.replace(/\s+/g, '-')}`} alt="cloud"/>
          break;
      case '03d':
      case '03n':
          conditionIcon = <div className="weather-icon cloud-container">
            <IoIosCloud className="cloud--1" alt="cloud"/>
            <IoIosCloud className="cloud--2" alt="cloud"/>
            </div>
          // conditionIcon = <div className={`weather-icon ${condition.replace(/\s+/g, '-')}`}>
          //   <IoIosCloud className={`${condition.replace(/\s+/g, '-')}--1`} alt="cloud"/>
          //   <IoIosCloud className={`${condition.replace(/\s+/g, '-')}--2`} alt="cloud"/>
          // </div>
          break;
      case '04d':
      case '04n':
          conditionIcon = <div className="weather-icon cloud-container">
            <IoIosCloud className="cloud--1" alt="cloud"/>
            <IoIosCloud className="cloud--2" alt="cloud"/>
            <IoIosCloud className="cloud--3" alt="cloud"/>
            </div>
          // conditionIcon = <div className={`weather-icon ${condition.replace(/\s+/g, '-')}`}>
          // <IoIosCloud className={`weather-icon ${condition.replace(/\s+/g, '-')}--1`} alt="cloud"/>
          // <IoIosCloud className={`weather-icon ${condition.replace(/\s+/g, '-')}--2`} alt="cloud"/>
          // <IoIosCloud className={`weather-icon ${condition.replace(/\s+/g, '-')}--3`} alt="cloud"/>
          // </div>
          break;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        conditionIcon = <IoRainySharp className={`weather-icon ${condition.replace(/\s+/g, '-')}`} alt="rain-cloud"/>
        break;
      case '11d':
      case '11n':
        conditionIcon = <IoIosThunderstorm className={`weather-icon ${condition.replace(/\s+/g, '-')}`} alt="rain-cloud"/>
        break;
      case '13d':
      case '13n':
        conditionIcon = <IoIosSnow className={`weather-icon ${condition.replace(/\s+/g, '-')}`} alt="rain-cloud"/>
        break;
      case '50d':
      case '50n':
        conditionIcon = <WiFog className={`weather-icon ${condition.replace(/\s+/g, '-')}`} alt="mist"/>
        break;
      default:
          conditionIcon = undefined;
  }

  // const conditionIconUrl = `http://openweathermap.org/img/wn/${conditionIcon}@2x.png`;



  return (
    <div>
      {/* <img src={conditionIconUrl} alt={currentWeather.condition} /> */}
      {/* <IoIosCloud className={condition.replace(/\s+/g, '-')} alt="cloud"/> */}
 
      {conditionIcon}

    </div>
  )
}

export default WeatherIcon;