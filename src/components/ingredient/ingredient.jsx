import React from 'react';
import ingredientStyle from './ingredient.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

function Ingredient(props) {
    const {image, price, name, _id} = props;

    return (
        <div className={ingredientStyle.product} onClick={props.onOpen} _id={_id} >
            {/*<Counter />*/}
            <img className={`${ingredientStyle.image} pr-4 pl-4`} src={image} alt=""/>
            <div className={`${ingredientStyle.price} mt-1 mb-1`}>
                <span className='text text_type_digits-default mr-2'>{price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${ingredientStyle.name} text text_type_main-default mt-1 mb-10`}>{name}</p>
        </div>
    )
}

Ingredient.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}
export default Ingredient;