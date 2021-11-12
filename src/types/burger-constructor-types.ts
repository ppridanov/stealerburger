import {
  CLEAR_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  MOVE_INGREDIENT_IN_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR
} from "../services/actions/burger-constructor";

import {TConstructorIngredient} from "../utils/types";

export type TGetOrderAction = {
  readonly type: typeof GET_ORDER_REQUEST;
}

export type TGetOrderSuccessAction = {
  readonly type: typeof GET_ORDER_SUCCESS;
}

export type TGetOrderFailedAction = {
  readonly type: typeof GET_ORDER_FAILED;
}

export type TClearOrderAction = {
  readonly type: typeof CLEAR_ORDER;
}

export type TAddBunToConstructorAction = {
  readonly type: typeof ADD_BUN_TO_CONSTRUCTOR | typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  readonly item: TConstructorIngredient;
}

export type TRemoveIngredientFromConstructorAction = {
  readonly type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly payload: string;
}

export type TMoveIngredientInConstructorAction = {
  readonly type: typeof MOVE_INGREDIENT_IN_CONSTRUCTOR;
  readonly dragIndex: string;
  readonly hoverIndex: string;
}

export type TClearConstructorAction = {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}