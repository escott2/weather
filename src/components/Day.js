import React, {useState} from 'react';
import Proptypes from 'prop-types';
import './Day.css';
import {GoCalendar} from 'react-icons/go';
import DateModal from './DateModal';

Day.propTypes = {
    date: Proptypes.object,
    changeDate: Proptypes.func
}

function Day({date, changeDate}) {

    const [isDisplayModal, setIsDisplayModal] = useState(false);

    const months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];

    function handleShowModal() {
        setIsDisplayModal(true);
    }

    function handleHideModal() {
        setIsDisplayModal(false);
    }

    return (
        <div className="Day">
            {isDisplayModal && <DateModal changeDate={changeDate} hideModal={handleHideModal} />}
            <h2>{months[date.month]} {date.date}, {date.year}</h2>
            <button className="Day__button icon" onClick={handleShowModal}><GoCalendar /></button>            
        </div>
    )
}

export default Day;