import {
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    GET_ORDER_REQUEST,
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
} from "../actions/burger-constructor";
import {calculateTotalPrice} from "../../utils/funcs";

const initialState = {
    order: null,
    orderRequest: false,
    orderFailed: false,

    chosenIngredients: [],

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
            return {
                ...state,
                chosenIngredients: [...state.chosenIngredients.concat(action.item)],
                totalPrice: calculateTotalPrice(state.chosenIngredients)
            }
        case REMOVE_INGREDIENT_FROM_CONSTRUCTOR:
            return {
                ...state,
                chosenIngredients: [
                    ...state.chosenIngredients.filter((item) => item.uuid !== action.id)
                ],
                totalPrice: calculateTotalPrice(state.chosenIngredients)
            }
        default:
            return state;
    }
}