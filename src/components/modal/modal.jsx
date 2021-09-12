import React from 'react';
import ReactDOM from "react-dom";
import modalStyles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function Modal(props) {
    const handleEscCloseModal = (e) => {
        if (e.keyCode === 27) {
            props.onCloseModal();
        }
    }
    React.useEffect(() => {
        document.addEventListener('keyup', handleEscCloseModal);
        return () => {
            document.removeEventListener('keyup', handleEscCloseModal);
        }
    })
    if (!props.isOpen) {
        return null;
    }
    return ReactDOM.createPortal(
        <div className={modalStyles.modal}>
            <div className={`${modalStyles.close} mt-15 mr-10`} onClick={props.onCloseModal}><CloseIcon type={"primary"} /></div>
            <div className={modalStyles.content}>{props.children}</div>
        </div>,
        document.getElementById('modal-root')
    )
}

export default  Modal;