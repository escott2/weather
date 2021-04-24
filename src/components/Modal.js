import React from "react";
import PropTypes from "prop-types";
import "./Modal.scss";
import { IoIosCloseCircle } from "react-icons/io";

Modal.propTypes = {
  hideModal: PropTypes.func,
};

function Modal({ hideModal, children }) {
  function handleExit() {
    hideModal();
  }

  return (
    <div className="Modal">
      <div className="Modal__wrapper flex--column">
        <button className="Modal__exit-btn icon-btn" onClick={handleExit}>
          <IoIosCloseCircle className="close-icon" aria-label="close" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
