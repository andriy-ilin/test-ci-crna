import React from "react";
import { Image, View } from "react-native";

const FavoriteTabBar = ({ imageStyle, active = false, ...props }) => (
  <View {...props}>
    {active ? (
      <Image
        source={require("../assets/images/tabBar/favoriteActive.png")}
        style={{ width: 30, height: 28, ...imageStyle }}
        resizeMode="cover"
      />
    ) : (
      <Image
        source={require("../assets/images/tabBar/favoriteInactive.png")}
        style={{ width: 30, height: 28, ...imageStyle }}
        resizeMode="cover"
      />
    )}
  </View>
);

export default FavoriteTabBar;
