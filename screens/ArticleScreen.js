import React, { Component } from "react";
import { inject, observer } from "mobx-react/native";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { withNamespaces } from "react-i18next";

import Title from "../components/Title";
import StyledText from "../components/StyledText";

@withNamespaces(["home", "common"], { wait: true })
@inject("article")
@observer
export class ArticleScreen extends Component {
  async componentDidMount() {
    const {
      article,
      navigation: { state: { params: { id } = {} } = {} } = {}
    } = this.props;

    await article.getArticle(`/articles/${id}`, "articleData");
  }
  render() {
    const {
      t,
      article: { article: { mainTitle, mainBg, content = [] } } = {}
    } = this.props;

    return (
      <View style={[styles.container]}>
        <Title>{mainTitle}</Title>
        <ScrollView>
          <Image
            source={{ uri: mainBg }}
            style={{ width: "100%", height: 252 }}
            resizeMode="cover"
          />

          {content.map(({ tag, value, tagNumber }) => (
            <View key={tagNumber}>
              {tag === "Text" ? (
                <StyledText.Light>{value}</StyledText.Light>
              ) : tag === "Img" ? (
                <Image
                  source={{ uri: value.src }}
                  style={{ width: "100%", height: 252 }}
                  resizeMode="cover"
                />
              ) : (
                <View />
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ArticleScreen;
