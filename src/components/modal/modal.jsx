import React from 'react';
import ReactDOM from "react-dom";
import modalStyles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

function Modal(props) {
    const handleEscCloseModal = (e) => {
        if (e.keyCode === 27) {
            handleCloseModal();
        }
    }
    const handleCloseModal = () => {
        props.setModalIsOpen(false);
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
        <>
            <ModalOverlay onClose={handleCloseModal} />
            <div className={modalStyles.modal}>
                <div className={`${modalStyles.close} mt-15 mr-10`} onClick={handleCloseModal}><CloseIcon type={"primary"} /></div>
                <div>{props.children}</div>
            </div>
        </>,
        document.getElementById('modal-root')
    )
}

export default  Modal;