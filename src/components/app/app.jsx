import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import {apiURL} from "../../utils/constants";

function App() {
    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: []
    })

    React.useEffect(() => {
        const getIngredients = async () => {
            setState(prevState => ({...prevState, isLoading: true, hasError: false, data: prevState.data}));
            await fetch(apiURL)
                .then(res => res.json())
                .then((res) => setState(prevState => ({...prevState, data: res.data, isLoading: false, hasError: false})))
                .catch(() => {
                    setState(prevState => ({ ...prevState, hasError: true, isLoading: false, data: prevState.data }));
                });
        }
        getIngredients();
    }, [])

    return (
        <div>
            <AppHeader />
            <main>
                <div className={`${appStyles.container} pl-5 pr-5`}>
                    <div className={appStyles.main__container}>
                        <BurgerIngredients ingredients={state.data} />
                        <BurgerConstructor ingredients={state.data} />
                    </div>
                </div>
            </main>
        </div>
    );
}


export default App;
