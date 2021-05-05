import React, { useState } from "react";
import "./StoredLocations.scss";
import { RiArrowRightCircleFill } from "react-icons/ri";
import SelectWrapper from "../UI/SelectWrapper";

function StoredLocations({ savedLocations, changeLocation }) {
  const [chosenLocation, setChosenLocation] = useState("");

  const locationOptions = savedLocations.map((location) => {
    let locationName;
    if (location.country === "United States") {
      locationName = `${location.city}, ${location.region}, ${location.country}`;
    } else {
      locationName = `${location.city}, ${location.country}`;
    }

    return (
      <option key={location.id} value={location.id}>
        {locationName}
      </option>
    );
  });

  function handleSelectChange(e) {
    const selectedLocation = e.target.value;
    setChosenLocation(selectedLocation);
    e.preventDefault();
  }

  function handleClick() {
    const chosenLocationObject = savedLocations.filter(
      (location) => location.id === chosenLocation
    );
    changeLocation(chosenLocationObject[0]);
  }

  return (
    <div className="stored-locations">
      <form className="save-form">
        <SelectWrapper className="input">
          <select
            className="stored-locations__select"
            value={chosenLocation}
            onChange={handleSelectChange}
          >
            <option value="">-</option>
            {locationOptions}
          </select>
        </SelectWrapper>
        {chosenLocation && (
          <button
            className="icon icon-btn icon--arrow"
            onClick={handleClick}
            type="button"
          >
            <RiArrowRightCircleFill />
          </button>
        )}
      </form>
    </div>
  );
}

export default StoredLocations;
