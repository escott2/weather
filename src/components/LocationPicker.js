import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import './LocationPicker.css';

LocationPicker.propTypes = {
    changeLocation: PropTypes.func, 
    hideModal: PropTypes.func
};

function LocationPicker({changeLocation, hideModal, location}) {

    const [inputText, setInputText] = useState({
        city: "",
        region: "", 
        country: location.country
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
        setInputText((prevState) => {
            return {
                ...prevState,
                city: "",
                region: ""
            }
        });
        hideModal();
    }

    function handleEditCountry() {
        setInputText({ 
            city: "",
            region: "", 
            country: ""
        })
    }

    return (
        <div className="LocationPicker">
            { inputText.country === "" ?
                <React.Fragment>
                    <h3>Choose a country:</h3>
                    <CountryDropdown classes="LocationPicker__input" name="country" value={inputText.country} onChange={handleCountryChange}/>
                </React.Fragment>
            :
                <React.Fragment>
                    <h3>Country:</h3>
                    <p>{inputText.country}</p>
                    <button className="Location__submit-btn" onClick={handleEditCountry}>edit</button>
                </React.Fragment>
            }
            
            { inputText.country === "United States" ?
                <React.Fragment>
                    <h3>Choose a state:</h3>
                    <RegionDropdown classes="LocationPicker__input" name="region" country={inputText.country} value={inputText.region} onChange={handleRegionChange}/>
                {/* </React.Fragment> */}

                {inputText.region !== "" &&
                    <React.Fragment>
                        <h3>Enter a city</h3>
                        <input className="LocationPicker__input" type="text" name="city" value={inputText.city} onChange={handleCityChange}></input>
                        <button className="Location__submit-btn" onClick={handleClick}>submit</button>
                    </React.Fragment>
                }
                </React.Fragment>
                :
                <React.Fragment>
                    <h3>Enter a city</h3>
                    <input className="LocationPicker__input" type="text" name="city" value={inputText.city} onChange={handleCityChange}></input>
                    <button className="Location__submit-btn" onClick={handleClick}>submit</button>     
                </React.Fragment>
            }
        </div>
    );
}

export default LocationPicker;