import {getData} from "../../utils/api";
import {apiURL} from "../../utils/constants";

export const GET_INGREDIENTS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_ITEMS_FAILED';

export const getIngredients = () => {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })
        getData(apiURL)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`Cannot get data from API. Status code: ${res.status}`);
            })
            .then(data => {
                if (data && data.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: data.data
                    })
                } else {
                    dispatch({type: GET_INGREDIENTS_FAILED})
                }
            })
            .catch(err => {
                console.log(err)
                dispatch({type: GET_INGREDIENTS_FAILED})
            })
    }
}