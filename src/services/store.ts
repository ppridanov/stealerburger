import { rootReducer } from "./reducers";
import { ordersSocketMiddleWare } from "./middlewares/ordersSocketMiddleWare";
import { configureStore } from "@reduxjs/toolkit";
import {orderWsActions} from "../utils/constants";

const orderMiddleWare = ordersSocketMiddleWare(orderWsActions)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(orderMiddleWare)
  }
})
export default store;