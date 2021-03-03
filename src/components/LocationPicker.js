import React, {useState} from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';



import PropTypes from 'prop-types';

LocationPicker.propTypes = {
    changeLocation: PropTypes.func, 
    hideModal: PropTypes.func
};

function LocationPicker({changeLocation, hideModal}) {

    const [inputText, setInputText] = useState({
        city: "",
        region: "", 
        country: ""
    });

    function handleCityChange(e) {
        const newCity = e.target.value;
        setInputText((prevState) => {
            return {
                ...prevState,
                city: newCity      
            }
        });
    }

    function handleCountryChange(val) {
        setInputText((prevState) => {
            return {
                ...prevState,
                country: val
            }
        });
    }

    function handleRegionChange(val) {
        setInputText((prevState) => {
            return {
                ...prevState,
                region: val
            }
        });
    }

    function handleClick() {
        changeLocation(inputText)
        setInputText({
            city: "",
            region: "", 
            country: ""
        });
        hideModal();
    }

    return (
        <div>
            <p>Enter a city</p>
            <input type="text" name="city" value={inputText.city} onChange={handleCityChange}></input>
            <CountryDropdown name="country" value={inputText.country} onChange={handleCountryChange}/>
            <RegionDropdown name="region" country={inputText.country} value={inputText.region} onChange={handleRegionChange}/>
            <button className="Location__submit-btn" onClick={handleClick}>submit</button>     
        </div>
    );
}

export default LocationPicker;