import {
  ORDER_WS_CONNECTION_CLOSED,
  ORDER_WS_CONNECTION_ERROR,
  ORDER_WS_CONNECTION_SUCCESS,
  ORDER_WS_GET_MESSAGE
} from "../services/actions/wsOrders";

export type TOrdersWsConnectionSuccessAction = {
  readonly type: typeof ORDER_WS_CONNECTION_SUCCESS;
}

export type TOrdersWsConnectionErrorAction = {
  readonly type: typeof ORDER_WS_CONNECTION_ERROR;
}

export type TOrdersWsConnectionClosedAction = {
  readonly type: typeof ORDER_WS_CONNECTION_CLOSED;
}

export type TOrdersWsGetMessageAction = {
  readonly type: typeof ORDER_WS_GET_MESSAGE;
  readonly payload: []
}

export type TOrdersActions =
  TOrdersWsConnectionSuccessAction |
  TOrdersWsConnectionErrorAction |
  TOrdersWsConnectionClosedAction |
  TOrdersWsGetMessageAction;