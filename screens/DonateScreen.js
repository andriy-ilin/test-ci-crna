import React, { Component } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";

export class DonateScreen extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("home")}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <Text>DonateScreen</Text>
      </View>
    );
  }
}

export default DonateScreen;
