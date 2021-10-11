import {GET_USER_FAILED, GET_USER_INFO, GET_USER_REQUEST, GET_USER_SUCCESS, SET_IS_AUTH, DELETE_IS_AUTH} from "../actions/users";
import {setCookie, deleteCookie, getCookie} from "../../utils/funcs";

const initialState = {
    authRequest: false,
    authFailed: false,
    user: {
        name: "",
        email: ""
    },
    isAuth: Boolean(getCookie('token'))
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
                user: action.payload.user
            }
        case SET_IS_AUTH:
            setCookie('token', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            return {
                ...state,
                isAuth: true,
            }
        case DELETE_IS_AUTH:
            deleteCookie('token');
            localStorage.removeItem('refreshToken');
            return {
                ...state,
                isAuth: false
            }
        default:
            return state;
    }
}