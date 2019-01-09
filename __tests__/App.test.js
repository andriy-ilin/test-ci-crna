import "react-native";
import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";

describe("App snapshot", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("Text style", async () => {
    const wrapper = shallow(
      <Text
        style={{ color: "red" }}
        justifyContent="flex-end"
        alignContent="center"
        alignItems="center"
      >
        test
      </Text>
    );
    expect(wrapper.prop("style")).toMatchSnapshot();
  });
});
