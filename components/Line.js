import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Line = props => <View style={[styles.container]} {...props} />;

export default Line;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#75d396",
    width: "100%",
    height: 1
  }
});
