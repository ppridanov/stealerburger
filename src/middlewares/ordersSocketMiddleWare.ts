import {Middleware} from "redux";
import {getCookie} from "../utils/funcs";

type wsActionsType = {
  wsInit: string,
  onOpen: string,
  onClose: string,
  onError: string,
  onMessage: string
}

export const ordersSocketMiddleWare = (wsUrl: string, wsActions: wsActionsType): Middleware => {
  return (store: any) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const {dispatch} = store;
      const {type, payload} = action;
      const {wsInit, onOpen, onClose, onError, onMessage} = wsActions;
      if (wsInit.match(type)) {
        console.log(payload)
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({type: onOpen, payload: event});
        };

        socket.onerror = event => {
          dispatch({type: onError, payload: event});
        };

        socket.onmessage = event => {
          const {data} = event;
          const parsedData = JSON.parse(data);
          const {success, ...restParsedData} = parsedData;

          dispatch({type: onMessage, payload: restParsedData});
        };

        socket.onclose = event => {
          dispatch({type: onClose, payload: event});
        };
      }

      next(action);
    };
  };
};