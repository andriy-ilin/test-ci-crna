import React from "react";
import { Image } from "react-native";

const DownArrow = props => (
  <Image
    source={require("../assets/images/rightArrow.png")}
    style={{ width: 12, height: 22, ...props }}
    resizeMode="cover"
  />
);

export default DownArrow;
