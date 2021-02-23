import React, {useState} from 'react';
import './DateWrapper.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

function DateWrapper({date, changeDate}) {

    const [chosenDate, setChosenDate] = useState("");
    const [isSelected, setIsSelected] = useState(false);

    const months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];


    function handleDayClick(day) {
        setChosenDate(day);
        setIsSelected(true);
    }



    return (
        <div className="DateWrapper">
            <div className="DateModal">
                <DayPicker onDayClick={handleDayClick} />
                {console.log(isSelected)}
                {isSelected ? 
                <React.Fragment>
                    <p>You selected:</p>
                    <p>{chosenDate.toDateString()}</p>
                </React.Fragment>
                :
                <p>Choose a date</p>
                 }
                <button onClick={() => { changeDate(chosenDate)}}>Submit</button>
            </div>

            <p>{months[date.month]} {date.date}, {date.year}</p>
            <button>Change Date</button>
           

        </div>
    )
}

export default DateWrapper;