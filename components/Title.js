import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Title = ({ children, ...props }) => (
  <Text style={[styles.title]} {...props}>
    {children}
  </Text>
);

export default Title;

const styles = StyleSheet.create({
  title: {
    color: "#272727",
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 26,
    lineHeight: 24,
    fontWeight: "bold"
  }
});
