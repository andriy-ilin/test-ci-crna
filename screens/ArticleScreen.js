import React, { Component } from "react";
import { inject, observer } from "mobx-react/native";
import {
  View,
  ScrollView,
  Text,
  // Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { withNamespaces } from "react-i18next";

import Foto from "../components/Foto";
import Title from "../components/Title";
import StyledText from "../components/StyledText";

@withNamespaces(["home", "common"], { wait: true })
@inject("article")
@observer
export class ArticleScreen extends Component {
  async componentDidMount() {
    const {
      article,
      navigation: { state: { routeName, params: { id } = {} } = {} } = {}
    } = this.props;
    await article.getArticle(`/articles/${id}`, `${routeName}Data`);
  }
  render() {
    const {
      navigation: {
        state: { routeName }
      }
    } = this.props;
    const {
      t,
      article: { [routeName]: { mainTitle, mainBg, content = [] } } = {}
    } = this.props;

    return (
      <View style={[styles.container]}>
        <ScrollView>
          <Title>{mainTitle}</Title>
          <Foto width={"100%"} height={252} src={mainBg} />

          {content.map(({ tag, value, tagNumber }) => (
            <View key={tagNumber}>
              {tag === "Text" ? (
                <StyledText.Light>{value}</StyledText.Light>
              ) : tag === "Img" ? (
                <Foto width={"100%"} height={252} src={value.src} />
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
