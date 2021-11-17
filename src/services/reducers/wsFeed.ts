import {
  FEED_WS_CONNECTION_CLOSED,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_GET_MESSAGE,
} from "../actions/wsFeed";

import {TFeedActions} from "../../types/wsFeed";
import {TFeedItem} from "../../types/user";


type TInitialState = {
  wsConnected: boolean;
  orders: TFeedItem[],
  total: number | null,
  totalToday: number | null
  error?: Event;
}

const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null
}

export const wsFeedReducer = (state = initialState, action: TFeedActions): TInitialState => {
  switch (action.type) {
    case FEED_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      }
    case FEED_WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.error
      }
    case FEED_WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      }
    case FEED_WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        error: undefined,
      }
    default:
      return state;
  }
}