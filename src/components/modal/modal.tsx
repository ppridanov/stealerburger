import React, { SyntheticEvent } from 'react';
import ReactDOM from "react-dom";
import modalStyles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useHistory } from "react-router-dom";

type TModalProps = {
  title?: string,
}

const Modal: React.FC<TModalProps> = (props) => {
  const { children, title } = props;
  const history = useHistory();
  
  const back = (e: Event | SyntheticEvent) => {
    e.stopPropagation();
    history.goBack();
  };

  const handleEscCloseModal = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      back(e)
    }
  }

  React.useEffect(() => {
    document.addEventListener('keyup', handleEscCloseModal);
    return () => {
      document.removeEventListener('keyup', handleEscCloseModal);
    }
  })

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={(e) => back(e)} />
      <div className={`${modalStyles.modal} pt-10 pr-10 pl-10 pb-15`} id='modal'>
        <div className={modalStyles.header}>
          <h3 className={`${modalStyles.title} text text_type_main-large`}>{title}</h3>
          <div className={modalStyles.close} onClick={(e) => back(e)}><CloseIcon type={"primary"} /></div>
        </div>
        <div>{children}</div>
      </div>
    </>,
    document.getElementById('modal-root')!
  );
}

export default Modal;