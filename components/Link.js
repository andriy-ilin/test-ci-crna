import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";

const Link = ({ children, url = "", ...props }) => (
  <TouchableOpacity onPress={() => Linking.openURL(url)}>
    <View style={[styles.wrapper]}>
      <Text style={[styles.title]}>{children}</Text>
    </View>
  </TouchableOpacity>
);

export default Link;

const styles = StyleSheet.create({
  wrapper: {
    // alignItems: "center",
    // justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 16
  },
  title: {
    fontWeight: "500",
    color: "#75d396",
    fontSize: 16
  }
});
