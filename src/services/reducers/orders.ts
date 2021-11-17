import {
  CLEAR_ORDER,
  CLEAR_ORDER_NUMBER,
  GET_ORDER_FAILED,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  ORDER_WS_CONNECTION_CLOSED,
  ORDER_WS_CONNECTION_ERROR,
  ORDER_WS_CONNECTION_SUCCESS,
  ORDER_WS_GET_MESSAGE
} from "../actions/orders";

import {TOrdersActions} from "../../types/orders";
import {TFeedItem} from "../../types/user";

type TInitialState = {
  wsConnected: boolean,
  orders: TFeedItem[],
  total: number,
  totalToday: number,
  order: TFeedItem | null,
  orderRequest: boolean,
  orderFailed: boolean,
  orderNumber: string | null,
  orderNumberRequest: boolean,
  orderNumberFailed: boolean
}

const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
  order: null,
  orderRequest: false,
  orderFailed: false,
  total: 0,
  totalToday: 0,
  orderNumber: null,
  orderNumberRequest: false,
  orderNumberFailed: false,

}

export const ordersReducer = (state = initialState, action: TOrdersActions): TInitialState => {
  switch (action.type) {
    case ORDER_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      }
    case ORDER_WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      }
    case ORDER_WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        orders: []
      }
    case ORDER_WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      }
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
        order: action.order
      }
    case GET_ORDER_NUMBER_REQUEST:
      return {
        ...state,
        orderRequest: true
      }
    case GET_ORDER_NUMBER_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        orderNumber: action.payload
      }
    case CLEAR_ORDER_NUMBER:
      return {
        ...state,
        orderNumber: null
      }
    case CLEAR_ORDER:
      return {
        ...state,
        order: null
      }
    default:
      return state;
  }
}