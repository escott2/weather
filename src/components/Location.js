import React, {useState} from 'react';
import {GoLocation} from 'react-icons/go';
import './Location.css';

// import PropTypes from 'prop-types';

// Location.propTypes = {
    
// };

function Location({location, changeLocation}) {

    const [inputText, setInputText] = useState("");

    function handleChange(e) {
        const newLocation = e.target.value;
        setInputText(newLocation);
    }

    function handleClick() {
        changeLocation(inputText)
    }

    return (
        <div className="Location">
            <p>Enter a location</p>
            <input type="text" value={inputText} onChange={handleChange}></input>
            <button className="Location__submit-btn" onClick={handleClick}>submit</button>
            <h2>{location.city}, {location.state}</h2>
            <GoLocation />
        </div>
    );
}

export default Location;