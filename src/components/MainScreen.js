import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './MainScreen.css';
import Container from './Container';
import Location from './Location';
import Day from './Day';
import Sunrise from './Sunrise';
import Sunset from './Sunset';
import Attribution from './Attribution';


function MainScreen() {

    const today = new Date();

    const [location, setLocation] = useState(
      {
        city: "Minneapolis", 
        state: "Minnesota", 
        country: "United States",
        lat: undefined,
        long: undefined
      }
    );
    const [temp, setTemp] = useState("");
    const [sunrise, setSunrise] = useState("");
    const [sunset, setSunset] = useState("");
    //may not make sense in state.
    const [dayLength, setDayLength] = useState("");
    const [date, setDate] = useState({
        month: today.getMonth(),
        date: today.getDate(),
        year: today.getFullYear()
    });
    



    const WEATHER_API_KEY = "922176d7fe6aa80866789eaaf2e9d26d";
    const GEOCODE_API_KEY = "BipYncCG753nCC2wdpSNdjzKWErYoH3b"
    // const cityName = "Minneapolis";
    // const months = ["January","February","March","April","May","June","July",
    // "August","September","October","November","December"];
    const HOURS_PER_DAY = 24;
    const MINUTES_PER_HOUR = 60;
    const SECONDS_PER_MINUTES = 60;
    const MINUTES_PER_DAY = HOURS_PER_DAY * MINUTES_PER_HOUR;

   const nightLength = {
        hours: HOURS_PER_DAY - Number(dayLength.substring(0,2)),
        minutes: MINUTES_PER_HOUR - Number(dayLength.substring(3,5)),
        seconds: SECONDS_PER_MINUTES - Number(dayLength.substring(6,9)),
    }

    const sunriseTime = `${sunrise.sunriseHour}:${sunrise.sunriseMinute}`;
    const nightMinutes = timeToMinutes(nightLength.hours, nightLength.minutes, nightLength.seconds);
    const nightPercent = nightMinutes / MINUTES_PER_DAY;
    const nightPercentRounded = Math.round(nightPercent * 100) / 100;
    const dayPercentRounded = Math.round(100 - (nightPercentRounded * 100)) / 100;
    const nightHours = Math.round((nightPercentRounded * HOURS_PER_DAY) * 10) / 10;
    const dayHours = Math.round((dayPercentRounded * HOURS_PER_DAY) * 10) / 10;




    function roundMinute(second, minute) {
      if (second > 30) {
        minute++;
      }
      return minute;
    }

    function toHour_24(period, hour) {
        if (period === "PM" && hour !== 12) {
          hour = hour + 12;
        } 
        return hour;
    }

    function timeToMinutes(hours, minutes, seconds) {

      if (seconds > 30) {
        minutes++
      }

      const totalMinutes = (hours * 60) + minutes
      return totalMinutes;
    }




    useEffect(() => {
      axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=${GEOCODE_API_KEY}&city=${location.city}&state=MN&country=United States`)
      .then(response => {
        setLocation((prevState) => {
          return {
            ...prevState,
            lat: response.data.results[0].locations[0].latLng.lat,
            long: response.data.results[0].locations[0].latLng.lng
          }
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }, [location.city]);




    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location.city}&units=imperial&appid=${WEATHER_API_KEY}`)
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
    }, [location]);

    useEffect(() => {

        axios.get(`https://api.sunrise-sunset.org/json?lat=44.9778&lng=-93.2650&date=${date.year}-${date.month + 1}-${date.date}`)
        .then(response => {
           setSunrise(() => {

              let sunriseTimeUTC = response.data.results.sunrise.padStart(11, '0');
              const hourUTC_12 = Number(sunriseTimeUTC.slice(0, 2));
              const period = sunriseTimeUTC.substring(9);
              const hourUTC_24 = toHour_24(period, hourUTC_12);

              const selectedDate = new Date(date.year, date.month, date.date);
              const offset = selectedDate.getTimezoneOffset() / 60; 
    
              const hour = hourUTC_24 - offset;

              const sunriseHour = hour;
              let sunriseMinute = Number(sunriseTimeUTC.substring(3,5));
              const sunriseSecond = Number(sunriseTimeUTC.substring(6,9));
              
              sunriseMinute = roundMinute(sunriseSecond, sunriseMinute);

              return {
                sunriseHour: String(sunriseHour).padStart(2, '0'),
                sunriseMinute: String(sunriseMinute).padStart(2, '0'),
                sunriseSecond: String(sunriseSecond).padStart(2, '0')
              };
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

              if ( hour < 0 ) {
                hour = 24 + hour;
              }

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
    }, [date]);

    function handleDateChange(day) {
        setDate(
         {
          month: day.getMonth(),
          date: day.getDate(),
          year: day.getFullYear()
        });
    }

    function handleLocationChange(location) {
      setLocation((prevState) => {
        return {
          ...prevState,
          city: location
        }
      });

    }


    return (
        <div className="MainScreen">

            {/* Start Header */}
            <Location location={location} changeLocation={handleLocationChange}/>
            <Day date={date} changeDate={handleDateChange} />
            {/* End Header */}

            <Container temp={temp} dayHours={dayHours} nightHours={nightHours} dayLength={dayPercentRounded}/> 

            <div className="SunTimes">
              <Sunrise sunrise={sunriseTime}/>
              <Sunset sunset={sunset}/>
            </div>

            {/* Start Footer */}
            <Attribution />
            {/* End Footer */}

        </div>
    )

}

export default MainScreen;