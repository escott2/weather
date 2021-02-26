import React, {useState} from 'react';
import './DateWrapper.css';
// import {GoCalendar} from 'react-icons/fa';
import {GoCalendar} from 'react-icons/go';

import DateModal from './DateModal';


function DateWrapper({date, changeDate}) {

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
        <div className="DateWrapper">
            {isDisplayModal && <DateModal changeDate={changeDate} hideModal={handleHideModal} />}
            <h1>{months[date.month]} {date.date}, {date.year}</h1>
            <button className="DateWrapper__button" onClick={handleShowModal}><GoCalendar /></button>            
        </div>
    )
}

export default DateWrapper;