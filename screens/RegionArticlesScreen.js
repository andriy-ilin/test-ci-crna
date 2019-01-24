import React, { Component } from "react";
import { observer, inject } from "mobx-react/native";
import { withNamespaces } from "react-i18next";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo";

import Title from "../components/Title";
import Foto from "../components/Foto";
import StyledText from "../components/StyledText";
import Carousel from "../components/Carousel";

const { width } = Dimensions.get("window");

@withNamespaces(["regions"], { wait: true })
@inject("regions")
@observer
export class RegionArticlesScreen extends Component {
  state = {
    data: []
  };
  async componentDidMount() {
    const {
      regions,
      navigation: { state: { params: { region } = {} } = {} }
    } = this.props;
    const data = await regions.regionArticles(region);
    this.setState({ data });
  }

  render() {
    const {
      t,
      regions,
      navigation: { navigate, state: { params: { region } = {} } = {} }
    } = this.props;
    const { data } = this.state;

    return (
      <View style={[styles.wrapper]}>
        <Title textTransform="capitalize">{region}</Title>

        <StyledText.Light>
          The Green Pearl of Ukraine. The Green Pearl of Ukraine. It is one of
          the most popular resorts and tourist centers of the country.
        </StyledText.Light>

        <Carousel
          data={data}
          renderItem={({ mainTitle, mainBg, id }, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => navigate("regionArticleId", { id })}
            >
              <View style={[styles.articleContainer]}>
                <Foto
                  src={mainBg}
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  borderRadius={5}
                  position="absolute"
                />
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(125, 178, 66,.1)",
                    "rgba(119, 217, 160, .4)"
                  ]}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    borderRadius: 5
                  }}
                />

                <StyledText.Bold
                  color="#fff"
                  fontSize={23}
                  paddingBottom={10}
                  textTransform="capitalize"
                >
                  {mainTitle}
                </StyledText.Bold>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
// <View style={[styles.articleBg]} />

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  articleContainer: {
    margin: 10,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    // height: 200,
    width: width - 60,
    flex: 1,
    // maxHeight: width * 1.2,
    // height: width * 1.2,
    // marginLeft: 20,
    // marginRight: 20,
    // marginBottom: 20,
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 0,
    shadowColor: "#4a4a4a",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
    // overflow: "hidden"
  },
  articleBg: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,.5)"
  },

  image: {
    // width: width - 60,
    // height: width * 1.5,
    // borderRadius: 10
  }
});

export default RegionArticlesScreen;
