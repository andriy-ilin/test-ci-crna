import React from "react";
import { Image } from "react-native";

const Logo = props => (
  <Image
    {...props}
    source={require("../assets/images/logoBlack.png")}
    style={{ width: 84, height: 24 }}
    resizeMode="cover"
  />
);

export default Logo;
