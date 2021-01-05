/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { shallow } from "enzyme";
import Bucket from "../../pages/Bucket";

describe("Test: Bucket", () => {
  test("container", () => {
    const props = {
      getTodo: jest.fn(),
      list: {}
    };

    const result = shallow(<Bucket.WrappedComponent {...props} />);
    expect(result.debug()).toMatchSnapshot();
  });
});
