import React from "react";
import PropTypes from "prop-types";
import "./Header.scss";
import Location from "./Location";
import Date from "./Date";
import Card from "./UI/Card";

Header.propTypes = {
  location: PropTypes.object,
  changeLocation: PropTypes.func,
  date: PropTypes.object,
  changeDate: PropTypes.func,
  locationData: PropTypes.object,
};

function Header({
  location,
  changeLocation,
  date,
  changeDate,
  locationData,
  changeFormLocation,
  clearFormLocationData,
  saveLocation,
  savedLocations,
}) {
  return (
    <header>
      <Card className="header__card">
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
      <Card className="header__card">
        <Date date={date} changeDate={changeDate} />
      </Card>
    </header>
  );
}

export default Header;
