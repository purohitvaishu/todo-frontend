/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { shallow } from "enzyme";
import Header from "../../pages/Header";

describe("Test: Header", () => {
  test("container", () => {
    const props = {
      callPopup: jest.fn(),
      open: false
    };

    const result = shallow(<Header.WrappedComponent {...props} />);
    expect(result.debug()).toMatchSnapshot();
  });
});
