import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import './LocationPicker.scss';

LocationPicker.propTypes = {
    changeFormLocation: PropTypes.func,
    changeLocation: PropTypes.func, 
    locationData: PropTypes.object,
    hideModal: PropTypes.func,
    location: PropTypes.object
};

function LocationPicker({changeFormLocation, changeLocation, locationData, hideModal, location}) {

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
            if (!locationData.isCityFound) {
                setInputText((prevState) => {
                    return {
                        ...prevState,
                        city: "",
                        region: ""
                    }
                });
                setMessage({
                    message: "Location not found. Please search again.",
                    className: "LocationPicker__message--alert"
                });
            } else if (locationData.isCityFound && !locationData.isCityMatch) {
                setMessage({
                    message: `Location not found. Did you mean to search for ${locationData.city}?`,
                    className: "LocationPicker__message--alert"
                });
                setDisplayChoice(true);
            } else if (locationData.isCityMatch) {
                setMessage({
                    message: "Location found!",
                    className: "LocationPicker__message"
                });
                setDisplayLocateBtn(false);
                setDisplaySubmit(true);
            }
        }
        // return () => {

        // }
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
        changeFormLocation(inputText);
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
            setMessage({
                message: "Location found!",
                className: "LocationPicker__message"
            });
        } else if (userResponse === "no") {
            setInputText((prevState) => {
                return {
                    ...prevState,
                    city: "",
                    region: ""
                }
            });
            setMessage({
                message: "Location not found. Please search again.",
                className: "LocationPicker__message--alert"
            });
        }
        setDisplayChoice(false);

    }
    
    function handleSubmitClick() {
        changeLocation(inputText);
        setDisplayMessage(false);
        setMessage("");
        setDisplayChoice(false);
        setUserResponse("");
        setDisplaySubmit(false);
        setDisplayLocateBtn(true);
        hideModal();
    }

    const enteredLocationName = locationData.enteredCountry === "United States" ?
    <p>{locationData.enteredCity}, {locationData.enteredRegion}, {locationData.enteredCountry}</p>
:
    <p>{locationData.enteredCity}, {locationData.enteredCountry}</p>

    return (
        <div className="LocationPicker">

            {!displaySubmit && 
                
                <React.Fragment>
                { inputText.country === "" ?
                
                    <React.Fragment>
                        <h3>Country</h3>
                        <CountryDropdown classes="LocationPicker__input" name="country" value={inputText.country} onChange={handleCountryChange}/>
                    </React.Fragment>
                :
                    <React.Fragment>
                        <h3>Country</h3>
                        <div className="flex--align-vertical">
                            <p>{inputText.country}</p>
                            <button className="btn edit-btn" onClick={handleEditCountry}>edit</button>
                        </div>
                    </React.Fragment>
                }
                
                { inputText.country === "United States" ?
                    <React.Fragment>
                        <h3>State</h3>
                        <RegionDropdown classes="LocationPicker__input" name="region" country={inputText.country} value={inputText.region} onChange={handleRegionChange}/>

                        {inputText.region !== "" &&
                            <React.Fragment>
                                <h3>City</h3>
                                <input className="LocationPicker__input" type="text" name="city" value={inputText.city} onChange={handleCityChange}></input>
                                {(inputText.country && inputText.region && inputText.city && displayLocateBtn) &&
                                    <button className="btn" onClick={handleLocateClick}>Locate</button>
                                }
                            </React.Fragment>
                        }
                    </React.Fragment>
                :
                    <React.Fragment>
                        <h3>City</h3>
                        <input className="LocationPicker__input" type="text" name="city" value={inputText.city} onChange={handleCityChange}></input>
                        {(inputText.country && inputText.city && displayLocateBtn) &&
                                    <button className="btn" onClick={handleLocateClick}>Locate</button>
                        }
                    </React.Fragment>
                }

                
                </React.Fragment>

            }

            {displayMessage &&
                <React.Fragment>
                    <p className={message.className}>{message.message}</p>
                    { displayChoice &&
                        <React.Fragment>
                            <select value={userResponse} onChange={handleSelectChange}>
                                <option value="">-</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>

                            {userResponse && 
                                <button className="btn" type="button" onClick={handleChoiceClick}>Choose</button>
                            }
                        </React.Fragment>
                    }
                </React.Fragment>
            }


            
            {displaySubmit &&
                <React.Fragment>
                    {enteredLocationName}
                    <button className="btn" onClick={handleSubmitClick}>Check Forecast</button>     
                </React.Fragment>
            }

        </div>
    );
}

export default LocationPicker;