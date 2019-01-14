import React, { Component } from "react";
import { inject, observer } from "mobx-react/native";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { withNamespaces } from "react-i18next";

import Header from "../components/Header";

@withNamespaces(["home", "common"], { wait: true })
@observer
export class ArticleScreen extends Component {
  render() {
    const { t } = this.props;
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
