import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {GoLocation} from 'react-icons/go';
import './Location.css';
import Modal from './Modal';
import LocationPicker from './LocationPicker';


Location.propTypes = {
    location: PropTypes.object,
    changeLocation: PropTypes.func, 
    locationData: PropTypes.object
};

function Location({location, changeLocation, locationData, validateLocation}) {

    const [isDisplayModal, setIsDisplayModal] = useState(true);

    function handleClick() {
        setIsDisplayModal(true);
    }

    function hideModal() {
        setIsDisplayModal(false);
    }

    return (
        <div className="Location">
            {isDisplayModal && 
                <Modal hideModal={hideModal}>
                    <LocationPicker changeLocation={changeLocation} hideModal={hideModal} location={location} locationData={locationData} validateLocation={validateLocation}/>
                </Modal>
            }

            {/* <Modal hideModal={hideModal}>
                <LocationModal changeLocation={changeLocation} hideModal={hideModal}/>
            </Modal> */}
            { location.country === "United States" ?
                <h2>{location.city}, {location.region}, {location.country}</h2>
            :
                <h2>{location.city}, {location.country}</h2>
            }

            <button className="icon" onClick={handleClick}><GoLocation /></button>
           

        </div>
    );
}

export default Location;