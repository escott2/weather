import React, {useState, useEffect} from 'react';
import axios from 'axios';
import geoTz from 'geo-tz';
import spacetime from 'spacetime';
import './MainScreen.css';
import Header from './Header';
import Container from './Container';
import Footer from './Footer';

function MainScreen() {

    const today = new Date();

    const [date, setDate] = useState({
      month: today.getMonth(),
      date: today.getDate(),
      year: today.getFullYear()
    });
    const [location, setLocation] = useState({
        city: "Minneapolis", 
        region: "Minnesota", 
        country: "United States",
        lat: 44.986,
        long: -93.258
    });
    const [temp, setTemp] = useState(0);
    const [sunrise, setSunrise] = useState({});
    const [sunset, setSunset] = useState("");
    const [dayLengthInMinutes, setDayLengthInMinutes] = useState("");
    const [timezone, setTimezone] = useState("");
    // const [timezoneOffset, setTimezoneOffset] = useState("");


    const geoCodeAPI = {
      key: "cADuj9DK0OJq9A1eVBEeXI5566aRCAzG",
      base: "http://www.mapquestapi.com/geocoding/v1/",
    }

    const weatherAPI = {
      key: "922176d7fe6aa80866789eaaf2e9d26d",
      base: "https://api.openweathermap.org/data/2.5/"
    }

    //Time Constants
    const HOURS_PER_DAY = 24;
    const MINUTES_PER_HOUR = 60;
    const MINUTES_PER_DAY = HOURS_PER_DAY * MINUTES_PER_HOUR;

    const fullDate = `${date.year}-${date.month + 1}-${date.date}`;


    const nightLengthInMinutes = MINUTES_PER_DAY - dayLengthInMinutes;
    const nightLengthPercent = nightLengthInMinutes / MINUTES_PER_DAY;
    const nightLengthPercentRounded = Math.round(nightLengthPercent * 100) / 100;
    const dayLengthPercentRounded = Math.round(100 - (nightLengthPercentRounded * 100)) / 100;
    const nightLengthInHours = Math.round((nightLengthPercentRounded * HOURS_PER_DAY) * 10) / 10;
    const dayLengthInHours = Math.round((dayLengthPercentRounded * HOURS_PER_DAY) * 10) / 10;
    //Get timezone with lat and long, using geo-tz library
    //--- returns an array object. Timezone located at index 0.
    // const timezone = geoTz(location.lat, location.long);

 
    let spaceTime = spacetime("2021-03-16", "UTC");
    spaceTime = spaceTime.time('07:55pm');
    spaceTime = spaceTime.goto("Australia/Sydney");
    const convertedTime = spaceTime.time();
    console.log(convertedTime);
    /**
     * Returns local time
     * @param {string} date 
     * @param {string} timeInUTC - time in UTC
     * @param {string} timezone
     * @returns {string} - time converted from UTC to local timezone
     */
    function toLocalTime(date, timeInUTC, timezone) {
      let universalTime = spacetime(date, "UTC");
      universalTime = universalTime.time(timeInUTC);
      universalTime = universalTime.goto(timezone);
      const localTime = universalTime.time();
      return localTime;
    }


 

    //Geolocation API Call
    useEffect(() => {
      let geoCodeURL = '';
      if (location.country === "United States") {
        geoCodeURL = `${geoCodeAPI.base}address?key=${geoCodeAPI.key}&city=${location.city.replace(/\s/g, '+')}&state=${location.region}&country=${location.country.replace(/\s/g, '+')}`;
      } else {
        geoCodeURL = `${geoCodeAPI.base}address?key=${geoCodeAPI.key}&city=${location.city.replace(/\s/g, '+')}&country=${location.country.replace(/\s/g, '+')}`;
      }
      axios.get(geoCodeURL)
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
    }, [location.city, location.region, location.country]);


    //Weather API Call
    useEffect(() => {
        // const weatherURL = `${weatherAPI.base}weather?lat=${location.lat}&lon=${location.long}&units=imperial&appid=${weatherAPI.key}`
        const weatherURL = `${weatherAPI.base}onecall?lat=${location.lat}&lon=${location.long}&exclude=hourly,daily,minutely&units=imperial&appid=${weatherAPI.key}`
        console.log(weatherURL);
        axios.get(weatherURL)
        .then(response => {
          setTemp(() => {
            let currentTemp = response.data.current.temp;
            currentTemp = Math.round(Number(currentTemp));
            return currentTemp;
          });
          setTimezone(() => {
            const newTimezone = response.data.timezone;
            return newTimezone;
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }, [location.lat, location.long]);

    //Sunrise and Sunset API Call
    useEffect(() => {
        // const fullDate = `${date.year}-${date.month + 1}-${date.date}`;
        const sunURL = `https://api.sunrise-sunset.org/json?lat=${location.lat}&lng=${location.long}&date=${fullDate}`;
        axios.get(sunURL)
        .then(response => {
           setSunrise(() => {

              let sunriseTimeInUTC = response.data.results.sunrise.padStart(11, '0');
              // console.log(sunriseTimeUTC);
              // const hourUTC_12 = Number(sunriseTimeUTC.slice(0, 2));
              // const period = sunriseTimeUTC.substring(9);
              // const hourUTC_24 = toHour_24(period, hourUTC_12);

              // const selectedDate = new Date(date.year, date.month, date.date);
              // const offset = selectedDate.getTimezoneOffset() / 60; 
    
              // const hour = hourUTC_24 - offset;

              // const sunriseHour = hour;
              // let sunriseMinute = Number(sunriseTimeUTC.substring(3,5));
              // const sunriseSecond = Number(sunriseTimeUTC.substring(6,9));
              
              // sunriseMinute = roundMinute(sunriseSecond, sunriseMinute);

              //NEW
              console.log(`UTC sunrise: ${sunriseTimeInUTC}`);
              const sunriseTimeInLocal = toLocalTime(fullDate, sunriseTimeInUTC, timezone)





              return {
                // sunriseHour: String(sunriseHour).padStart(2, '0'),
                // sunriseMinute: String(sunriseMinute).padStart(2, '0'),
                // sunriseSecond: String(sunriseSecond).padStart(2, '0'),
                // sunrisePeriod: period
                sunriseTime: sunriseTimeInLocal
              };
          });

          setSunset(() => {
            let sunsetTimeInUTC = response.data.results.sunset.padStart(11, '0');

            const sunsetTimeInLocal = toLocalTime(fullDate, sunsetTimeInUTC, timezone)


            // let hourUTC = Number(sunsetTimeUTC.slice(0, 2));

            //     if (sunsetTimeUTC.substring(9) === "PM") {
            //         hourUTC = hourUTC + 12;
            //     }

            // const selectedDate = new Date(date.year, date.month, date.date);
            // const offset = selectedDate.getTimezoneOffset() / 60; 
            
            // let hour = hourUTC - offset;

            //   if ( hour < 0 ) {
            //     hour = 24 + hour;
            //   }

            //   if (hour > 12) {
            //     hour = hour - 12;
            //   }

            // let sunsetTime = sunsetTimeUTC.slice(2, 5);
            // sunsetTime = `${String(hour)}${sunsetTime}`;
              
            return sunsetTimeInLocal;
          });

          setDayLengthInMinutes(() => {
              const dayLength = response.data.results.day_length;
              const dayLengthHour = Number(dayLength.substring(0, 2));
              const dayLengthMinutes = Number(dayLength.substring(3, 5));
              const dayLengthSeconds = Number(dayLength.substring(6, 9));
              const dayLengthInMinutes = timeToMinutes(dayLengthHour, dayLengthMinutes, dayLengthSeconds);
              return dayLengthInMinutes;
          });

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }, [date, location.lat, location.long, timezone]);


    // Refactor using Date() formatting
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




    function handleDateChange(day) {
        setDate(
         {
          month: day.getMonth(),
          date: day.getDate(),
          year: day.getFullYear()
        });
    }

    function handleLocationChange(newLocation) {
      setLocation((prevState) => {
        return {
          ...prevState,
          city: newLocation.city,
          region: newLocation.region,
          country: newLocation.country
        }
      });
    }

    return (
        <div className="MainScreen">
            <Header location={location} changeLocation={handleLocationChange} date={date} changeDate={handleDateChange}/>
            {sunrise.sunriseTime}
            {timezone}
            <Container temp={temp} dayHours={dayLengthInHours} nightHours={nightLengthInHours} dayLength={dayLengthPercentRounded} sunrise={sunrise} sunset={sunset}/> 
            <Footer />
        </div>
    )
}

export default MainScreen;