export const ORDER_WS_CONNECTION_SUCCESS: 'ORDER_WS_CONNECTION_SUCCESS' = 'ORDER_WS_CONNECTION_SUCCESS';
export const ORDER_WS_CONNECTION_ERROR: 'ORDER_WS_CONNECTION_ERROR' = 'ORDER_WS_CONNECTION_ERROR';
export const ORDER_WS_CONNECTION_CLOSED: 'ORDER_WS_CONNECTION_CLOSED' = 'ORDER_WS_CONNECTION_CLOSED';
export const ORDER_WS_GET_MESSAGE: 'ORDER_WS_GET_MESSAGE' = 'ORDER_WS_GET_MESSAGE';
export const ORDER_WS_CONNECTION_START: 'ORDER_WS_CONNECTION_START' = 'ORDER_WS_CONNECTION_START';

export const orderWsConnectionStart = () => {
  return {
    type: ORDER_WS_CONNECTION_START
  }
}

export const orderWsConnectionSuccess = () => {
  return {
    type: ORDER_WS_CONNECTION_SUCCESS
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

export const orderWsGetMessage = (message: any) => {
  return {
    type: ORDER_WS_GET_MESSAGE,
    payload: message
  }
}