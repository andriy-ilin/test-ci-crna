import React from "react";
import { Image } from "react-native";

const CloseIcon = props => (
  <Image
    source={require("../assets/images/close.png")}
    style={{ width: 12, height: 12, ...props }}
    resizeMode="cover"
  />
);

export default CloseIcon;
