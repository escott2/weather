import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import Location from './Location';
import Day from './Day';

Header.propTypes = {
    location: PropTypes.object,
    changeLocation: PropTypes.func,
    date: PropTypes.object,
    changeDate: PropTypes.func
    
};

function Header({location, changeLocation, date, changeDate}) {
    return (
        <header>
            <Location location={location} changeLocation={changeLocation}/>
            <Day date={date} changeDate={changeDate} />
        </header>
    );
}

export default Header;