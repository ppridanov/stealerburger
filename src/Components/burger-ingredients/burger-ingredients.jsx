import React from 'react';
import cStyle from './burger-ingredients.module.css';
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
        this.setState({current: value})
    }
  render() {
    return (
        <div className={cStyle.constr}>
          <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
            <div style={{ display: 'flex' }} className='mt-5'>
                <Tab value="but" active={this.state.current === 'but'} onClick={this.handleTabClick}>
                    One
                </Tab>
                <Tab value="sauce" active={this.state.current === 'sauce'} onClick={this.handleTabClick}>
                    Two
                </Tab>
                <Tab value="main" active={this.state.current === 'main'} onClick={this.handleTabClick}>
                    Three
                </Tab>
            </div>
          <div className={`${cStyle.ingredients} mt-10`}>
            <div className={cStyle.products}>
              <h3 className="text text_type_main-medium">Булки</h3>
              <div className={cStyle.products__cont}>
                  {this.props.ingredient.filter((item) => item.type === 'bun').map((item) => <Ingredient {...item} key={item._id} />)}
              </div>
              <h3 className="text text_type_main-medium">Соусы</h3>
              <div className={cStyle.products__cont}>
                  {this.props.ingredient.filter((item) => item.type === 'sauce').map((item) => <Ingredient {...item} key={item._id} />)}
              </div>
              <h3 className="text text_type_main-medium">Начинки</h3>
              <div className={cStyle.products__cont}>
                  {this.props.ingredient.filter((item) => item.type === 'main').map((item) => <Ingredient {...item} key={item._id} />)}
              </div>
            </div>
          </div>
        </div>
    );
  }

}

export default BurgerConstructor;
