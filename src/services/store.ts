import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers";
import {wsUrl} from "../utils/constants";
import {
    ORDER_WS_CONNECTION_CLOSED,
    ORDER_WS_CONNECTION_ERROR,
    ORDER_WS_CONNECTION_START,
    ORDER_WS_CONNECTION_SUCCESS,
    ORDER_WS_GET_MESSAGE
} from "./actions/orders";
import {ordersSocketMiddleWare} from "../middlewares/ordersSocketMiddleWare";

const orderWsActions = {
    wsInit: ORDER_WS_CONNECTION_START,
    onOpen: ORDER_WS_CONNECTION_SUCCESS,
    onClose: ORDER_WS_CONNECTION_CLOSED,
    onError: ORDER_WS_CONNECTION_ERROR,
    onMessage: ORDER_WS_GET_MESSAGE
};


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, ordersSocketMiddleWare(wsUrl, orderWsActions)));

export const store = createStore(rootReducer, enhancer);

export default store;