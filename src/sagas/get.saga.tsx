import { put, takeEvery } from "redux-saga/effects";
import {
  EDIT_LIST_SUCCESS,
  ADD_LIST_SUCCESS,
  DELETE_LIST_SUCCESS,
  getTodo
} from "../actions/popup.actions";

function* fetchValues() {
  yield put(getTodo());
}

function* getSaga() {
  yield takeEvery(EDIT_LIST_SUCCESS, fetchValues);
  yield takeEvery(ADD_LIST_SUCCESS, fetchValues);
  yield takeEvery(DELETE_LIST_SUCCESS, fetchValues);
}

export default getSaga;
