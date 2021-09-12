import React from 'react';
import ReactDOM from "react-dom";
import modalStyles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function Modal(props) {
    if (!props.isOpen) return null;
    return ReactDOM.createPortal(
        <div className={modalStyles.modal}>
            <div className={`${modalStyles.close} mt-15 mr-10`} onClick={props.onCloseModal}><CloseIcon type={"primary"} /></div>
            <div className={modalStyles.content}></div>
        </div>,
        document.getElementById('modal-root')
    )
}

export default  Modal;