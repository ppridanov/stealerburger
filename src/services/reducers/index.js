import { combineReducers } from 'redux';
import {burgerIngredientsReducer} from "./appReducer";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer
});