import React from 'react';
import ReactDOM from "react-dom";
import modalStyles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function Modal(props) {
    return ReactDOM.createPortal(
        <div class={modalStyles.modal}>
            <div className={`${modalStyles.modal__close} mt-15 mr-10`}><CloseIcon type={"primary"} /></div>
            <div className={modalStyles.modal__content}>
            </div>
        </div>,
        document.getElementById('modal-root')
    )
}

export default  Modal;