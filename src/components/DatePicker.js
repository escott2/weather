import React, { useState } from "react";
import PropTypes from "prop-types";
import "./DatePicker.scss";
import DayPicker from "react-day-picker";
import "./custom-day-picker.scss";

DatePicker.propTypes = {
  changeDate: PropTypes.func,
  hideModal: PropTypes.func,
};

function DatePicker({ changeDate, hideModal }) {
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
    <div className="date-picker">
      <DayPicker onDayClick={handleDayClick} />
      {isSelected ? (
        <React.Fragment>
          <p className="date-picker__text">You selected:</p>
          <p className="date-picker__text">{chosenDate.toDateString()}</p>
          <button className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </React.Fragment>
      ) : (
        <h2 className="date-picker__text">
          Select a day to view sunrise and sunset times.
        </h2>
      )}
    </div>
  );
}

export default DatePicker;
