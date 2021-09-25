import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import {Provider} from "react-redux";
import {rootReducer} from "./services/reducers";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);
ReactDOM.render(
    <React.StrictMode>
        <DndProvider backend={HTML5Backend}>
            <Provider store={store}>
                <App/>
            </Provider>
        </DndProvider>

    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
