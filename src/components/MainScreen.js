import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./MainScreen.css";
import LightMeter from './LightMeter';
import Attribution from './Attribution';


function MainScreen() {

    const today = new Date();

    const [temp, setTemp] = useState("70");
    const [sunrise, setSunrise] = useState("");
    const [sunset, setSunset] = useState("");
    const [date, setDate] = useState({
        month: today.getMonth(),
        date: today.getDate(),
        year: today.getFullYear()
    });

    const WEATHER_API_KEY = "922176d7fe6aa80866789eaaf2e9d26d";
    const cityName = "Minneapolis";

    const months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];

    function createGMTDate(month, date, year, hour, minute, second) {
        return new Date(`${months[month]} ${date}, ${year} ${hour}:${minute}:${second} GMT`);
    }

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${WEATHER_API_KEY}`)
        .then(response => {
           setTemp(() => {
              let currentTemp = response.data.main.temp;
              currentTemp = Math.round(Number(currentTemp));
              return currentTemp;
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }, []);

    useEffect(() => {

        axios.get(`https://api.sunrise-sunset.org/json?lat=44.9778&lng=-93.2650&date=${date.year}-${date.month + 1}-${date.date}`)
        .then(response => {
           setSunrise(() => {

              //Convert to military time and convert back.
              let sunriseTime = response.data.results.sunrise.padStart(11, '0');
              const hourUTC = Number(sunriseTime.slice(0, 2));
              const selectedDate = new Date(date.year, date.month, date.date);
              const offset = selectedDate.getTimezoneOffset() / 60;    
              const hourCT = String(hourUTC + offset);
              let sunriseTimeCT = sunriseTime.slice(2, 9);
              sunriseTimeCT = `${hourCT}${sunriseTimeCT}`;
              
              return sunriseTimeCT;
          });
          setSunset(response.data.results.sunset);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }, []);





    return (
        <div className="MainScreen">
            <h2>Sunrise</h2>
            <p>{sunrise} AM</p>
            <h2>Sunset</h2>
            <p>{sunset} UTC</p>
            <p>{months[date.month]} {date.date}, {date.year}</p>
            <LightMeter temp={temp} />
            <Attribution />
        </div>
    )

}

export default MainScreen;