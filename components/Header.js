import React from "react";
import { View, Text, Platform, I18nManager, StyleSheet } from "react-native";

const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : 0;

const TITLE_OFFSET_CENTER_ALIGN = Platform.OS === "ios" ? 70 : 56;
const TITLE_OFFSET_LEFT_ALIGN = Platform.OS === "ios" ? 20 : 56;

export default class Header extends React.Component {
  static get HEIGHT() {
    return APPBAR_HEIGHT + STATUSBAR_HEIGHT;
  }

  render() {
    return (
      <View>
        <Text>Custom Header</Text>
      </View>
    );
  }
}

const getAppBarHeight = () => {
  return Platform.OS === "ios" ? 44 : 56;
};
