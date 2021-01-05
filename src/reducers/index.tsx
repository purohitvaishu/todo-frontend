/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

import popup from "./popup.reducers";

const history = createBrowserHistory();

const appReducer = combineReducers({
  router: connectRouter(history),
  popup
});

const createRootReducer = (state, action) => {
  return appReducer(state, action);
};

export default createRootReducer;
