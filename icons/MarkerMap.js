import React from "react";
import { Image } from "react-native";

const MarkerMap = props => (
  <Image
    source={require("../assets/images/markerMap.png")}
    style={{ width: 25, height: 25, ...props }}
    resizeMode="cover"
  />
);

export default MarkerMap;
