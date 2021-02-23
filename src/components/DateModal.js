import React, {useState} from 'react';
// import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

// DateModal.propTypes = {
    
// };

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


    return (
        <div className="DateModal">
            <DayPicker onDayClick={handleDayClick} />
            {isSelected ? 
                <React.Fragment>
                    <p>You selected:</p>
                    <p>{chosenDate.toDateString()}</p>
                </React.Fragment>
                :
                <p>Choose a date</p>
            }
            <button onClick={handleSubmit}>Submit</button>        
        </div>
    );
}

export default DateModal;