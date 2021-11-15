import React, {SyntheticEvent} from 'react';
import ingredientStyle from './ingredient.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {TIngredient} from "../../types";

type TIngredientProps = {
    image: string;
    price: number;
    name: string;
    _id: string;
    onOpen: (e: SyntheticEvent) => void;
    type: string;
}

const Ingredient: React.FC<TIngredientProps> = (props) => {
    const location = useLocation();
    console.log(location)
    const {image, price, name, _id, onOpen, type} = props;
    const {ingredients, bun}: any = useSelector<any>(state => state.burgerConstructor);
    let ingredientsCount = ingredients.filter((item: TIngredient) => item._id === _id).length;
    let counter;

    if (type === 'bun' && bun && bun._id === _id) {
        counter = 2;
    } else if (type !== 'bun' && ingredientsCount) {
        counter = ingredientsCount
    } else {
        counter = '';
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
            onClick={onOpen}
            id={_id}
        >
            {counter && <Counter count={counter}/>}
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