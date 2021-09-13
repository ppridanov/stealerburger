import React from 'react';
import ingredientDetailsStyle from './ingredient-detail.module.css';

function IngredientDetails(props) {
    const { image_large, name, calories, carbohydrates, fat, proteins } = props.data;
    console.log(props.data)
    return(
        <div className={`${ingredientDetailsStyle.detail} p-10`}>
            <h3 className={`${ingredientDetailsStyle.title} text text_type_main-large`}>Детали ингредиента</h3>
            <div className={ingredientDetailsStyle.body}>
                <img src={image_large   } alt=""/>
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
        </div>
    )
}

export default  IngredientDetails;