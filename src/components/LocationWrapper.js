import React, {useState} from 'react';
import {GoLocation} from 'react-icons/go';
import './LocationWrapper.css';

// import PropTypes from 'prop-types';

// LocationWrapper.propTypes = {
    
// };

function LocationWrapper({location, changeLocation}) {

    const [inputText, setInputText] = useState("");

    function handleChange(e) {
        const newLocation = e.target.value;
        setInputText(newLocation);
    }

    function handleClick() {
        changeLocation(inputText)
    }

    return (
        <div className="LocationWrapper">
            <p>Enter a location</p>
            <input type="text" value={inputText} onChange={handleChange}></input>
            <button className="LocationWrapper__submit-btn" onClick={handleClick}>submit</button>
            <h2>{location.city}, {location.state}</h2>
            <GoLocation />
        </div>
    );
}

export default LocationWrapper;