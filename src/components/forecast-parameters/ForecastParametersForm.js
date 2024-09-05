import React from "react";
import PropTypes from "prop-types";
import "./ForecastParametersForm.scss";
import Card from "../UI/Card";
import Location from "./Location";
import Date from "./Date";

ForecastParametersForm.propTypes = {
  location: PropTypes.object,
  changeLocation: PropTypes.func,
  date: PropTypes.object,
  changeDate: PropTypes.func,
  locationData: PropTypes.object,
};

function ForecastParametersForm({
  location,
  changeLocation,
  date,
  changeDate,
  locationData,
  changeFormLocation,
  clearFormLocationData,
  saveLocation,
  savedLocations,
  // forecastType,
}) {
  return (
    <div className="forecast-parameters-form">
      <div className="forecast-parameters-form__update-wrapper">
        <h2 className="forecast-parameters-form__update-message">
          Update in progress...
        </h2>
      </div>
      <Card className="forecast-parameters-form__card forecast-parameters-form__card--location">
        <Location
          location={location}
          changeLocation={changeLocation}
          clearFormLocationData={clearFormLocationData}
          changeFormLocation={changeFormLocation}
          locationData={locationData}
          saveLocation={saveLocation}
          savedLocations={savedLocations}
        />
      </Card>
      <Card className="forecast-parameters-form__card forecast-parameters-form__card--date">
        <Date date={date} changeDate={changeDate} />
      </Card>
    </div>
  );
}

export default ForecastParametersForm;
