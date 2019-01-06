import React, { Component } from "react";
import { View, ScrollView, Text, Image } from "react-native";
import { database } from "./helpers/firebase";
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
        <Text>test</Text>

        {catalogArticles.map(({ mainTitle, mainBg }, key) => (
          <View>
            <Text>{`${key + 1} ${mainTitle}`}</Text>
            <Image
              style={{
                width: 51,
                height: 51
              }}
              source={{ uri: mainBg }}
            />
          </View>
        ))}
      </ScrollView>
    );
  }
}
