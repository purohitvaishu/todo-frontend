import {
  createTodo,
  editTodo,
  deleteTodo,
  getTodo,
  callPopup
} from "../../actions/popup.actions";
import { data, popup } from "../../mockData/action.data";

describe("Popup: action", () => {
  describe("for create", () => {
    test("call api", () => {
      expect(createTodo(data)).toMatchSnapshot();
    });
  });

  describe("for edit", () => {
    test("call api", () => {
      expect(editTodo(data, 1)).toMatchSnapshot();
    });
  });

  describe("for delete", () => {
    test("call api", () => {
      expect(deleteTodo(1)).toMatchSnapshot();
    });
  });

  describe("for get", () => {
    test("call api", () => {
      expect(getTodo()).toMatchSnapshot();
    });
  });

  describe("for popup", () => {
    test("call function", () => {
      expect(callPopup(popup)).toMatchSnapshot();
    });
  });
});
