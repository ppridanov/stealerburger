import React from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import appStyles from '../app/app.module.css';
import Ingredient from "../ingredient/ingredient";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from "../../utils/data";

class BurgerIngredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'but',
        }
    }
    handleTabClick = (value) => {
        this.setState({ current: value });
    }
    //Здесь пока не понял как вешать клик на продукт и поднимать у него счетчик
    // handleProductClick = (e) => {
    //     let value = e.currentTarget.getAttribute('value');
    //     let type = e.currentTarget.getAttribute('type');
    //
    //     this.setState((prev) => ({
    //         ...prev,
    //         choicesIngredients: {
    //             ...prev.choicesIngredients,
    //     {_id: 1, type: type}
    //         }
    //     }))
    // }
    render() {
        return (
            <div className={ingredientsStyles.constr}>
                <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
                <div style={{ display: 'flex' }} className='mt-5'>
                    <a className={appStyles.link} href="#buts">
                        <Tab value="but" active={this.state.current === 'but'} onClick={this.handleTabClick}>
                            Булка
                        </Tab>
                    </a>
                    <a className={appStyles.link} href="#sauces">
                        <Tab value="sauce" active={this.state.current === 'sauce'} onClick={this.handleTabClick}>
                            Соусы
                        </Tab>
                    </a>
                    <a className={appStyles.link} href="#mains">
                        <Tab value="main" active={this.state.current === 'main'} onClick={this.handleTabClick}>
                            Начинки
                        </Tab>
                    </a>
                </div>
                <div className={`${ingredientsStyles.ingredients} mt-10`}>
                    <div className={ingredientsStyles.products}>
                        <h3 className="text text_type_main-medium" id="buts">Булки</h3>
                        <div className={ingredientsStyles.products__cont}>
                            {this.props.ingredients.filter((item) => item.type === 'bun').map((item) => <Ingredient {...item} key={item._id} />)}
                        </div>
                        <h3 className="text text_type_main-medium" id="sauces">Соусы</h3>
                        <div className={ingredientsStyles.products__cont}>
                            {this.props.ingredients.filter((item) => item.type === 'sauce').map((item) => <Ingredient {...item} key={item._id} />)}
                        </div>
                        <h3 className="text text_type_main-medium" id="mains">Начинки</h3>
                        <div className={ingredientsStyles.products__cont}>
                            {this.props.ingredients.filter((item) => item.type === 'main').map((item) => <Ingredient {...item} key={item._id} />)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
}

export default BurgerIngredients;
