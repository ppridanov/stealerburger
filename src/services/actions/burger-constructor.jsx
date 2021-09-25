import {sendData} from "../../utils/api";
import {postOrderURL} from "../../utils/constants";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const ADD_BUN_TO_CONSTRUCTOR = 'ADD_BUN_TO_CONSTRUCTOR';
export const MOVE_INGREDIENT_IN_CONSTRUCTOR = 'MOVE_INGREDIENT_IN_CONSTRUCTOR';

export const postOrder = (idsArr) => {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        })
        sendData({
            url: postOrderURL,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: {ingredients: idsArr}
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                dispatch({
                    type: GET_ORDER_FAILED
                })
                throw new Error(`Something wrong: ${res.status}`)
            })
            .then(data => dispatch({
                type: GET_ORDER_SUCCESS,
                payload: data
            }))
            .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_ORDER_FAILED
                })
            })
    }
}