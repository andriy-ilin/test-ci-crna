import React from "react";
import { Image } from "react-native";

const FindBlack = props => (
  <Image
    source={require("../assets/images/findBlack.png")}
    style={{ width: 21, height: 21, ...props }}
    resizeMode="cover"
  />
);

export default FindBlack;
