import React from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

type TModalOverlayProps = {
    onClose: () => void
}

const ModalOverlay: React.FC<TModalOverlayProps> = (props) => {
        return (
            <div className={modalOverlayStyles.overlay} onClick={props.onClose}></div>
        )
}

export default  ModalOverlay;