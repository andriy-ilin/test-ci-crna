import React from "react";
import { Image } from "react-native";

const Logo = ({ gradient = false, ...props }) =>
  gradient ? (
    <Image
      source={require("../assets/images/logoGradient.png")}
      style={{ width: 158, height: 42 }}
      resizeMode="cover"
      {...props}
    />
  ) : (
    <Image
      source={require("../assets/images/logoBlack.png")}
      style={{ width: 84, height: 24 }}
      resizeMode="cover"
      {...props}
    />
  );

export default Logo;
