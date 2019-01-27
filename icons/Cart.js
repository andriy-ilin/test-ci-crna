import React from "react";
import { Image } from "react-native";

const Cart = props => (
  <Image
    source={require("../assets/images/cart.png")}
    style={{ width: 32, height: 29, ...props }}
    resizeMode="cover"
  />
);

export default Cart;
