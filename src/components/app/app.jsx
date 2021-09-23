import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import {apiURL} from "../../utils/constants";
import {BurgerConstructorContext} from "../../services/burger-constructor-context";

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
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                    return Promise.reject(`Произошла ошибка: ${res.status}`);
                })
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
                    {!state.hasError && state.isLoading  && <h1 className={`${appStyles.error} text text_type_main-large text_color_sucess p-10`}>Загрузка данных</h1>}
                    {state.hasError && <h1 className={`${appStyles.error} text text_type_main-large text_color_error p-10`}>Произошла ошибка при загрузке данных</h1>}
                    {!state.hasError && !state.isLoading &&
                        <div className={appStyles.main__container}>
                            <BurgerConstructorContext.Provider value={{ingredients: state.data}}>
                                <BurgerIngredients />
                                <BurgerConstructor />
                            </BurgerConstructorContext.Provider>
                        </div>
                    }
                </div>
            </main>
        </div>
    );
}


export default App;
