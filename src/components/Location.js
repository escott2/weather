import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {GoLocation} from 'react-icons/go';
import './Location.scss';
import Modal from './Modal';
import LocationPicker from './LocationPicker';


Location.propTypes = {
    location: PropTypes.object,
    changeLocation: PropTypes.func, 
    locationData: PropTypes.object
};

function Location({location, changeLocation, locationData, changeFormLocation, clearFormLocationData}) {

    const [isDisplayModal, setIsDisplayModal] = useState(true);

    function handleClick() {
        setIsDisplayModal(true);
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
        <div className="Location">
            {isDisplayModal && 
                <Modal hideModal={hideModal} clearFormLocationData={clearFormLocationData}>
                    <LocationPicker changeLocation={changeLocation} hideModal={hideModal} location={location} locationData={locationData} changeFormLocation={changeFormLocation}/>
                </Modal>
            }
            {location.city ? 
                locationName
            :
                <h2>Choose a location to get started!</h2> 
            }
            <button className="icon icon-btn" onClick={handleClick}><GoLocation /></button>
        </div>
    );
}

export default Location;