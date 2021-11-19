import { TIngredient } from "../../utils/types";
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
} from "../actions/burger-ingredients";

export type TGetIngredientsRequestAction = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export type TGetIngredientsSuccessAction = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
}

export type TGetIngredientsFailedAction = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TBurgerIngredientsActions =
  TGetIngredientsRequestAction |
  TGetIngredientsSuccessAction |
  TGetIngredientsFailedAction;