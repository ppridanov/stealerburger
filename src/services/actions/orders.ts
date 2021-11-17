import {AppDispatch, AppThunk} from "../../types";
import {getData} from "../../utils/api";
import {apiURL} from "../../utils/constants";

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const GET_ORDER_NUMBER_REQUEST: 'GET_ORDER_NUMBER_REQUEST' = 'GET_ORDER_NUMBER_REQUEST';
export const CLEAR_ORDER: 'CLEAR_ORDER' = 'CLEAR_ORDER';

export const getOrder: AppThunk = (orderId) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    })
    getData(`${apiURL}/orders/${orderId}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Cannot get data from API. Status code: ${res.status}`);
      })
      .then(data => {
        if (data && data.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: data.data,
          })
        } else {
          dispatch({type: GET_ORDER_FAILED})
        }
      })
      .catch(err => {
        console.log(err)
        dispatch({type: GET_ORDER_FAILED})
      })
  }
}
