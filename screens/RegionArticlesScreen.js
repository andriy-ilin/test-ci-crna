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
import { LinearGradient } from "expo-linear-gradient";

import Title from "../components/Title";
import Foto from "../components/Foto";
import StyledText from "../components/StyledText";
import Carousel from "../components/Carousel";
import Video from "../components/Video";

const { width } = Dimensions.get("window");

@withNamespaces(["regions"], { wait: true })
@inject("regions")
@observer
export class RegionArticlesScreen extends Component {
  state = {
    list: []
  };
  async componentDidMount() {
    const {
      regions,
      lng,
      navigation: { state: { params: { region } = {} } = {} }
    } = this.props;

    const list = await regions.regionArticles(region);
    this.setState({ list });
  }

  async componentDidUpdate({ lng }) {
    const {
      lng: nextLng,
      navigation: { state: { params: { region } = {} } = {} }
    } = this.props;
    if (lng !== nextLng) {
      const { regions } = this.props;
      await regions.getRegions(`/catalog/${nextLng}`);
      const list = await regions.regionArticles(region);
      this.setState({ list });
    }
  }

  render() {
    const {
      t,
      regions,
      lng,
      navigation: { navigate, state: { params: { region } = {} } = {} }
    } = this.props;
    const { list } = this.state;
    const { name, url, video, about, ...props } =
      regions.regionsListName.find(
        ({ region: itemRegion }) => itemRegion === region
      ) || {};
    return (
      <ScrollView style={[styles.wrapper]}>
        <Title textTransform="capitalize">{name}</Title>

        <StyledText.Light>{about}</StyledText.Light>
        <View style={[styles.videoWrapper]}>
          <Video src={video} lng={lng} width={width - 40} />
        </View>
        <Title textTransform="capitalize" fontSize={24} paddingTop={0}>
          {t("common:Articles")}
        </Title>
        <Carousel
          data={list}
          renderItem={({ mainTitle, mainBg, main320Bg, id }, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => navigate("regionArticleId", { id })}
            >
              <View style={[styles.articleContainer]}>
                <Foto
                  src={
                    main320Bg
                      ? !main320Bg.includes("http")
                        ? `http://ukrainer.net${main320Bg}`
                        : main320Bg
                      : mainBg
                  }
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
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  articleContainer: {
    margin: 10,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    width: width - 60,
    minHeight: 400,
    flex: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 0,
    shadowColor: "#4a4a4a",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  articleBg: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,.5)"
  },
  videoWrapper: {
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default RegionArticlesScreen;
