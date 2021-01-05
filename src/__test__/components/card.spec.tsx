/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { shallow } from "enzyme";
import Card from "../../components/Card";

describe("Test: Bucket", () => {
  test("container", () => {
    const props = {
      data: {
        bucketname: "",
        data: []
      }
    };

    const result = shallow(<Card {...props} />);
    expect(result.debug()).toMatchSnapshot();
  });
});
