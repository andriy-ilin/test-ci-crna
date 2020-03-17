import React from "react";
import { View, Text, StyleSheet, Image as ImageDefault } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import SwiperComponent from "react-native-swiper";

const Swiper = ({
  children,
  styleWrapper,
  component: Component = SwiperComponent,
  ...props
}) => (
  <SwiperComponent
    style={{ height: 300, ...styleWrapper }}
    activeDotColor="#77d9a0"
    dotStyle={{
      borderColor: "#77d9a0",
      backgroundColor: "transparent",
      borderWidth: 1
    }}
  >
    {children}
  </SwiperComponent>
);

export default Swiper;
