import {
  ORDER_WS_CONNECTION_CLOSED, ORDER_WS_CONNECTION_ERROR,
  ORDER_WS_CONNECTION_START,
  ORDER_WS_CONNECTION_SUCCESS, ORDER_WS_GET_MESSAGE
} from "../services/actions/orders";

export const apiURL: string = 'https://norma.nomoreparties.space/api';
export const wsURL: string = 'wss://norma.nomoreparties.space/orders';

export const orderWsActions = {
  wsInit: ORDER_WS_CONNECTION_START,
  onOpen: ORDER_WS_CONNECTION_SUCCESS,
  onClose: ORDER_WS_CONNECTION_CLOSED,
  onError: ORDER_WS_CONNECTION_ERROR,
  onMessage: ORDER_WS_GET_MESSAGE
};