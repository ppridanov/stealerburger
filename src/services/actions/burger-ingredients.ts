import { getData } from "../../utils/api";
import { apiURL } from "../../utils/constants";
import { AppDispatch, AppThunk } from "../../types";

export const GET_INGREDIENTS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';
export const SET_INGREDIENT_TO_MODAL: 'SET_INGREDIENT_TO_MODAL' = 'SET_INGREDIENT_TO_MODAL';
export const REMOVE_INGREDIENT_FROM_MODAL: 'REMOVE_INGREDIENT_FROM_MODAL' = 'REMOVE_INGREDIENT_FROM_MODAL';

export const getIngredients = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })
        getData(`${apiURL}/ingredients`)
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
                        ingredients: data.data,
                    })
                } else {
                    dispatch({ type: GET_INGREDIENTS_FAILED })
                }
            })
            .catch(err => {
                console.log(err)
                dispatch({ type: GET_INGREDIENTS_FAILED })
            })
    }
}

export type TIngredientsThunkActions = ReturnType<typeof getIngredients>

