import React, {useEffect} from 'react';
import ingredientDetailsStyle from './ingredient-detail.module.css';
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/burger-ingredients";

function IngredientDetails(props) {
    const dispatch = useDispatch();
    const {ingredients} = useSelector(state => state.burgerIngredients);
    const {id} = useParams();
    console.log(id);
    let ingredient = ingredients.find(item => item._id === id);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    const {image_large, name, calories, carbohydrates, fat, proteins} = ingredient || props;
    return (
        <div className={ingredientDetailsStyle.body}>
            <img src={image_large} alt=""/>
            <h5 className="text text_type_main-medium mt-4">{name}</h5>
            <div className={`${ingredientDetailsStyle.composition} mt-8`}>
                <div className={`${ingredientDetailsStyle.item} mr-5`}>
                    <span className="text text_color_inactive text_type_main-default">Калории,ккал</span>
                    <span className="text text_color_inactive text_type_digits-default mt-2">{calories}</span>
                </div>
                <div className={`${ingredientDetailsStyle.item} mr-5`}>
                    <span className="text text_color_inactive text_type_main-default">Белки, г</span>
                    <span className="text text_color_inactive text_type_digits-default mt-2">{proteins}</span>
                </div>
                <div className={`${ingredientDetailsStyle.item} mr-5`}>
                    <span className="text text_color_inactive text_type_main-default">Жиры, г</span>
                    <span className="text text_color_inactive text_type_digits-default mt-2">{fat}</span>
                </div>
                <div className={`${ingredientDetailsStyle.item} mr-5`}>
                    <span className="text text_color_inactive text_type_main-default">Углеводы, г</span>
                    <span className="text text_color_inactive text_type_digits-default mt-2">{carbohydrates}</span>
                </div>
            </div>
        </div>
    )
}

export default  IngredientDetails;