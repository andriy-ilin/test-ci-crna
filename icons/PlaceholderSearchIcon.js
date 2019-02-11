import React from "react";
import { Image } from "react-native";

const PlaceholderSearchIcon = props => (
  <Image
    source={require("../assets/images/searchGray.png")}
    style={{ width: 14, height: 14, ...props }}
    resizeMode="cover"
  />
);

export default PlaceholderSearchIcon;
