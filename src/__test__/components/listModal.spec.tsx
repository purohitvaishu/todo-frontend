/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { shallow } from "enzyme";
import ListModal from "../../components/ListModal";

describe("Test: Bucket", () => {
  test("container", () => {
    const props = {
      getTodo: jest.fn(),
      list: {
        data: []
      }
    };

    const result = shallow(<ListModal.WrappedComponent {...props} />);
    expect(result.debug()).toMatchSnapshot();
  });
});
