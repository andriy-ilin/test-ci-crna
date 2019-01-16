import React from "react";
import { Image } from "react-native";

const Filter = props => (
  <Image
    source={require("../assets/images/filter.png")}
    style={{ width: 18, height: 14, ...props }}
    resizeMode="cover"
  />
);

export default Filter;
