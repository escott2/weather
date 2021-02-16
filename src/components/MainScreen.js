import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./MainScreen.css";
import LightMeter from './LightMeter';
import Attribution from './Attribution';


function MainScreen() {

    const today = new Date();
    console.log(today);

    const [temp, setTemp] = useState("70");
    const [sunrise, setSunrise] = useState("");
    const [sunset, setSunset] = useState("");
    const [date, setDate] = useState({
        month: today.getMonth(),
        day: today.getDate(),
        year: today.getFullYear()
    });

    console.log(date);

    const WEATHER_API_KEY = "922176d7fe6aa80866789eaaf2e9d26d";
    const cityName = "Minneapolis";

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

        axios.get(`https://api.sunrise-sunset.org/json?lat=44.9778&lng=-93.2650&date=${date.year}-${date.month}-${date.day}`)
        .then(response => {
           setSunrise(() => {
              const sunriseUTC = response.data.results.sunrise;
              return sunriseUTC;
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
            <p>{sunrise} UTC</p>
            <h2>Sunset</h2>
            <p>{sunset} UTC</p>
            <p>Date: {date.month}</p>
            <LightMeter temp={temp} />
            <Attribution />
        </div>
    )

}

export default MainScreen;