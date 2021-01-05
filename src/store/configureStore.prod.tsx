/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "../reducers";

export const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory();
// const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(sagaMiddleware, router);

const configureStore = initialState => {
  return createStore(createRootReducer, initialState, enhancer);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { configureStore, history, sagaMiddleware };
