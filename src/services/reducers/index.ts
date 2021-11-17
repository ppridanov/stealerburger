import { combineReducers } from 'redux';
import {burgerIngredientsReducer} from "./burger-ingredients";
import {constructorReducer} from "./burger-constructor";
import {usersReducer} from "./users";
import {wsOrdersReducer} from "./wsOrders";


export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: constructorReducer,
    userData: usersReducer,
    order: wsOrdersReducer
});