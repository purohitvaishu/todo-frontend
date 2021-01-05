/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { shallow } from "enzyme";
import ProgressBar from "../../components/ProgressBar";

describe("Test: Bucket", () => {
  test("container", () => {
    const props = {
      value: 20
    };

    const result = shallow(<ProgressBar {...props} />);
    expect(result.debug()).toMatchSnapshot();
  });
});
