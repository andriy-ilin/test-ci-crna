import React from "react";
import { Text as StyledText, View, StyleSheet } from "react-native";

export class MonoText extends React.Component {
  render() {
    return <StyledText {...this.props} style={[this.props.style]} />;
  }
}

const Default = ({ children, ...props }) => (
  <View style={[styles.wrapper]}>
    <StyledText style={[styles.default, { ...props }]}>{children}</StyledText>
  </View>
);

const Light = ({ children, ...props }) => (
  <View style={[styles.wrapper]}>
    <StyledText style={[styles.light, { ...props }]}>{children}</StyledText>
  </View>
);

const Medium = ({ children, ...props }) => (
  <View style={[styles.wrapper]}>
    <StyledText style={[styles.medium, { ...props }]}>{children}</StyledText>
  </View>
);

const Bold = ({ children, ...props }) => (
  <View style={[styles.wrapper]}>
    <StyledText style={[styles.bold, { ...props }]}>{children}</StyledText>
  </View>
);

StyledText.Default = Default;
StyledText.Light = Light;
StyledText.Medium = Medium;
StyledText.Bold = Bold;

export default StyledText;

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 24
  },
  bold: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold",
    color: "#272727"
  },
  medium: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: "#272727"
  },
  default: {
    fontSize: 16,
    lineHeight: 22,
    color: "#272727"
  },
  light: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "100",
    color: "#272727"
  }
});
