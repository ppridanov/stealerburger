import React from 'react';
import ReactDOM from "react-dom";
import modalOverlayStyles from './modal-overlay.module.css';

function ModalOverlay(props) {
    return ReactDOM.createPortal(
        <div className={modalOverlayStyles.overlay} onClick={props.onClose}></div>,
        document.getElementById('modal-root')
    )
}

export default  ModalOverlay;