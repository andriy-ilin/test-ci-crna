import React from "react";
import { Image, View } from "react-native";

const DonateTabBar = ({ imageStyle, active = false, ...props }) => (
  <View {...props}>
    {active ? (
      <Image
        source={require("../assets/images/tabBar/donateActive.png")}
        style={{ width: 30, height: 28, ...imageStyle }}
        resizeMode="cover"
      />
    ) : (
      <Image
        source={require("../assets/images/tabBar/donateInactive.png")}
        style={{ width: 30, height: 28, ...imageStyle }}
        resizeMode="cover"
      />
    )}
  </View>
);

export default DonateTabBar;
