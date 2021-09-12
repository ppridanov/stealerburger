import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { data } from '../../utils/data';
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";


function App() {
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [modalContent, setModalContent] = React.useState()
    const handleOpenModal = () => {
        setModalIsOpen(true);

    }
    React.useEffect(() => {
        document.addEventListener('keyup', handleEscCloseModal);
        return () => {
            document.removeEventListener('keyup', handleEscCloseModal);
        }
    })
    const handleCloseModal = (e) => {
         setModalIsOpen(false);
    }
    const handleEscCloseModal = (e) => {
        e.keyCode === 27 && modalIsOpen && setModalIsOpen(false);
    }
    return (
        <div>
            <AppHeader />
            <main>
                <div className={`${appStyles.container} pl-5 pr-5`}>
                    <div className={appStyles.main__container}>
                        <BurgerIngredients ingredients={data} />
                        <BurgerConstructor ingredients={data} onOpenModal={handleOpenModal} />
                    </div>
                </div>
                <ModalOverlay isOpen={modalIsOpen} onCloseModal={handleCloseModal} />
                <Modal isOpen={modalIsOpen} onCloseModal={handleCloseModal} />
            </main>
        </div>
    );
}


export default App;
