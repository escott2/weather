import React, {useState} from 'react';
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
        <div>
            <input type="text" value={inputText} onChange={handleChange}></input>
            <button onClick={handleClick}>submit</button>
            <h2>{location.city}, {location.state}</h2>
        </div>
    );
}

export default LocationWrapper;