import React from "react";
import { Image } from "react-native";

const Fest = props => (
  <Image
    source={require("../assets/images/partners/fest.png")}
    style={{ width: 140, height: 70, ...props }}
    resizeMode="cover"
  />
);

export default Fest;
