import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

function App() {
    //
    // React.useEffect(() => {
    //     const getIngredients = async () => {
    //         setState(prevState => ({...prevState, isLoading: true, hasError: false, data: prevState.data}));
    //         await fetch(apiURL)
    //             .then(res => {
    //                 if (res.ok) {
    //                     return res.json()
    //                 }
    //                 return Promise.reject(`Произошла ошибка: ${res.status}`);
    //             })
    //             .then((res) => setState(prevState => ({...prevState, data: res.data, isLoading: false, hasError: false})))
    //             .catch(() => {
    //                 setState(prevState => ({ ...prevState, hasError: true, isLoading: false, data: prevState.data }));
    //             });
    //     }
    //     getIngredients();
    // }, [])

    return (
        <div>
            <AppHeader />
            <main>
                <div className={`${appStyles.container} pl-5 pr-5`}>
                        <div className={appStyles.main__container}>
                                <BurgerIngredients />
                                <BurgerConstructor />
                        </div>
                </div>
            </main>
        </div>
    );
}


export default App;
