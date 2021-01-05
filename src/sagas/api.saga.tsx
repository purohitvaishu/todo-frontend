import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";
import { CALL_API } from "../actions/api.actions";
import config from "../config";

const identifyErrors = (status, body) => {
  if (status < 200 || status > 400) {
    throw new Error("Failed to fetch response from server");
  }

  if (body.error || body.errors) {
    throw new Error(body.error || body.errors);
  }
};

const getHeaders = (overrides = {}) => {
  return {
    "Content-Type": "application/json",
    ...overrides
  };
};

function* apiSaga(action) {
  const [request, success, failure] = action.types;
  const link: any = null;

  const requestUrl = `${config(link)}${action.endPoint}`;
  const requestBody = action.body || {};
  const requestConfig = {
    headers: getHeaders()
  };

  yield put({ type: request, body: requestBody });

  const args = ["get"].includes(action.method)
    ? [requestUrl, requestConfig]
    : [requestUrl, requestBody, requestConfig];

  try {
    const response = yield axios[action.method](...args);
    yield identifyErrors(response.status, response.data);
    const responseData = response.data.data || response.data;
    yield put({ type: success, data: responseData });
  } catch (error) {
    let payload = error;
    if (error.response && error.response.data) {
      payload = error.response.data;
    }

    yield put({ type: failure, payload });
  }
}

// eslint-disable-next-line func-names
// eslint-disable-next-line import/no-anonymous-default-export
export default function*() {
  yield takeEvery(CALL_API, apiSaga);
}
