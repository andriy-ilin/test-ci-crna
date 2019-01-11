import React, { Component } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { inject, observer } from "mobx-react/native";
import Header from "../components/Header";

@inject("article")
@observer
export default class CatalogArticles extends Component {
  static navigationOptions = {
    headerTitle: <Header />
  };
  state = {
    loaded: false,
    catalogArticles: []
  };

  async componentDidMount() {
    const { article } = this.props;
    await article.getArticle(`/catalog/ru`);
    this.setState({ loaded: true, catalogArticles: article.list });
  }

  render() {
    const { catalogArticles } = this.state;

    return (
      <View>
        {catalogArticles.map(({ mainTitle, mainBg, id }) => (
          <Article key={id} id={id} mainBg={mainBg} mainTitle={mainTitle} />
        ))}
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
