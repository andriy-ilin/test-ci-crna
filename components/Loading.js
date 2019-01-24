import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const Loading = ({ status = true, ...props }) => (
  <View style={[styles.containerLoader, { ...props }]}>
    <ActivityIndicator size="large" />
  </View>
);

export default Loading;

const styles = StyleSheet.create({
  containerLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
