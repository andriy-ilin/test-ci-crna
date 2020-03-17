import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Button = ({ children, onPress, ...props }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.wrapper]} {...props}>
      <LinearGradient
        colors={["#7db242", "#77d9a0"]}
        start={[0, 1]}
        end={[1, 1]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 60
        }}
      >
        <View style={[styles.wrapper]}>
          <Text style={[styles.title]}>{children}</Text>
        </View>
      </LinearGradient>
    </View>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    height: 60,
    borderRadius: 10,
    overflow: "hidden"
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18
  }
});
