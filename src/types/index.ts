import {Location} from 'history';
import {store} from "../services/store";
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {TUserActions} from "./user";
import {TBurgerIngredientsActions} from "./burger-ingerdients";
import {TConstructorActions} from "./burger-constructor";

export type TIngredient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v?: number;
    _id: string;
    index: number;
}


export type TLocationState = {
    background?: Location;
    state?: Location;
    location: Location;
}

export type TConstructorIngredient = TIngredient & {
    onOpen: () => {},
    uuid: string;
}

export type TConstructorItemIngredient = TIngredient & {
    uuid: string;
}

export type TMoveCards = {
    dragIndex: number,
    hoverIndex: number
}

export type TIngredientDetailParams = {
    id: string
}

export type TFormData = {
    name: string,
    email: string,
    password: string
}

export type TResetPasswordForm = Pick<TFormData, 'password'> & {
    token: string
}

export type TLoginForm = Omit<TFormData, 'name'>

export type TUser = {
    email: string;
    name: string;
}

type TApplicationActions = TUserActions | TBurgerIngredientsActions | TConstructorActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<
    ReturnType,
    Action,
    RootState,
    TApplicationActions
    >
  >;
