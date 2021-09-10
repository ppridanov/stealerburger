import React from 'react';
import cStyle from './burger-ingredients.module.css';
import Ingredient from "../ingredient/ingredient";

class BurgerConstructor extends React.Component{
  render() {
    return (
        <div className={cStyle.constr}>
          <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
          <ul className={`${cStyle.tabs} mt-5`}>
            <li className={cStyle.tab}><a className={`${cStyle.tab__link} ${cStyle.active} text text_type_main-default pt-4 pb-4`}>Булки</a></li>
            <li className={cStyle.tab}><a className={`${cStyle.tab__link} text text_type_main-default pt-4 pb-4`}>Соусы</a></li>
            <li className={cStyle.tab}><a className={`${cStyle.tab__link} text text_type_main-default pt-4 pb-4`}>Начинки</a></li>
          </ul>
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
