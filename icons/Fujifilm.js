import React from "react";
import { Image } from "react-native";

const Fujifilm = props => (
  <Image
    source={require("../assets/images/partners/fujifilm.png")}
    style={{ width: 128, height: 22, ...props }}
    resizeMode="cover"
  />
);

export default Fujifilm;
