import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";


function App() {
    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: []
    })
    React.useEffect(() => {
        const getIngredients = async () => {
            setState({ ...state, hasError: false, isLoading: true });
            await fetch('https://norma.nomoreparties.space/api/ingredients')
                .then(res => res.json())
                .then((res) => setState({...state, data: res.data, isLoading: false, hasError: false}))
                .catch(e => {
                    setState({ ...state, hasError: true, isLoading: false });
                });
        }
        getIngredients();
    }, [state])

    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const handleOpenModal = () => {
        setModalIsOpen(true);
    }
    const handleCloseModal = () => {
        setModalIsOpen(false);
    }

    return (
        <div>
            <AppHeader />
            <main>
                <div className={`${appStyles.container} pl-5 pr-5`}>
                    <div className={appStyles.main__container}>
                        <BurgerIngredients ingredients={state.data} />
                        {console.log(state)}
                        <BurgerConstructor ingredients={state.data} onOpenModal={handleOpenModal} />
                    </div>
                </div>
                <ModalOverlay isOpen={modalIsOpen} onCloseModal={handleCloseModal} />
                <Modal isOpen={modalIsOpen} onCloseModal={handleCloseModal} />
            </main>
        </div>
    );
}


export default App;
