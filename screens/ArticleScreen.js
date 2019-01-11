import React, { Component } from "react";
import { View, ScrollView, Text, Image } from "react-native";

import Header from "../components/Header";

export class ArticleScreen extends Component {
  static navigationOptions = {
    header: <Header />
  };
  render() {
    return (
      <View>
        <Text>ArticleScreen</Text>
      </View>
    );
  }
}

export default ArticleScreen;
