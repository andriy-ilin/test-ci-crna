import React from "react";
import { Image } from "react-native";

const SelectedIcon = props => (
  <Image
    source={require("../assets/images/selected.png")}
    style={{ width: 16, height: 16, ...props }}
    resizeMode="cover"
  />
);

export default SelectedIcon;
