import {GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS} from "../actions/users";
import {GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "../actions/burger-constructor";


const initialState = {
    auth: null,
    authRequest: false,
    authFailed: false
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_FAILED:
            return {
                ...state,
                authFailed: true
            }
        case GET_USER_REQUEST:
            return {
                ...state,
                authRequest: true
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                auth: action.payload
            }
        default:
            return state;
    }
}