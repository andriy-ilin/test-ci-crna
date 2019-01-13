import React from "react";
import { Image } from "react-native";

const Menu = props => (
  <Image
    {...props}
    source={require("../assets/images/menuIcon.png")}
    style={{ width: 25, height: 16 }}
    resizeMode="cover"
  />
);

export default Menu;
