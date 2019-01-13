import React, { Component } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";

export class ShopScreen extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("home")}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <Text>ShopScreen</Text>
      </View>
    );
  }
}

export default ShopScreen;
