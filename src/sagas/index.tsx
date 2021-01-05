/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { fork } from "redux-saga/effects";
import { sagaMiddleware } from "../store/configureStore";
import apiSaga from "./api.saga";
import getSaga from "./get.saga";

function* rootSaga() {
  yield fork(apiSaga);
  yield fork(getSaga);
}

const runSaga = () => {
  sagaMiddleware.run(rootSaga);
};

export default runSaga;
