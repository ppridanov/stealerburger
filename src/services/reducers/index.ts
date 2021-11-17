import { combineReducers } from 'redux';
import {burgerIngredientsReducer} from "./burger-ingredients";
import {constructorReducer} from "./burger-constructor";
import {usersReducer} from "./users";
import {ordersReducer} from "./orders";


export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: constructorReducer,
    userData: usersReducer,
    orderData: ordersReducer
});