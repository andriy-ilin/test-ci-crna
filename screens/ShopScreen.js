import React, { Component } from "react";
import { observer } from "mobx-react/native";
import { withNamespaces } from "react-i18next";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import Title from "../components/Title";
import StyledText from "../components/StyledText";

@withNamespaces(["shop"], { wait: true })
@observer
export class ShopScreen extends Component {
  render() {
    const { t } = this.props;
    return (
      <View>
        <Title>{t("Shop")}</Title>
        <StyledText.Light>{t("Long Description")}</StyledText.Light>
      </View>
    );
  }
}

export default ShopScreen;
