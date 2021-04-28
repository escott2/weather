import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Date.scss";
import { GoCalendar } from "react-icons/go";
import DatePicker from "./DatePicker";
import Modal from "./Modal";

Date.propTypes = {
  date: PropTypes.object,
  changeDate: PropTypes.func,
};

function Date({ date, changeDate }) {
  const [isDisplayModal, setIsDisplayModal] = useState(false);

  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  function handleShowModal() {
    setIsDisplayModal(true);
  }

  function handleHideModal() {
    setIsDisplayModal(false);
  }

  return (
    <div className="date flex--column">
      {isDisplayModal && (
        <Modal hideModal={handleHideModal}>
          <DatePicker changeDate={changeDate} hideModal={handleHideModal} />
        </Modal>
      )}
      <h2>
        {/* {months[date.month]} {date.date}, {date.year} */}
        {date.fullDateString}
      </h2>
      <button
        className="date__button icon icon-btn icon--calendar"
        onClick={handleShowModal}
      >
        <GoCalendar aria-label="choose-date" />
      </button>
    </div>
  );
}

export default Date;
