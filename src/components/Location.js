import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {GoLocation} from 'react-icons/go';
import {AiFillPlusCircle} from 'react-icons/ai';
import './Location.scss';
import StoredLocations from './StoredLocations';
import Modal from './Modal';
import LocationPicker from './LocationPicker';


Location.propTypes = {
    location: PropTypes.object,
    changeLocation: PropTypes.func, 
    locationData: PropTypes.object
};

function Location({location, changeLocation, locationData, changeFormLocation, clearFormLocationData, saveLocation, savedLocations}) {

    const [isDisplayModal, setIsDisplayModal] = useState(true);

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

    const locationName = location.country === "United States" ?
        <h2>{location.city}, {location.region}, {location.country}</h2>
    :
        <h2>{location.city}, {location.country}</h2>


    return (
        <div className="Location flex--column">
            {(savedLocations) && 
                <StoredLocations savedLocations={savedLocations} changeLocation={changeLocation}/>
            }
            {isDisplayModal && 
                <Modal hideModal={hideModal} clearFormLocationData={clearFormLocationData}>
                    <LocationPicker changeLocation={changeLocation} hideModal={hideModal} location={location} locationData={locationData} changeFormLocation={changeFormLocation} saveLocation={saveLocation}/>
                </Modal>
            }
            {location.city ? 
                <div className="flex--responsive">
                {locationName}
                <button className="icon icon-btn icon--plus-sign" onClick={handleSaveClick}><AiFillPlusCircle aria-label="save-location"/></button>
                </div>
            :
                <h2>Choose a location to get started!</h2> 
            }
            <button className="icon icon--orange icon-btn" onClick={handleClick}><GoLocation aria-label="choose-location" /></button>
        </div>
    );
}

export default Location;