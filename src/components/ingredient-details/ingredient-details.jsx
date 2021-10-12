import React, {useEffect, useMemo} from 'react';
import ingredientDetailsStyle from './ingredient-detail.module.css';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients, SET_INGREDIENT_TO_MODAL} from "../../services/actions/burger-ingredients";
import {isEmptyObj} from "../../utils/funcs";

function IngredientDetails() {
    const dispatch = useDispatch();
    const {ingredients, ingredientDetails} = useSelector(state => state.burgerIngredients);
    const {id} = useParams();
    let ingredient;
    useEffect(() => {
        if (ingredients.length <= 0) {
            dispatch(getIngredients())
        }
    }, []);
    useMemo(() => {
        if (!isEmptyObj(ingredientDetails)) {
            ingredient = ingredientDetails;
        } else {
            ingredient = ingredients.find((item) => item._id === id);
        }
    }, [ingredientDetails, ingredient, ingredients])

    return (
        <>
            {ingredient && (
                <div className={ingredientDetailsStyle.body}>
                    <img src={ingredient?.image_large} alt=""/>
                    <h5 className="text text_type_main-medium mt-4">{ingredient?.name}</h5>
                    <div className={`${ingredientDetailsStyle.composition} mt-8`}>
                        <div className={`${ingredientDetailsStyle.item} mr-5`}>
                            <span className="text text_color_inactive text_type_main-default">Калории,ккал</span>
                            <span className="text text_color_inactive text_type_digits-default mt-2">{ingredient?.calories}</span>
                        </div>
                        <div className={`${ingredientDetailsStyle.item} mr-5`}>
                            <span className="text text_color_inactive text_type_main-default">Белки, г</span>
                            <span className="text text_color_inactive text_type_digits-default mt-2">{ingredient?.proteins}</span>
                        </div>
                        <div className={`${ingredientDetailsStyle.item} mr-5`}>
                            <span className="text text_color_inactive text_type_main-default">Жиры, г</span>
                            <span className="text text_color_inactive text_type_digits-default mt-2">{ingredient?.fat}</span>
                        </div>
                        <div className={`${ingredientDetailsStyle.item} mr-5`}>
                            <span className="text text_color_inactive text_type_main-default">Углеводы, г</span>
                            <span className="text text_color_inactive text_type_digits-default mt-2">{ingredient?.carbohydrates}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default  IngredientDetails;