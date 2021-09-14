import React from 'react';
import ReactDOM from "react-dom";
import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from "prop-types";

function ModalOverlay(props) {
    return ReactDOM.createPortal(
        <div className={modalOverlayStyles.overlay} onClick={props.onClose}></div>,
        document.getElementById('modal-root')
    )
}

ModalOverlay.propsTypes = {
    onClose: PropTypes.func.isRequired
}

export default  ModalOverlay;