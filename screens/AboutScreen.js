import React, { Component } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";

export class AboutScreen extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text>AboutScreen</Text>
      </View>
    );
  }
}

export default AboutScreen;
