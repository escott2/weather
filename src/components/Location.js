import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {GoLocation} from 'react-icons/go';
import './Location.css';
import Modal from './Modal';
import LocationPicker from './LocationPicker';


Location.propTypes = {
    location: PropTypes.object,
    changeLocation: PropTypes.func
};

function Location({location, changeLocation}) {

    const [isDisplayModal, setIsDisplayModal] = useState(false);

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
                    <LocationPicker changeLocation={changeLocation} hideModal={hideModal}/>
                </Modal>
            }

            {/* <Modal hideModal={hideModal}>
                <LocationModal changeLocation={changeLocation} hideModal={hideModal}/>
            </Modal> */}
            <h2>{location.city}, {location.state}</h2>
            <button onClick={handleClick}><GoLocation /></button>
           

        </div>
    );
}

export default Location;