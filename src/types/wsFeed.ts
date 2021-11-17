import {
  FEED_WS_CONNECTION_CLOSED,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_GET_MESSAGE
} from "../services/actions/wsFeed";

export type TFeedWsConnectionSuccessAction = {
  readonly type: typeof FEED_WS_CONNECTION_SUCCESS;
}

export type TFeedWsConnectionErrorAction = {
  readonly type: typeof FEED_WS_CONNECTION_ERROR;
  readonly error?: Event;
}

export type TFeedWsConnectionClosedAction = {
  readonly type: typeof FEED_WS_CONNECTION_CLOSED;
}

export type TFeedWsGetMessageAction = {
  readonly type: typeof FEED_WS_GET_MESSAGE;
  readonly payload: {
    orders: any,
    total: any,
    totalToday: any
  }
}

export type TFeedActions =
  TFeedWsConnectionSuccessAction |
  TFeedWsConnectionErrorAction |
  TFeedWsConnectionClosedAction |
  TFeedWsGetMessageAction;