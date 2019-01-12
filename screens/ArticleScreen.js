import React, { Component } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";

import Header from "../components/Header";

export class ArticleScreen extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("home")}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <Text>ArticleScreen</Text>
      </View>
    );
  }
}

export default ArticleScreen;
