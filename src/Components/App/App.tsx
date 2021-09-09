import React from 'react';
import logo from '../../logo.svg';
import './app.css';
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function App() {
  return (
    <div className="App">
      <AppHeader />
        <main>
            <div className="main__wrapper">
                <div className="container pl-5 pr-5">
                    <BurgerConstructor />
                    <BurgerIngredients />
                </div>
            </div>
        </main>
    </div>
  );
}

export default App;
