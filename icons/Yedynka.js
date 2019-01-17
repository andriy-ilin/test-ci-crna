import React from "react";
import { Image } from "react-native";

const Yedynka = props => (
  <Image
    source={require("../assets/images/partners/yedynka.png")}
    style={{ width: 128, height: 32, ...props }}
    resizeMode="cover"
  />
);

export default Yedynka;
