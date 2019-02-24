import React from "react";
import { Image, View } from "react-native";

const ShopTabBar = ({ imageStyle, active = false, ...props }) => (
  <View {...props}>
    {active ? (
      <Image
        source={require("../assets/images/tabBar/shopActive.png")}
        style={{ width: 24, height: 24, ...imageStyle }}
        resizeMode="cover"
      />
    ) : (
      <Image
        source={require("../assets/images/tabBar/shopInactive.png")}
        style={{ width: 24, height: 24, ...imageStyle }}
        resizeMode="cover"
      />
    )}
  </View>
);

export default ShopTabBar;
