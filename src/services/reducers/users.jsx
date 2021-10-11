import {GET_USER_FAILED, GET_USER_INFO, GET_USER_REQUEST, GET_USER_SUCCESS, SET_IS_AUTH} from "../actions/users";
import {deleteCookie, getCookie, setCookie} from "../../utils/funcs";

const initialState = {
    authRequest: false,
    authFailed: false,
    user: {},
    isAuth: false
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_FAILED:
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
                user: action.payload.user,
                authRequest: false,
                authFailed: false,
                isAuth: true
            }
        case GET_USER_INFO:
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name
            }
        default:
            return state;
    }
}