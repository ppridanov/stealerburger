import {
  ORDER_WS_CONNECTION_CLOSED,
  ORDER_WS_CONNECTION_ERROR,
  ORDER_WS_CONNECTION_SUCCESS,
  ORDER_WS_GET_MESSAGE
} from "../actions/wsOrders";

import {TOrdersActions} from "../../types/wsOrders";
import {TFeedItem} from "../../types/user";

type TInitialState = {
  wsConnected: boolean,
  orders: TFeedItem[],
  total: number,
  totalToday: number
}

const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0
}

export const wsOrdersReducer = (state = initialState, action: TOrdersActions): TInitialState => {
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
        orders: action.payload
      }
    default:
      return state;
  }
}