import React from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import Ingredient from "../ingredient/ingredient";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

class BurgerConstructor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            current: 'but'
        }
    }
    handleTabClick = (value) => {
        this.setState({current: value});
    }
  render() {
    return (
        <div className={ingredientsStyles.constr}>
          <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
            <div style={{ display: 'flex' }} className='mt-5'>
                <a className="link" href="#buts">
                    <Tab value="but" active={this.state.current === 'but'} onClick={this.handleTabClick}>
                        Булка
                    </Tab>
                </a>
                <a className="link" href="#sauces">
                    <Tab value="sauce" active={this.state.current === 'sauce'} onClick={this.handleTabClick}>
                        Соусы
                    </Tab>
                </a>
                <a className="link" href="#mains">
                    <Tab value="main" active={this.state.current === 'main'} onClick={this.handleTabClick}>
                        Начинки
                    </Tab>
                </a>
            </div>
          <div className={`${ingredientsStyles.ingredients} mt-10`}>
            <div className={ingredientsStyles.products}>
              <h3 className="text text_type_main-medium" id="buts">Булки</h3>
              <div className={ingredientsStyles.products__cont}>
                  {this.props.ingredient.filter((item) => item.type === 'bun').map((item) => <Ingredient {...item} key={item._id} />)}
              </div>
              <h3 className="text text_type_main-medium" id="sauces">Соусы</h3>
              <div className={ingredientsStyles.products__cont}>
                  {this.props.ingredient.filter((item) => item.type === 'sauce').map((item) => <Ingredient {...item} key={item._id} />)}
              </div>
              <h3 className="text text_type_main-medium" id="mains">Начинки</h3>
              <div className={ingredientsStyles.products__cont}>
                  {this.props.ingredient.filter((item) => item.type === 'main').map((item) => <Ingredient {...item} key={item._id} />)}
              </div>
            </div>
          </div>
        </div>
    );
  }

}

export default BurgerConstructor;
