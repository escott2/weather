import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import './LocationPicker.css';

LocationPicker.propTypes = {
    validateLocation: PropTypes.func,
    changeLocation: PropTypes.func, 
    locationData: PropTypes.object,
    hideModal: PropTypes.func,
    location: PropTypes.object
};

function LocationPicker({validateLocation, changeLocation, locationData, hideModal, location}) {

    const [inputText, setInputText] = useState({
        city: "",
        region: "", 
        country: location.country
    });
    const [displayMessage, setDisplayMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [displayChoice, setDisplayChoice] = useState(false);
    const [displayLocateBtn, setDisplayLocateBtn] = useState(true);
    const [displaySubmit, setDisplaySubmit] = useState(false);
    const [userResponse, setUserResponse] = useState("");


    //If user searches for a city, clicks locate, and exits with the x, this will not rerender if they search for the same location again. Fix.
    useEffect(() => {
        if (locationData.city) {
            setDisplayMessage(true);
            console.log("ran");
            if (!locationData.isCityFound) {
                setInputText((prevState) => {
                    return {
                        ...prevState,
                        city: "",
                        region: ""
                    }
                });
                setMessage("Location not found. Please search again.");
            } else if (locationData.isCityFound && !locationData.isCityMatch) {
                setMessage(`Location not found. Did you mean to search for ${locationData.city}?`);
                setDisplayChoice(true);
            } else if (locationData.isCityMatch) {
                setMessage("Location found!");
                setDisplayLocateBtn(false);
                setDisplaySubmit(true);
            }
        }
    }, [locationData.isCityFound, locationData.city, locationData.isCityMatch]);

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

    function handleEditCountry() {
        setInputText({ 
            city: "",
            region: "", 
            country: ""
        })
    }

    function handleSelectChange(e) {
        const selectedResponse = e.target.value;
        setUserResponse(selectedResponse);
        e.preventDefault();
    }

    function handleLocateClick() {
        validateLocation(inputText);
    }

    function handleChoiceClick() {
        if (userResponse === "yes") {
            setInputText((prevState) => {
                return {
                    ...prevState,
                    city: locationData.city,
                    enteredRegion: locationData.region
                }
            });
            setDisplayLocateBtn(false);
            setDisplaySubmit(true);
            setMessage("Location found!");
        } else if (userResponse === "no") {
            setInputText((prevState) => {
                return {
                    ...prevState,
                    city: "",
                    region: ""
                }
            });
            setMessage("Location not found. Please search again.");
        }
        setDisplayChoice(false);

    }
    
    function handleSubmitClick() {
        changeLocation(inputText);
        hideModal();
        setDisplayMessage(false);
        setMessage("");
        setDisplayChoice(false);
        setUserResponse("");
        setDisplaySubmit(false);
        setDisplayLocateBtn(true);
    }

    return (
        <div className="LocationPicker">

            { inputText.country === "" ?
            
                <React.Fragment>
                    <h3>Country</h3>
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
                    <h3>State:</h3>
                    <RegionDropdown classes="LocationPicker__input" name="region" country={inputText.country} value={inputText.region} onChange={handleRegionChange}/>

                    {inputText.region !== "" &&
                        <React.Fragment>
                            <h3>City</h3>
                            <input className="LocationPicker__input" type="text" name="city" value={inputText.city} onChange={handleCityChange}></input>
                            {displayLocateBtn &&
                                <button className="Location__submit-btn" onClick={handleLocateClick}>Locate</button>
                            }
                        </React.Fragment>
                    }
                </React.Fragment>
            :
                <React.Fragment>
                    <h3>City</h3>
                    <input className="LocationPicker__input" type="text" name="city" value={inputText.city} onChange={handleCityChange}></input>
                    {displayLocateBtn &&
                                <button className="Location__submit-btn" onClick={handleLocateClick}>Locate</button>
                    }
                </React.Fragment>
            }

            {displayMessage &&
                <React.Fragment>
                    <p className="LocationPicker__message">{message}</p>
                    { displayChoice &&
                        <form>
                            <select value={userResponse} onChange={handleSelectChange}>
                                <option value="">-</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <button type="button" onClick={handleChoiceClick}>Choose</button>
                        </form>
                    }
                </React.Fragment>
            }
            
            {displaySubmit &&
                <button className="Location__submit-btn" onClick={handleSubmitClick}>submit</button>     
            }

        </div>
    );
}

export default LocationPicker;