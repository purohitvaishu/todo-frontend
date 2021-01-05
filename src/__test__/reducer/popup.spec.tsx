import reducer from "../../reducers/popup.reducers";
import {
  ADD_LIST_POPUP,
  EDIT_LIST_POPUP,
  DELETE_LIST_POPUP,
  GET_LIST_REQUEST,
  GET_LIST_FAILED,
  GET_LIST_SUCCESS,
  ADD_LIST_REQUEST,
  ADD_LIST_FAILED,
  ADD_LIST_SUCCESS
} from "../../actions/popup.actions";
import {
  initialState,
  getList,
  popupList,
  addList
} from "../../mockData/reducer.data";

describe("Popup: reducer", () => {
  test("set initial state", () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  describe("Popup function", () => {
    test("on request", () => {
      const action = { type: ADD_LIST_POPUP, data: popupList };
      expect(reducer(initialState, action)).toMatchSnapshot();
    });

    test("on success", () => {
      const action = { type: EDIT_LIST_POPUP, data: popupList };
      expect(reducer(initialState, action)).toMatchSnapshot();
    });

    test("on failure", () => {
      const action = { type: DELETE_LIST_POPUP, data: {} };
      expect(reducer(initialState, action)).toMatchSnapshot();
    });
  });

  describe("Get List", () => {
    test("on request", () => {
      const action = { type: GET_LIST_REQUEST, data: {} };
      expect(reducer(initialState, action)).toMatchSnapshot();
    });

    test("on success", () => {
      const action = { type: GET_LIST_SUCCESS, data: getList };
      expect(reducer(initialState, action)).toMatchSnapshot();
    });

    test("on failure", () => {
      const action = { type: GET_LIST_FAILED, data: {} };
      expect(reducer(initialState, action)).toMatchSnapshot();
    });
  });

  describe("Add List", () => {
    test("on request", () => {
      const action = { type: ADD_LIST_REQUEST, data: {} };
      expect(reducer(initialState, action)).toMatchSnapshot();
    });

    test("on success", () => {
      const action = { type: ADD_LIST_SUCCESS, data: addList };
      expect(reducer(initialState, action)).toMatchSnapshot();
    });

    test("on failure", () => {
      const action = { type: ADD_LIST_FAILED, data: {} };
      expect(reducer(initialState, action)).toMatchSnapshot();
    });
  });
});
