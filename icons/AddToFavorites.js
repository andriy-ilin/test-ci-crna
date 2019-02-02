import React from "react";
import { Image, View } from "react-native";

const AddToFavorites = ({ imageStyle, active = false, ...props }) => (
  <View {...props}>
    {active ? (
      <Image
        source={require("../assets/images/favoriteFull.png")}
        style={{ width: 14, height: 18, ...imageStyle }}
        resizeMode="cover"
      />
    ) : (
      <Image
        source={require("../assets/images/favoriteEmpty.png")}
        style={{ width: 14, height: 18, ...imageStyle }}
        resizeMode="cover"
      />
    )}
  </View>
);

export default AddToFavorites;
