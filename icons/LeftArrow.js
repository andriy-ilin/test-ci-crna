import React from "react";
import { Image } from "react-native";

const LeftArrow = props => (
  <Image
    source={require("../assets/images/leftArrow.png")}
    style={{ width: 12, height: 22, ...props }}
    resizeMode="cover"
  />
);

export default LeftArrow;
