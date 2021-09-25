import {
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    GET_ORDER_REQUEST,
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    ADD_BUN_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
} from "../actions/burger-constructor";
import {calculateTotalPrice} from "../../utils/funcs";

const initialState = {
    order: null,
    orderRequest: false,
    orderFailed: false,

    ingredients: [],
    bun: null,

    totalPrice: 0
}

export const constructorReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ORDER_FAILED:
            return {
                ...state,
                orderFailed: true
            }
        case GET_ORDER_REQUEST:
            return {
                ...state,
                orderRequest: true
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                order: action.payload
            }
        case ADD_INGREDIENT_TO_CONSTRUCTOR:
            console.log(action);
            return {
                ...state,
                ingredients: [...state.ingredients, action.item],
            }
        case ADD_BUN_TO_CONSTRUCTOR:
            return {
                ...state,
                bun: action.item,
            }
        case REMOVE_INGREDIENT_FROM_CONSTRUCTOR:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.filter((item) => item.uuid !== action.id)
                ],
            }
        default:
            return state;
    }
}