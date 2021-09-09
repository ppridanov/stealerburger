import React from 'react';
import cStyle from './burger-constructor.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor() {
  return (
    <div className={cStyle.constr}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
        <ul className={`${cStyle.tabs} mt-5`}>
            <li className={cStyle.tab}><a href="" className={`${cStyle.tab__link} ${cStyle.active} text text_type_main-default pt-4 pb-4`}>Булки</a></li>
            <li className={cStyle.tab}><a href="" className={`${cStyle.tab__link} text text_type_main-default pt-4 pb-4`}>Соусы</a></li>
            <li className={cStyle.tab}><a href="" className={`${cStyle.tab__link} text text_type_main-default pt-4 pb-4`}>Начинки</a></li>
        </ul>
        <div className={`${cStyle.ingredients} mt-10`}>
            <div className={cStyle.products}>
                <h3 className="text text_type_main-medium">Булки</h3>
                <div className={`${cStyle.products__cont} pt-6`}>
                    <div className={cStyle.product}>
                        <Counter count={1} size="default" />
                        <img className={`${cStyle.image} pr-4 pl-4`} src="" alt=""/>
                        <div className={`${cStyle.price} mt-1 mb-1`}>
                            <span className='text text_type_digits-default mr-2'>20</span>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p className="text text_type_main-default mt-1 mb-10">Краторная булка N-200i</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default BurgerConstructor;
