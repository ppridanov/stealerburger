import React from 'react';
import './app.css';
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import {data} from "../../utils/data";
class App extends React.Component {
    render() {
        return (
            <div className="App">
                <AppHeader />
                <main>
                    <div className="main__wrapper">
                        <div className="container pl-5 pr-5">
                            <div className="main__container">
                                <BurgerIngredients ingredient={data} />
                                <BurgerConstructor ingredient={data} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
