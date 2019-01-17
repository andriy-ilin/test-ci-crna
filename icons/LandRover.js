import React from "react";
import { Image } from "react-native";

const LandRover = props => (
  <Image
    source={require("../assets/images/partners/landRover.png")}
    style={{ width: 106, height: 57, ...props }}
    resizeMode="cover"
  />
);

export default LandRover;
