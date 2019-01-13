import React from "react";
import { Image } from "react-native";

const DownArrow = props => (
  <Image
    source={require("../assets/images/downArrow.png")}
    style={{ width: 15, height: 7, ...props }}
    resizeMode="cover"
  />
);

export default DownArrow;
