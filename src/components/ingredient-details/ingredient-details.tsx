import ingredientDetailsStyle from './ingredient-detail.module.css';
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useSelector } from '../../hooks/store';
import { TIngredientDetailParams, TLocationState } from '../../utils/types';

function IngredientDetails() {
  const { ingredients } = useSelector((state) => state.burgerIngredients);
  const { id } = useParams<TIngredientDetailParams>();
  const ingredient = ingredients.find((item) => item._id === id);

  const history = useHistory();

  const location = useLocation<TLocationState>();
  const background = history.action === 'PUSH' && location.state && location.state.background;
  return (
    <>
      {!ingredient && (<h1>Загрузка...</h1>)}
      {ingredient && (
        <>
          <h1 className={`${ingredientDetailsStyle.title} ${!background && 'mt-30'} text text_color_primary text_type_main-large`} id={ingredient?._id}>Детали ингредиента</h1>
          <div className={ingredientDetailsStyle.body}>
            <img src={ingredient?.image_large} alt="" />
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
        </>
      )}
    </>
  );
}

export default IngredientDetails;