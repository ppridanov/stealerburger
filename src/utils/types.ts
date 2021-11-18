import { Location } from 'history';
import { ThunkAction } from 'redux-thunk';

import { rootReducer } from "../services/reducers";
import { TConstructorActions } from '../services/types/burger-constructor';
import { TBurgerIngredientsActions } from '../services/types/burger-ingerdients';
import { TOrdersActions } from '../services/types/orders';
import { TUserActions } from '../services/types/user';

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

type TApplicationActions = TUserActions | TBurgerIngredientsActions | TConstructorActions | TOrdersActions;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    TApplicationActions
>
export type AppDispatch = <TReturnType>(action: TApplicationActions | AppThunk | undefined) => TReturnType;
export type RootState = ReturnType<typeof rootReducer>;