import React, {useState, useEffect} from 'react';
import "./MainScreen.css";
import axios from "axios";

function MainScreen() {

    const [temp, setTemp] = useState("70");
    const [sunrise, setSunrise] = useState("");
    const [sunset, setSunset] = useState("");

    const WEATHER_API_KEY = "922176d7fe6aa80866789eaaf2e9d26d";
    const cityName = "Minneapolis";



    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${WEATHER_API_KEY}`)
        .then(response => {
           setTemp(() => {
              const currentTemp = response.data.main.temp;
              return currentTemp;
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }, []);

    useEffect(() => {

        axios.get("https://api.sunrise-sunset.org/json?lat=44.9778&lng=-93.2650&date=2021-03-14")
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
            <h2>Temperature</h2>
            {/* Degrees in F : <p>{temp}&#8457;</p> */}
            <p>{temp} Kelvin</p>
            <h2>Sunrise</h2>
            <p>{sunrise} UTC</p>
            <h2>Sunrise</h2>
            <p>{sunset} UTC</p>

        </div>
    )

}

export default MainScreen;