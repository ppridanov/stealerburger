import React from 'react';
import cStyle from './ingredient.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

class Ingredient extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const {image, price, name} = this.props;
        return (
            <div className={cStyle.product}>
                <Counter size="default" />
                <img className={`${cStyle.image} pr-4 pl-4`} src={image} alt=""/>
                <div className={`${cStyle.price} mt-1 mb-1`}>
                    <span className='text text_type_digits-default mr-2'>${price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default mt-1 mb-10">name</p>
            </div>
        )
    }
}

export default Ingredient;
