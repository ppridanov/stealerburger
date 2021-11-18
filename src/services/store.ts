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
import {configureStore} from "@reduxjs/toolkit";

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

const orderMiddleWare = ordersSocketMiddleWare(wsUrl, orderWsActions)

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(orderMiddleWare)
    }
})
export default store;