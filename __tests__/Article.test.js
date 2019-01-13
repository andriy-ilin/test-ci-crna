import "react-native";
import React from "react";
import { Provider } from "mobx-react/native";
import { mount } from "enzyme";

import ArticleScreen from "../screens/ArticleScreen";
import HomeScreen, { Article } from "../screens/HomeScreen";
import stores from "../stores";

describe("Article snapshot", () => {
  jest.useFakeTimers();

  // it("renders HomeScreen", async () => {
  //   const rendered = renderer.create(<HomeScreen />).toJSON();
  //   expect(rendered).toMatchSnapshot();
  // });

  it("renders ArticleScreen", async () => {
    const rendered = mount(<ArticleScreen />);
    expect(rendered).toMatchSnapshot();
  });

  it("check ArticleScreen text inside", async () => {
    const wrapper = mount(<ArticleScreen />);
    const text = wrapper
      .find("Text")
      .at(1)
      .text();
    expect(text).toEqual("ArticleScreen");
  });

  it("Article snapshot", async () => {
    const wrapper = mount(
      <Provider {...stores}>
        <Article />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("Article props navigate what inject from MobX", async () => {
    const wrapper = mount(
      <Provider {...stores}>
        <Article />
      </Provider>
    );
    const {
      navigation: { goTo }
    } = wrapper.props();
    expect(goTo).toBeTruthy();
  });
});
