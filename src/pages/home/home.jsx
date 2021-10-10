import React from 'react';
import homeStyles from './home.module.css';
import AppHeader from "../../components/app-header/app-header";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";


export function Home() {
    return (
        <div>
            <AppHeader />
            <main>
                <div className={`container pl-5 pr-5`}>
                    <div className={homeStyles.main__container}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </div>
                </div>
            </main>
        </div>
    );
}

