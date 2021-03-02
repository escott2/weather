import React, {useState} from 'react';
import {GoLocation} from 'react-icons/go';
import './Location.css';
import LocationModal from './LocationModal';

// import PropTypes from 'prop-types';

// Location.propTypes = {
    
// };

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
                <LocationModal changeLocation={changeLocation} hideModal={hideModal}/>
            }
            
            <h2>{location.city}, {location.state}</h2>
            <button onClick={handleClick}><GoLocation /></button>
           

        </div>
    );
}

export default Location;