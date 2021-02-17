import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./MainScreen.css";
import LightMeter from './LightMeter';
import Sunrise from './Sunrise';
import Sunset from './Sunset';
import Attribution from './Attribution';


function MainScreen() {

    const today = new Date();

    const [temp, setTemp] = useState("70");
    const [sunrise, setSunrise] = useState("");
    const [sunset, setSunset] = useState("");
    const [dayLength, setDayLength] = useState("");
    const [date, setDate] = useState({
        month: today.getMonth(),
        date: today.getDate(),
        year: today.getFullYear()
    });



    const WEATHER_API_KEY = "922176d7fe6aa80866789eaaf2e9d26d";
    const cityName = "Minneapolis";
    const months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    const HOURS_PER_DAY = 24;
    const MINUTES_PER_HOUR = 60;
    const SECONDS_PER_MINUTES = 60;

   const nightLength = {
        hours: HOURS_PER_DAY - Number(dayLength.substring(0,2)),
        minutes: MINUTES_PER_HOUR - Number(dayLength.substring(3,5)),
        seconds: SECONDS_PER_MINUTES - Number(dayLength.substring(6,9)),
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

              let sunriseTimeUTC = response.data.results.sunrise.padStart(11, '0');
              let hourUTC = Number(sunriseTimeUTC.slice(0, 2));

                if (sunriseTimeUTC.substring(9) === "PM") {
                    hourUTC = hourUTC + 12;
                }

              const selectedDate = new Date(date.year, date.month, date.date);
              const offset = selectedDate.getTimezoneOffset() / 60; 
              const hour = String(hourUTC - offset);
              //Figure out AM/PM
              let sunriseTime = sunriseTimeUTC.slice(2, 5);
              sunriseTime = `${hour}${sunriseTime}`;
              
              return sunriseTime;
          });
          setSunset(() => {
            let sunsetTimeUTC = response.data.results.sunset.padStart(11, '0');
            let hourUTC = Number(sunsetTimeUTC.slice(0, 2));

                if (sunsetTimeUTC.substring(9) === "PM") {
                    hourUTC = hourUTC + 12;
                }

            const selectedDate = new Date(date.year, date.month, date.date);
            const offset = selectedDate.getTimezoneOffset() / 60; 
              
            let hour = hourUTC - offset;

              if (hour > 12) {
                hour = hour - 12;
              }

            let sunsetTime = sunsetTimeUTC.slice(2, 5);
            sunsetTime = `${String(hour)}${sunsetTime}`;
              
            return sunsetTime;
          });
          setDayLength(() => {
              const dayLength = response.data.results.day_length;
              return dayLength;
          });


        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }, []);





    return (
        <div className="MainScreen">
       
            <p>{months[date.month]} {date.date}, {date.year}</p>
            
            <Sunrise sunrise={sunrise}/>

            <p>{dayLength} hrs</p>
            
            <LightMeter temp={temp} />

            <p>{nightLength.hours}:{nightLength.minutes}:{String(nightLength.seconds).padStart(2, '0')} hrs</p>


            <Sunset sunset={sunset}/>

            <Attribution />
        </div>
    )

}

export default MainScreen;