import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import Location from './Location';
import Day from './Day';

Header.propTypes = {
    location: PropTypes.object,
    changeLocation: PropTypes.func,
    date: PropTypes.object,
    changeDate: PropTypes.func, 
    locationData: PropTypes.object
    
};

function Header({location, changeLocation, date, changeDate, locationData, changeFormLocation, clearFormLocationData}) {
    return (
        <header>
            <Location location={location} changeLocation={changeLocation} clearFormLocationData={clearFormLocationData} changeFormLocation={changeFormLocation} locationData={locationData}/>
            <Day date={date} changeDate={changeDate} />
        </header>
    );
}

export default Header;