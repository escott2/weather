import React from 'react';
// import PropTypes from 'prop-types';
import './Modal.scss';
import {IoIosCloseCircle} from 'react-icons/io'

// Modal.propTypes = {

// };

    function Modal(props) {

    const clearFormLocationData = props.clearFormLocationData;

    function handleExit() {
        props.hideModal();
        clearFormLocationData();
    }

    return (
        <div className="Modal">
            <div className="Modal__wrapper">
                <button className="Modal__exit-btn" onClick={handleExit}><IoIosCloseCircle className="close-icon"/></button>
                {props.children}
            </div>      
        </div>
    );
}

export default Modal;