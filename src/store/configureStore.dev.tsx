/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { createLogger } from "redux-logger";
import createRootReducer from "../reducers";

const history = createBrowserHistory();

// const rootReducer = createRootReducer(history);

export const sagaMiddleware = createSagaMiddleware();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  }
}

declare const module: HotModule;
interface HotModule {
  hot?: { accept: (path: string, callback: () => void) => void };
}

const configureStore = initialState => {
  const middleware: any = [];
  const enhancers: any = [];

  middleware.push(sagaMiddleware);

  const logger = createLogger({
    level: "info",
    diff: true,
    collapsed: true
  });

  if (process.env.NODE_ENV !== "test") {
    middleware.push(logger);
  }

  const router = routerMiddleware(history);
  middleware.push(router);

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  const store = createStore(createRootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept("../reducers", () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require("../reducers").default)
    );
  }

  return store;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { configureStore, history, sagaMiddleware };
