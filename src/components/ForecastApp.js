import React, { useState, useEffect } from "react";
import axios from "axios";
import spacetime from "spacetime";
import "./ForecastApp.scss";
import ForecastParametersForm from "./forecast-parameters/ForecastParametersForm";
import Main from "./forecast/Main";

function ForecastApp() {
  const today = new Date();
  const initialSavedLocations = JSON.parse(
    window.localStorage.getItem("savedLocations" || "[]")
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //START STATE INITIALIZATION
  const [date, setDate] = useState({
    month: today.getMonth(),
    date: today.getDate(),
    year: today.getFullYear(),
    fullDateString: `${
      months[today.getMonth()]
    } ${today.getDate()}, ${today.getFullYear()}`,
  });
  const [isOpenWeatherAPILoading, setIsOpenWeatherAPILoading] = useState(false);
  const [isSunAPILoading, setSunAPILoading] = useState(false);
  // const [displayLoader, setDisplayLoader] = useState(false);
  const [location, setLocation] = useState({
    city: "",
    region: "",
    country: "",
    lat: "",
    long: "",
  });
  const [savedLocations, setSavedLocations] = useState(initialSavedLocations);
  const [locationData, setLocationData] = useState({
    enteredCity: "",
    enteredRegion: "",
    enteredCountry: "",
  });

  //Change temp to include more weather data, ex: setDisplayCurrentWeather
  const [currentWeather, setCurrentWeather] = useState({ temp: -500 });
  const [hourlyWeatherData, setHourlyWeatherData] = useState({ temp: -500 });
  const [displayTemp, setDisplayTemp] = useState(true);
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [dayLengthInMinutes, setDayLengthInMinutes] = useState("");
  const [timezone, setTimezone] = useState("");
  //END STATE INITIALIZATION

  //START VARIABLE DECLARATION
  // --- APIs
  const geoCodeAPI = {
    key: "922176d7fe6aa80866789eaaf2e9d26d",
    baseURL: "https://api.openweathermap.org/geo/1.0/direct",
  };

  const weatherAPI = {
    key: "922176d7fe6aa80866789eaaf2e9d26d",
    base: "https://api.openweathermap.org/data/3.0/",
  };
  const displayLoader =
    isOpenWeatherAPILoading || isSunAPILoading ? true : false;
  const fullDate = `${date.year}-${date.month + 1}-${date.date}`;
  const HOURS_PER_DAY = 24;
  const MINUTES_PER_HOUR = 60;
  const MINUTES_PER_DAY = HOURS_PER_DAY * MINUTES_PER_HOUR;

  const nightLengthInMinutes = MINUTES_PER_DAY - dayLengthInMinutes;
  const nightLengthPercent = nightLengthInMinutes / MINUTES_PER_DAY;
  const nightLengthPercentRounded = Math.round(nightLengthPercent * 100) / 100;
  const dayLengthPercentRounded =
    Math.round(100 - nightLengthPercentRounded * 100) / 100;
  const nightLengthInHours =
    Math.round(nightLengthPercentRounded * HOURS_PER_DAY * 10) / 10;
  const dayLengthInHours =
    Math.round(dayLengthPercentRounded * HOURS_PER_DAY * 10) / 10;

  //END VARIABLE DECLARATION

  /*
      Local Storage
      --- SETS STATE ---

      --- DEPENDENCIES ---
    */
  useEffect(() => {
    window.localStorage.setItem(
      "savedLocations",
      JSON.stringify(savedLocations)
    );
  }, [savedLocations]);

  /*
      Mapquest Geolocation API Data
      edit -- fixing bug. This is going to use openweathermap api.

      --- SETS STATE ---
      locationData

      --- DEPENDENCIES ---
      locationData.enteredCity, locationData.enteredRegion, locationData.enteredCountry, geoCodeAPI.base, geoCodeAPI.key
    */
  useEffect(() => {
    if (
      locationData.enteredCity &&
      locationData.enteredRegion &&
      locationData.enteredCountry
    ) {
      let geoCodeURL = `${geoCodeAPI.baseURL}?q=Minneapolis,MN,USA&limit=1&appid=${geoCodeAPI.key}`;

      axios
        .get(geoCodeURL)
        .then((response) => {
          setLocationData((prevState) => {
            let city = response.data[0].name;
            const lat = response.data[0].lat;
            const lon = response.data[0].lon;

            let isCityMatch = false;
            let isCityFound = true;

            if (!city) {
              city = "City not found";
              isCityFound = false;
            }

            if (city.toUpperCase() === prevState.enteredCity.toUpperCase()) {
              isCityMatch = true;
            }

            return {
              ...prevState,
              lat,
              lon,
              city,
              isCityMatch,
              isCityFound,
            };
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [
    locationData.enteredCity,
    locationData.enteredRegion,
    locationData.enteredCountry,
    geoCodeAPI.baseURL,
    geoCodeAPI.key,
  ]);

  /*
      Mapquest Geolocation API Data

      --- SETS STATE ---
      location.lat and location.long

      --- DEPENDENCIES ---
      location.city, location.region, location.country, geoCodeAPI.base, geoCodeAPI.key
    */

  /*
      OpenWeather API Data

      --- SETS STATE ---
      temp, timezone

      --- DEPENDENCIES ---
      location.lat, location.long, weatherAPI.base, weatherAPI.key
    */
  useEffect(() => {
    if (locationData.lat && locationData.lon) {
      setIsOpenWeatherAPILoading(true);
      const weatherURL = `${weatherAPI.base}onecall?lat=${locationData.lat}&lon=${locationData.lon}&exclude=minutely&units=imperial&appid=${weatherAPI.key}`;
      axios
        .get(weatherURL)
        .then((response) => {
          setCurrentWeather(() => {
            let currentTemp = response.data.current.temp;
            currentTemp = Math.round(Number(currentTemp));
            const date = response.data.daily[0].dt;
            const highTemp = Math.round(response.data.daily[0].temp.max);
            const lowTemp = Math.round(response.data.daily[0].temp.min);
            const feelsLike = Math.round(response.data.current.feels_like);
            const windSpeed = response.data.current.wind_speed;
            const windDirection = response.data.current.wind_deg;
            const humidity = response.data.current.humidity;
            const icon = response.data.current.weather[0].icon;
            const condition = response.data.current.weather[0].main;
            const description = response.data.current.weather[0].description;

            return {
              temp: currentTemp,
              highTemp: highTemp,
              lowTemp: lowTemp,
              feelsLike: feelsLike,
              windSpeed: windSpeed,
              windDirection: windDirection,
              humidity: humidity,
              icon: icon,
              condition: condition,
              description: description,
              date: date,
            };
          });
          setTimezone(() => {
            const newTimezone = response.data.timezone;
            return newTimezone;
          });
          setHourlyWeatherData(() => {
            const hourlyWeatherArray = response.data.hourly;
            return hourlyWeatherArray;
          });
          setIsOpenWeatherAPILoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [locationData.lat, locationData.lon, weatherAPI.base, weatherAPI.key]);

  /*
      Sunrise-Sunset API Data

      --- SETS STATE ---
      sunrise, sunset, dayLengthInMinutes

      --- DEPENDENCIES ---
      date, location.lat, location.long, timezone, fullDate
    */

  useEffect(() => {
    if (locationData.lat && locationData.lon) {
      setSunAPILoading(true);
      const sunURL = `https://api.sunrise-sunset.org/json?lat=${locationData.lat}&lng=${locationData.lon}&date=${fullDate}`;
      axios
        .get(sunURL)
        .then((response) => {
          setSunrise(() => {
            const sunriseTimeInUTC = response.data.results.sunrise.padStart(
              11,
              "0"
            );
            const sunriseTimeInLocal = toLocalTime(
              fullDate,
              sunriseTimeInUTC,
              timezone
            );

            return sunriseTimeInLocal;
          });

          setSunset(() => {
            const sunsetTimeInUTC = response.data.results.sunset.padStart(
              11,
              "0"
            );
            const sunsetTimeInLocal = toLocalTime(
              fullDate,
              sunsetTimeInUTC,
              timezone
            );

            return sunsetTimeInLocal;
          });

          setDayLengthInMinutes(() => {
            const dayLength = response.data.results.day_length;
            const dayLengthHour = Number(dayLength.substring(0, 2));
            const dayLengthMinutes = Number(dayLength.substring(3, 5));
            const dayLengthSeconds = Number(dayLength.substring(6, 9));
            const dayLengthInMinutes = timeToMinutes(
              dayLengthHour,
              dayLengthMinutes,
              dayLengthSeconds
            );
            return dayLengthInMinutes;
          });
          setSunAPILoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [date, locationData.lat, locationData.lon, timezone, fullDate]);

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
      minutes++;
    }
    const totalMinutes = hours * 60 + minutes;
    return totalMinutes;
  }

  function capitalizeWord(word) {
    word = word.toLowerCase();
    const firstLetter = word[0].toUpperCase();
    const remainingLetters = word.substring(1);
    const capitalWord = firstLetter + remainingLetters;
    return capitalWord;
  }

  function capitalizeMultipleWords(words) {
    const wordsArray = words.split(" ");
    const formattedWordsArray = wordsArray.map((word) => capitalizeWord(word));
    const formattedWordsString = formattedWordsArray.join(" ");
    return formattedWordsString;
  }

  function formatCityName(name) {
    let formattedCity;
    if (name.includes(" ")) {
      formattedCity = capitalizeMultipleWords(name);
    } else {
      formattedCity = capitalizeWord(name);
    }
    return formattedCity;
  }

  function displayWeatherIfToday(date) {
    const isSameDate =
      `${date.getMonth()} ${date.getDate()} ${date.getFullYear}` ===
      `${today.getMonth()} ${today.getDate()} ${today.getFullYear}`;
    if (isSameDate) {
      setDisplayTemp(true);
    } else {
      setDisplayTemp(false);
    }
  }

  // --- EVENT HANDLERS

  function handleDateChange(day) {
    displayWeatherIfToday(day);
    setDate({
      month: day.getMonth(),
      date: day.getDate(),
      year: day.getFullYear(),
      fullDateString: `${
        months[day.getMonth()]
      } ${day.getDate()}, ${day.getFullYear()}`,
    });
  }

  function handleFormLocationChange(enteredLocation) {
    setLocationData((prevState) => {
      const formattedCity = formatCityName(
        enteredLocation.city.replace(/\s+/g, " ").trim()
      );
      return {
        ...prevState,
        enteredCity: formattedCity,
        enteredRegion: enteredLocation.region,
        enteredCountry: "United States",
      };
    });
  }

  function clearFormLocationData() {
    setLocationData({
      enteredCity: "",
      enteredRegion: "",
      enteredCountry: "",
    });
  }

  function handleLocationChange(newLocation) {
    setLocation((prevState) => {
      let locationName;
      if (newLocation.city && newLocation.region) {
        locationName = `${newLocation.city}, ${newLocation.region}`;
      }
      const formattedCity = formatCityName(
        newLocation.city.replace(/\s+/g, " ").trim()
      );

      return {
        ...prevState,
        city: formattedCity,
        region: newLocation.region,
        country: "United States",
        name: locationName,
        id: locationName.toLowerCase().replace(/\s+/g, "-"),
      };
    });
    clearFormLocationData();
  }

  function handleSaveLocation() {
    setSavedLocations((prevState) => {
      if (prevState) {
        return [...prevState, location];
      } else {
        return [location];
      }
    });
  }

  //END FUNCTIONS

  return (
    <div className="MainScreen">
      <ForecastParametersForm
        location={location}
        locationData={locationData}
        changeLocation={handleLocationChange}
        clearFormLocationData={clearFormLocationData}
        changeFormLocation={handleFormLocationChange}
        date={date}
        changeDate={handleDateChange}
        saveLocation={handleSaveLocation}
        savedLocations={savedLocations}
      />
      <Main
        currentWeather={currentWeather}
        hourlyWeatherData={hourlyWeatherData}
        dayHours={dayLengthInHours}
        nightHours={nightLengthInHours}
        dayLength={dayLengthPercentRounded}
        sunrise={sunrise}
        sunset={sunset}
        displayTemp={displayTemp}
        date={date}
        displayLoader={displayLoader}
        timezone={timezone}
        toLocalTime={toLocalTime}
      />
    </div>
  );
}

export default ForecastApp;
