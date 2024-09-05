import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { RegionDropdown } from "react-country-region-selector";
import "./LocationPicker.scss";
import SelectWrapper from "../UI/SelectWrapper";

LocationPicker.propTypes = {
  changeFormLocation: PropTypes.func,
  changeLocation: PropTypes.func,
  locationData: PropTypes.object,
  hideModal: PropTypes.func,
  location: PropTypes.object,
};

function LocationPicker({
  changeFormLocation,
  changeLocation,
  locationData,
  hideModal,
}) {
  const [inputText, setInputText] = useState({
    city: "",
    region: "",
  });
  const [displayMessage, setDisplayMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [displayChoice, setDisplayChoice] = useState(false);
  const [displayLocateBtn, setDisplayLocateBtn] = useState(true);
  const [displaySubmit, setDisplaySubmit] = useState(false);
  const [userResponse, setUserResponse] = useState("");

  //If user searches for a city, clicks locate, and exits with the x, this will not rerender if they search for the same location again. Fix.
  useEffect(() => {
    if (locationData.city) {
      setDisplayMessage(true);
      if (!locationData.isCityFound) {
        setInputText((prevState) => {
          return {
            ...prevState,
            city: "",
            region: "",
          };
        });
        setMessage({
          message: "Location not found. Please search again.",
          className: "location-picker__message--alert",
        });
      } else if (locationData.isCityFound && !locationData.isCityMatch) {
        setMessage({
          message: `Location not found. Did you mean to search for ${locationData.city}?`,
          className: "location-picker__message--alert",
        });
        setDisplayChoice(true);
      } else if (locationData.isCityMatch) {
        setMessage({
          message: "Location found!",
          className: "location-picker__message--info",
        });
        setDisplayLocateBtn(false);
        setDisplaySubmit(true);
      }
    }
  }, [locationData.isCityFound, locationData.city, locationData.isCityMatch]);

  function handleCityChange(e) {
    const newCity = e.target.value;
    setInputText((prevState) => {
      return {
        ...prevState,
        city: newCity,
      };
    });
    setDisplayMessage(false);
  }

  function handleRegionChange(val) {
    setInputText((prevState) => {
      return {
        ...prevState,
        region: val,
      };
    });
    setDisplayMessage(false);
  }

  function handleSelectChange(e) {
    const selectedResponse = e.target.value;
    setUserResponse(selectedResponse);
    e.preventDefault();
  }

  function handleLocateClick() {
    changeFormLocation(inputText);
  }

  function handleChoiceClick() {
    if (userResponse === "yes") {
      setInputText((prevState) => {
        return {
          ...prevState,
          city: locationData.city,
          enteredRegion: locationData.region,
        };
      });
      setDisplayLocateBtn(false);
      setDisplaySubmit(true);
      setMessage({
        message: "Location found!",
        className: "location-picker__message--info",
      });
    } else if (userResponse === "no") {
      setInputText((prevState) => {
        return {
          ...prevState,
          city: "",
          region: "",
        };
      });
      setMessage({
        message: "Location not found. Please search again.",
        className: "location-picker__message--alert",
      });
    }
    setDisplayChoice(false);
  }

  function handleSubmitClick() {
    changeLocation(inputText);
    setDisplayMessage(false);
    setMessage("");
    setDisplayChoice(false);
    setUserResponse("");
    setDisplaySubmit(false);
    setDisplayLocateBtn(true);
    hideModal();
  }

  return (
    <div className="location-picker">
      {!displaySubmit && (
        <React.Fragment>
          <React.Fragment>
            <h3>City</h3>
            <input
              className="input location-picker__input--location"
              type="text"
              name="city"
              value={inputText.city}
              onChange={handleCityChange}
            ></input>
            <h3>State</h3>
            <SelectWrapper className="input location-picker__input--location">
              <RegionDropdown
                classes="location-picker__input"
                name="region"
                country="United States"
                value={inputText.region}
                onChange={handleRegionChange}
              />
            </SelectWrapper>

            <React.Fragment>
              {inputText.region && inputText.city && displayLocateBtn && (
                <button className="btn locate-btn" onClick={handleLocateClick}>
                  Locate
                </button>
              )}
            </React.Fragment>
          </React.Fragment>
        </React.Fragment>
      )}

      {displayMessage && (
        <React.Fragment>
          <p className={`${message.className} message`}>{message.message}</p>
          {displayChoice && (
            <React.Fragment>
              <SelectWrapper className="input location-picker__input--user-response">
                <select
                  className="location-picker__input"
                  value={userResponse}
                  onChange={handleSelectChange}
                >
                  <option value="">-</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </SelectWrapper>

              {userResponse && (
                <button
                  className="btn"
                  type="button"
                  onClick={handleChoiceClick}
                >
                  Choose
                </button>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      )}

      {displaySubmit && (
        <React.Fragment>
          {/* --fix, location name will display incorrectly if typed incorrectly */}
          {/* {enteredLocationName} */}
          <button className="btn" onClick={handleSubmitClick}>
            Check Forecast
          </button>
        </React.Fragment>
      )}
    </div>
  );
}

export default LocationPicker;
