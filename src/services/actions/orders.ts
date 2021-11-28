import {AppDispatch, AppThunk} from "../../utils/types";
import { apiURL } from "../../utils/constants";
import { getData, postOrderReq } from "../../utils/api";
import { TFeedItem } from "../types/user";

export const ORDER_WS_CONNECTION_SUCCESS: 'ORDER_WS_CONNECTION_SUCCESS' = 'ORDER_WS_CONNECTION_SUCCESS';
export const ORDER_WS_CONNECTION_ERROR: 'ORDER_WS_CONNECTION_ERROR' = 'ORDER_WS_CONNECTION_ERROR';
export const ORDER_WS_CONNECTION_CLOSED: 'ORDER_WS_CONNECTION_CLOSED' = 'ORDER_WS_CONNECTION_CLOSED';
export const ORDER_WS_GET_MESSAGE: 'ORDER_WS_GET_MESSAGE' = 'ORDER_WS_GET_MESSAGE';
export const ORDER_WS_CONNECTION_START: 'ORDER_WS_CONNECTION_START' = 'ORDER_WS_CONNECTION_START';
export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const GET_ORDER_NUMBER_REQUEST: 'GET_ORDER_NUMBER_REQUEST' = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS: 'GET_ORDER_NUMBER_SUCCESS' = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED: 'GET_ORDER_NUMBER_FAILED' = 'GET_ORDER_NUMBER_FAILED';
export const CLEAR_ORDER_NUMBER: 'CLEAR_ORDER_NUMBER' = 'CLEAR_ORDER_NUMBER';

export const orderWsConnectionStart = (url: string) => {
  return {
    type: ORDER_WS_CONNECTION_START,
    payload: url
  }
}

export const orderWsConnectionSuccess = () => {
  return {
    type: ORDER_WS_CONNECTION_SUCCESS,
  }
}

export const orderWsConnectionError = () => {
  return {
    type: ORDER_WS_CONNECTION_ERROR
  }
}

export const orderWsConnectionClosed = () => {
  return {
    type: ORDER_WS_CONNECTION_CLOSED
  }
}

export const orderWsGetMessage = (message: TFeedItem[]) => {
  return {
    type: ORDER_WS_GET_MESSAGE,
    payload: message
  }
}

export const getOrder = (orderNumber: string): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    })
    getData(`${apiURL}/orders/${orderNumber}`)
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
            orders: data.orders,
          })
        } else {
          dispatch({ type: GET_ORDER_FAILED })
        }
      })
      .catch(err => {
        console.log(err)
        dispatch({ type: GET_ORDER_FAILED })
      })
  }
}

export const orderWsActions = {
  wsInit: ORDER_WS_CONNECTION_START,
  onOpen: ORDER_WS_CONNECTION_SUCCESS,
  onClose: ORDER_WS_CONNECTION_CLOSED,
  onError: ORDER_WS_CONNECTION_ERROR,
  onMessage: ORDER_WS_GET_MESSAGE
};

export const postOrder = (idsArr: string[]): AppThunk => {
  return async function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST
    })
    await postOrderReq(idsArr)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_NUMBER_SUCCESS,
            payload: res.order.number
          })
        } else {
          dispatch({
            type: GET_ORDER_NUMBER_FAILED
          })
        }
      }
      )
      .catch(err => {
        console.log(err)
        dispatch({
          type: GET_ORDER_NUMBER_FAILED
        })
      })
  }
}