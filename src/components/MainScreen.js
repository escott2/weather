import React, {useState} from 'react';
import useDidMountEffect from '../hooks/useDidMountEffect'
import axios from 'axios';
import spacetime from 'spacetime';
import './MainScreen.css';
import Header from './Header';
import Container from './Container';
import Footer from './Footer';

function MainScreen() {

    const today = new Date();

    //START STATE INITIALIZATION
    const [date, setDate] = useState({
      month: today.getMonth(),
      date: today.getDate(),
      year: today.getFullYear()
    });
    const [location, setLocation] = useState({
        city: "", 
        region: "", 
        country: "",
        lat: "",
        long: ""
    });
    const [locationData, setLocationData] = useState({
      enteredCity: "", 
      enteredRegion: "", 
      enteredCountry: "",
    });
    const [temp, setTemp] = useState(-500);
    const [sunrise, setSunrise] = useState("");
    const [sunset, setSunset] = useState("");
    const [dayLengthInMinutes, setDayLengthInMinutes] = useState("");
    const [timezone, setTimezone] = useState("");
    //END STATE INITIALIZATION

    //START VARIABLE DECLARATION
    // --- APIs
    const geoCodeAPI = {
      key: "cADuj9DK0OJq9A1eVBEeXI5566aRCAzG",
      base: "http://www.mapquestapi.com/geocoding/v1/",
    }
    const weatherAPI = {
      key: "922176d7fe6aa80866789eaaf2e9d26d",
      base: "https://api.openweathermap.org/data/2.5/"
    }
    const fullDate = `${date.year}-${date.month + 1}-${date.date}`;

    const HOURS_PER_DAY = 24;
    const MINUTES_PER_HOUR = 60;
    const MINUTES_PER_DAY = HOURS_PER_DAY * MINUTES_PER_HOUR;

    const nightLengthInMinutes = MINUTES_PER_DAY - dayLengthInMinutes;
    const nightLengthPercent = nightLengthInMinutes / MINUTES_PER_DAY;
    const nightLengthPercentRounded = Math.round(nightLengthPercent * 100) / 100;
    const dayLengthPercentRounded = Math.round(100 - (nightLengthPercentRounded * 100)) / 100;
    const nightLengthInHours = Math.round((nightLengthPercentRounded * HOURS_PER_DAY) * 10) / 10;
    const dayLengthInHours = Math.round((dayLengthPercentRounded * HOURS_PER_DAY) * 10) / 10;
    //END VARIABLE DECLARATION

     /*
      Mapquest Geolocation API Data

      --- SETS STATE ---
      locationData

      --- DEPENDENCIES ---
      performLocationValidation
    */
      useDidMountEffect(() => {
        let geoCodeURL = '';
        if (locationData.enteredCountry === "United States") {
          geoCodeURL = `${geoCodeAPI.base}address?key=${geoCodeAPI.key}&city=${locationData.enteredCity.replace(/\s/g, '+')}&state=${locationData.enteredRegion}&country=${locationData.enteredCountry.replace(/\s/g, '+')}`;
        } else {
          geoCodeURL = `${geoCodeAPI.base}address?key=${geoCodeAPI.key}&city=${locationData.enteredCity.replace(/\s/g, '+')}&country=${locationData.enteredCountry.replace(/\s/g, '+')}`;
        }
        axios.get(geoCodeURL)
          .then(response => {
            setLocationData((prevState) => {
              let city = response.data.results[0].locations[0].adminArea5;
              let isCityMatch = false;
              let isCityFound = true;
  
              if (!city) {
                city = "City not found";
                isCityMatch = false;
                isCityFound = false;
              }
  
              if (city.toUpperCase() === prevState.enteredCity.toUpperCase()) {
                isCityMatch = true;
              }
              
              return {
                ...prevState,
                city: city,
                isCityMatch: isCityMatch,
                isCityFound: isCityFound
              };
            });
          })
        .catch(function (error) {
          console.log(error);
        })
      }, [locationData.enteredCity, locationData.enteredRegion, locationData.enteredCountry]);
  


    /*
      Mapquest Geolocation API Data

      --- SETS STATE ---
      location

      --- DEPENDENCIES ---
      location.city, location.region, location.country
    */
    useDidMountEffect(() => {
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
        console.log(error);
      })
    }, [location.city, location.region, location.country]);


    /*
      OpenWeather API Data

      --- SETS STATE ---
      temp, timezone

      --- DEPENDENCIES ---
      location.lat, location.long
    */
    useDidMountEffect(() => {
      const weatherURL = `${weatherAPI.base}onecall?lat=${location.lat}&lon=${location.long}&exclude=hourly,daily,minutely&units=imperial&appid=${weatherAPI.key}`
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
        console.log(error);
        });
    }, [location.lat, location.long]);


    /*
      Sunrise-Sunset API Data

      --- SETS STATE ---
      sunrise, sunset, dayLengthInMinutes

      --- DEPENDENCIES ---
      location.lat, location.long, timezone
    */
    useDidMountEffect(() => {
        const sunURL = `https://api.sunrise-sunset.org/json?lat=${location.lat}&lng=${location.long}&date=${fullDate}`;
        axios.get(sunURL)
        .then(response => {
          setSunrise(() => {
            const sunriseTimeInUTC = response.data.results.sunrise.padStart(11, '0');
            const sunriseTimeInLocal = toLocalTime(fullDate, sunriseTimeInUTC, timezone)

            return sunriseTimeInLocal;
          });

          setSunset(() => {
            const sunsetTimeInUTC = response.data.results.sunset.padStart(11, '0');
            const sunsetTimeInLocal = toLocalTime(fullDate, sunsetTimeInUTC, timezone)
              
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
          console.log(error);
        })
    }, [date, location.lat, location.long, timezone]);


    //START FUNCTIONS

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
    
    /**
     * Returns total time represented in minutes
     * @param {number} hours 
     * @param {number} minutes 
     * @param {number} seconds 
     * @returns {number} total time represented in minutes
     */
    function timeToMinutes(hours, minutes, seconds) {
      if (seconds > 30) {
        minutes++
      }
      const totalMinutes = (hours * 60) + minutes
      return totalMinutes;
    }

    // --- EVENT HANDLERS

    function handleDateChange(day) {
        setDate(
         {
          month: day.getMonth(),
          date: day.getDate(),
          year: day.getFullYear()
        });
    }

    function handleLocationValidation(enteredLocation) {
      setLocationData((prevState) => {
        return {
          ...prevState,
          enteredCity: enteredLocation.city, 
          enteredRegion: enteredLocation.region,
          enteredCountry: enteredLocation.country,
        }
      })
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

    //END FUNCTIONS

    return (
        <div className="MainScreen">
            <Header location={location} locationData={locationData} changeLocation={handleLocationChange} validateLocation={handleLocationValidation} date={date} changeDate={handleDateChange}/>
            <Container temp={temp} dayHours={dayLengthInHours} nightHours={nightLengthInHours} dayLength={dayLengthPercentRounded} sunrise={sunrise} sunset={sunset}/> 
            <Footer />
        </div>
    )
}

export default MainScreen;