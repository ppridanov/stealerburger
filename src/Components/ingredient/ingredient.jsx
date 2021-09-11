import React from 'react';
import ingredientStyle from './ingredient.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
class Ingredient extends React.Component{
    render() {
        const {image, price, name} = this.props;
        return (
            <div className={ingredientStyle.product} >
                {/*<Counter />*/}
                <img className={`${ingredientStyle.image} pr-4 pl-4`} src={image} alt=""/>
                <div className={`${ingredientStyle.price} mt-1 mb-1`}>
                    <span className='text text_type_digits-default mr-2'>{price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default mt-1 mb-10">{name}</p>
            </div>
        )
    }
}
Ingredient.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}
export default Ingredient;