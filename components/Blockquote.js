import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Line from "./Line";

const Blockquote = ({ children, ...props }) => (
  <View style={[styles.wrapper]}>
    <Line />
    <Text style={[styles.text]} {...props}>
      {children}
    </Text>
    <Line />
  </View>
);

export default Blockquote;

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 80,
    paddingTop: 23,
    paddingBottom: 23
  },
  text: {
    color: "#272727",
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 18,
    fontStyle: "italic"
  }
});
