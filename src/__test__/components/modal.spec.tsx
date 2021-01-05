/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { shallow } from "enzyme";
import Modal from "../../components/Modal";

describe("Test: Bucket", () => {
  test("container", () => {
    const props = {
      callPopup: jest.fn(),
      createTodo: jest.fn(),
      editTodo: jest.fn(),
      list: []
    };

    const result = shallow(<Modal.WrappedComponent {...props} />);
    expect(result.debug()).toMatchSnapshot();
  });
});
