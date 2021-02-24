import React, {useState} from 'react';
import './DateWrapper.css';
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
            <p>{months[date.month]} {date.date}, {date.year}</p>
            {console.log(isDisplayModal)}
            <button onClick={handleShowModal}>Change Date</button>
        </div>
    )
}

export default DateWrapper;