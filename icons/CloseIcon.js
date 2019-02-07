import React from "react";
import { Image } from "react-native";

const CloseIcon = props => (
  <Image
    source={require("../assets/images/close.png")}
    style={{ width: 18, height: 17, ...props }}
    resizeMode="cover"
  />
);

export default CloseIcon;
