import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import './LocationPicker.css';

LocationPicker.propTypes = {
    changeLocation: PropTypes.func, 
    hideModal: PropTypes.func,
    locationData: PropTypes.object,
    location: PropTypes.object
};

function LocationPicker({validateLocation, changeLocation, locationData, hideModal, location}) {

    const [inputText, setInputText] = useState({
        city: "",
        region: "", 
        country: location.country
    });
    const [message, setMessage] = useState("");
    const [displayChoice, setDisplayChoice] = useState(false);
    const [userResponse, setUserResponse] = useState("");

                // if (userResponse === "yes") {
                //     setInputText((prevState) => {
                //         return {
                //             ...prevState,
                //             city: "",
                //             region: ""
                //         }
                //     });
                //     hideModal();
                // } else if (userResponse === "no") {
                //     setInputText((prevState) => {
                //         return {
                //             ...prevState,
                //             city: "",
                //             region: ""
                //         }
                //     });
                //     setMessage("Location not found. Please try again.");
                // }
  


    useEffect(() => {
        if (!locationData.isCityFound) {
            setInputText((prevState) => {
                return {
                    ...prevState,
                    city: "",
                    region: ""
                }
            });
            setMessage("Location not found. Please try again.");
        } else if (locationData.isCityFound && !locationData.isCityMatch) {
            setMessage(`Location not found. Did you mean to search for ${locationData.city}?`);
            setDisplayChoice(true);
        } else {
            setInputText((prevState) => {
                return {
                    ...prevState,
                    city: "",
                    region: ""
                }
            });
            // hideModal();
            setMessage("");
            setDisplayChoice(false);
        }
    }, [locationData.isCityFound, locationData.city, locationData.isCityMatch]);


    //
    useEffect(() => {
        if (userResponse === "yes") {
            setInputText((prevState) => {
                return {
                    ...prevState,
                    city: locationData.city
                }
            });
        } else {
            setInputText((prevState) => {
                return {
                    ...prevState,
                    city: "",
                    region: ""
                }
            });
        setMessage("Location not found. Please try again.");
        }

    }, [userResponse]);



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

    function handleLocate() {
        validateLocation(inputText);
    }
    
    function handleSubmit() {
        changeLocation(inputText);
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
        console.log(selectedResponse);
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
                        <button className="Location__submit-btn" onClick={handleLocate}>Locate</button>
                    </React.Fragment>
                }
                </React.Fragment>
                :
                <React.Fragment>
                    <h3>Enter a city</h3>
                    <input className="LocationPicker__input" type="text" name="city" value={inputText.city} onChange={handleCityChange}></input>
                    <button className="Location__submit-btn" onClick={handleLocate}>Locate</button>     
                </React.Fragment>
            }
            <p>{message}</p>
            { displayChoice &&
                <select value={userResponse} onChange={handleSelectChange}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            }
            
            <button className="Location__submit-btn" onClick={handleSubmit}>submit</button>     

        </div>
    );
}

export default LocationPicker;