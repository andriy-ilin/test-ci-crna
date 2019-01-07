import React, { Component } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { inject } from "mobx-react";

import { database } from "../helpers/firebase";
const link = "/catalog";

const get = lang => database.ref(`${link}/${lang}`).once("value");

export default class CatalogArticles extends Component {
  state = {
    catalogArticles: []
  };

  async componentDidMount() {
    const catalogArticles = await database
      .ref(`/catalog/ru`)
      .on("value", snapshot =>
        this.setState({
          catalogArticles: Object.values(snapshot.val())
        })
      );
  }

  render() {
    const { catalogArticles } = this.state;
    return (
      <ScrollView>
        {catalogArticles.map(({ mainTitle, mainBg, id }) => (
          <Article key={id} id={id} mainBg={mainBg} mainTitle={mainTitle} />
        ))}
      </ScrollView>
    );
  }
}

@inject("navigation")
class Article extends Component {
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
