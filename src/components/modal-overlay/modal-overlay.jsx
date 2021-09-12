import React from 'react';
import ReactDOM from "react-dom";
import modalOverlayStyles from './modal-overlay.module.css';

function ModalOverlay(props) {
    if (!props.isOpen) return null;
    return ReactDOM.createPortal(
        <div className={modalOverlayStyles.overlay} onClick={props.onCloseModal}></div>,
        document.getElementById('modal-root')
    )
}

export default  ModalOverlay;