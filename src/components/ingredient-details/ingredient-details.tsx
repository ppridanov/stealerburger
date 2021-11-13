import ingredientDetailsStyle from './ingredient-detail.module.css';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {isEmptyObj} from "../../utils/funcs";
import {TIngredient, TIngredientDetailParams} from "../../types";

function IngredientDetails() {
    const {ingredients, ingredientDetails}: any = useSelector<any>(state => state.burgerIngredients);
    const {id} = useParams<TIngredientDetailParams>();
    let ingredient;
    if (!isEmptyObj(ingredientDetails)) {
        ingredient = ingredientDetails;
    } else {
        ingredient = ingredients.find((item: TIngredient) => item._id === id);
    }
    return (
        <>
            {isEmptyObj(ingredientDetails) && (
                <h1 className={`${ingredientDetailsStyle.title}  mt-30 text text_color_primary text_type_main-large`}>Детали ингредиента</h1>
            )}
            {ingredient && (
                <div className={ingredientDetailsStyle.body}>
                    <img src={ingredient?.image_large} alt=""/>
                    <h5 className="text text_type_main-medium mt-4">{ingredient?.name}</h5>
                    <div className={`${ingredientDetailsStyle.composition} mt-8`}>
                        <div className={`${ingredientDetailsStyle.item} mr-5`}>
                            <span className="text text_color_inactive text_type_main-default">Калории,ккал</span>
                            <span
                                className="text text_color_inactive text_type_digits-default mt-2">{ingredient?.calories}</span>
                        </div>
                        <div className={`${ingredientDetailsStyle.item} mr-5`}>
                            <span className="text text_color_inactive text_type_main-default">Белки, г</span>
                            <span
                                className="text text_color_inactive text_type_digits-default mt-2">{ingredient?.proteins}</span>
                        </div>
                        <div className={`${ingredientDetailsStyle.item} mr-5`}>
                            <span className="text text_color_inactive text_type_main-default">Жиры, г</span>
                            <span
                                className="text text_color_inactive text_type_digits-default mt-2">{ingredient?.fat}</span>
                        </div>
                        <div className={`${ingredientDetailsStyle.item} mr-5`}>
                            <span className="text text_color_inactive text_type_main-default">Углеводы, г</span>
                            <span
                                className="text text_color_inactive text_type_digits-default mt-2">{ingredient?.carbohydrates}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default IngredientDetails;