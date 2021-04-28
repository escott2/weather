import React, { useState } from "react";
import PropTypes from "prop-types";
import { GoLocation } from "react-icons/go";
import { AiFillPlusCircle } from "react-icons/ai";
import "./Location.scss";
import StoredLocations from "./StoredLocations";
import Modal from "./Modal";
import LocationPicker from "./LocationPicker";

Location.propTypes = {
  location: PropTypes.object,
  changeLocation: PropTypes.func,
  locationData: PropTypes.object,
};

function Location({
  location,
  changeLocation,
  locationData,
  changeFormLocation,
  clearFormLocationData,
  saveLocation,
  savedLocations,
}) {
  const [isDisplayModal, setIsDisplayModal] = useState(false);

  const locationName =
    location.country === "United States" ? (
      <h2>
        {location.city}, {location.region}, {location.country}
      </h2>
    ) : (
      <h2>
        {location.city}, {location.country}
      </h2>
    );

  const locationNotSaved = !isSaved();

  function isSaved() {
    let isSaved = false;
    if (savedLocations !== null) {
      for (let i = 0; i < savedLocations.length; i++) {
        if (location.id === savedLocations[i].id) {
          isSaved = true;
        }
      }
    }
    return isSaved;
  }

  function handleClick() {
    setIsDisplayModal(true);
  }

  function handleSaveClick() {
    saveLocation();
  }

  function hideModal() {
    setIsDisplayModal(false);
    clearFormLocationData();
  }

  return (
    <div className="Location flex--column">
      {savedLocations && (
        <StoredLocations
          savedLocations={savedLocations}
          changeLocation={changeLocation}
        />
      )}
      {isDisplayModal && (
        <Modal hideModal={hideModal}>
          <LocationPicker
            changeLocation={changeLocation}
            hideModal={hideModal}
            location={location}
            locationData={locationData}
            changeFormLocation={changeFormLocation}
            saveLocation={saveLocation}
          />
        </Modal>
      )}
      {location.city ? (
        <div>
          <div
            className={
              locationNotSaved
                ? "location__title-wrapper location__title-wrapper--transform"
                : "location__title-wrapper"
            }
          >
            {locationName}
            {locationNotSaved && (
              <button
                className="icon icon-btn icon--plus-sign"
                onClick={handleSaveClick}
              >
                <AiFillPlusCircle aria-label="save-location" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <h2>Choose a location to get started!</h2>
      )}
      <button className="icon icon-btn icon--location" onClick={handleClick}>
        <GoLocation aria-label="choose-location" />
      </button>
    </div>
  );
}

export default Location;
