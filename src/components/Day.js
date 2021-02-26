import React, {useState} from 'react';
import './Day.css';
import {GoCalendar} from 'react-icons/go';

import DateModal from './DateModal';


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
            <h1>{months[date.month]} {date.date}, {date.year}</h1>
            <button className="Day__button" onClick={handleShowModal}><GoCalendar /></button>            
        </div>
    )
}

export default Day;