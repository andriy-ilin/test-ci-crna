import "react-native";
import React from "react";
import { MonoText } from "../components/StyledText";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly", async () => {
  expect(<MonoText>Snapshot test!</MonoText>).not.toBe(undefined);
});
