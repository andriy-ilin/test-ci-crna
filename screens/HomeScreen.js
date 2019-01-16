import React, { Component } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { inject, observer } from "mobx-react/native";
import { withNamespaces } from "react-i18next";

import Title from "../components/Title";
import StyledText from "../components/StyledText";
import { AllStoriesContainer } from "./RegionsScreen";

@withNamespaces(["home"], { wait: true })
@inject("article")
@observer
export default class CatalogArticles extends Component {
  state = {
    loaded: false,
    catalogArticles: []
  };

  async componentDidMount() {
    const { article } = this.props;
    await article.getArticle(`/catalog/en`);
    this.setState({ loaded: true, catalogArticles: article.list });
  }

  render() {
    const {
      t,
      article,
      navigation: { navigate }
    } = this.props;
    return (
      <View>
        <Title>{t("Top stories")}</Title>
        <StyledText.Light>
          {t("Discover more than 200 breathtaking articles about Ukraine")}
        </StyledText.Light>
        <AllStoriesContainer
          list={article.list}
          onPress={id => {
            navigate("article", { id });
          }}
        />
      </View>
    );
  }
}

@inject("navigation")
export class Article extends Component {
  render() {
    const { mainBg, mainTitle, id } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={() => this.handleEventPress(id)}>
          <Text>{`${mainTitle}`}</Text>
          <Image
            style={{
              width: 51,
              height: 51
            }}
            source={{ uri: mainBg }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  handleEventPress = ({ id }) => this.props.navigation.goTo("article");
}
