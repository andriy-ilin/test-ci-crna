import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Foto from "./Foto";

const ProfileImage = ({ src }) => (
  <View style={[styles.fotoCircleWrapper]}>
    <Foto src={src} width={87} height={87} />
  </View>
);

export default ProfileImage;

const styles = StyleSheet.create({
  fotoCircleWrapper: {
    width: 87,
    height: 87,
    borderRadius: 87,
    borderColor: "#eee",
    borderWidth: 1,
    overflow: "hidden"
  }
});
