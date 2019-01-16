import React, { Component } from "react";
import { observer, inject } from "mobx-react/native";
import { withNamespaces } from "react-i18next";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";

import Title from "../components/Title";
import StyledText from "../components/StyledText";

@withNamespaces(["favorite"], { wait: true })
@observer
export class FavoriteScreen extends Component {
  render() {
    const { t } = this.props;
    return (
      <View>
        <Title>{t("Favorite")}</Title>
        <StyledText.Light width={170}>
          {t("Your saved stories are available offline.")}
        </StyledText.Light>
      </View>
    );
  }
}

export default FavoriteScreen;
