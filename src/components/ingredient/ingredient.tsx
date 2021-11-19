import React from 'react';
import ingredientStyle from './ingredient.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import { useSelector } from '../../hooks/store';

type TIngredientProps = {
    image: string;
    price: number;
    name: string;
    _id: string;
    type: string;
}

const Ingredient: React.FC<TIngredientProps> = (props) => {
    const location = useLocation();
    const {image, price, name, _id, type} = props;
    const {ingredients, bun} = useSelector(state => state.burgerConstructor);
    let ingredientsCount = ingredients.filter((item) => item._id === _id).length;
    let counter;

    if (type === 'bun' && bun && bun._id === _id) {
        counter = 2;
    } else if (type !== 'bun' && ingredientsCount) {
        counter = ingredientsCount
    } else {
        counter = 0;
    }

    const [{opacity}, ref] = useDrag({
        type: 'ingredients',
        item: {...props},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })
    return (
        <Link
            to={{pathname: `/ingredients/${_id}`, state: {background: location}}}
            ref={ref}
            draggable
            className={`${ingredientStyle.product}`}
            style={{opacity: opacity}}
            id={_id}
        >
            {counter !== 0 && <Counter count={counter}/>}
            <img className={`${ingredientStyle.image} pr-4 pl-4`} src={image} alt=""/>
            <div className={`${ingredientStyle.price} mt-1 mb-1`}>
                <span className='text text_type_digits-default mr-2'>{price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={`${ingredientStyle.name} text text_type_main-default mt-1 mb-10`}>{name}</p>
        </Link>
    )
}

export default Ingredient;