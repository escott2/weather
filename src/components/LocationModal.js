import React, {useState} from 'react';

// import PropTypes from 'prop-types';

// LocationModal.propTypes = {
    
// };

function LocationModal({changeLocation, hideModal}) {

    const [inputText, setInputText] = useState("");

    function handleChange(e) {
        const newLocation = e.target.value;
        setInputText(newLocation);
    }

    function handleClick() {
        changeLocation(inputText)
        setInputText("");
        hideModal();
    }

    return (
        <div>
            <p>Enter a location</p>
            <input type="text" value={inputText} onChange={handleChange}></input>
            <button className="Location__submit-btn" onClick={handleClick}>submit</button>
            {/* <h2>{location.city}, {location.state}</h2> */}
     
        </div>
    );
}

export default LocationModal;