import React from "react";
import { Image, View } from "react-native";

const HomeTabBar = ({ imageStyle, active = false, ...props }) => (
  <View {...props}>
    {active ? (
      <Image
        source={require("../assets/images/tabBar/homeActive.png")}
        style={{ width: 24, height: 24, ...imageStyle }}
        resizeMode="cover"
      />
    ) : (
      <Image
        source={require("../assets/images/tabBar/homeInactive.png")}
        style={{ width: 24, height: 24, ...imageStyle }}
        resizeMode="cover"
      />
    )}
  </View>
);

export default HomeTabBar;
