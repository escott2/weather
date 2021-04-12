import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './DateModal.scss';
import {IoIosCloseCircle} from 'react-icons/io'
import DayPicker from 'react-day-picker';
import './custom-day-picker.css';

DateModal.propTypes = {
    changeDate: PropTypes.func,
    hideModal: PropTypes.func
};

    function DateModal({changeDate, hideModal}) {

    
    const [chosenDate, setChosenDate] = useState("");
    const [isSelected, setIsSelected] = useState(false);

    function handleDayClick(day) {
        setChosenDate(day);
        setIsSelected(true);
    }

    function handleSubmit() {
        changeDate(chosenDate);
        hideModal();
    }

    function handleExit() {
        hideModal();
    }


    return (
        <div className="DateModal">
            <div className="DateModal__wrapper">
                <button className="DateModal__exit-btn icon-btn" onClick={handleExit}><IoIosCloseCircle className="close-icon" aria-label="close"/></button>
                <DayPicker onDayClick={handleDayClick} />
                {isSelected ? 
                    <React.Fragment>
                        <h2 className="modal-text">You selected:</h2>
                        <p className="modal-text">{chosenDate.toDateString()}</p>
                        <button className="DateModal__submit-btn" onClick={handleSubmit}>Submit</button>
                    </React.Fragment>
                    :
                    <h2 className="modal-text">Select a day to view sunrise and sunset times.</h2>
                }
            </div>      
        </div>
    );
}

export default DateModal;