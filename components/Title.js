import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Title = ({ children, ...props }) => (
  <Text style={[styles.title, { ...props }]}>{children}</Text>
);

Title.H2 = ({ children, ...props }) => (
  <Title style={[styles.title]} {...props}>
    {children}
  </Title>
);

export default Title;

const styles = StyleSheet.create({
  title: {
    color: "#272727",
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "bold"
  },
  h2: {
    fontSize: 26,
    lineHeight: 30
  }
});
