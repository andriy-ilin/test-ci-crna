import React from "react";
import { Image, View } from "react-native";

const RegionsTabBar = ({ imageStyle, active = false, ...props }) => (
  <View {...props}>
    {active ? (
      <Image
        source={require("../assets/images/tabBar/regionsActive.png")}
        style={{ width: 24, height: 24, ...imageStyle }}
        resizeMode="cover"
      />
    ) : (
      <Image
        source={require("../assets/images/tabBar/regionsInactive.png")}
        style={{ width: 24, height: 24, ...imageStyle }}
        resizeMode="cover"
      />
    )}
  </View>
);

export default RegionsTabBar;
