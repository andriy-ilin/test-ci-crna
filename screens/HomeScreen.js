import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo";
import { inject, observer } from "mobx-react/native";
import { withNamespaces } from "react-i18next";

import Title from "../components/Title";
import StyledText from "../components/StyledText";
import Line from "../components/Line";
import Foto from "../components/Foto";
import Carousel from "../components/Carousel";
import { AllStoriesContainer } from "./RegionsScreen";
import Loading from "../components/Loading";

const { width } = Dimensions.get("window");

@withNamespaces(["home"], { wait: true })
@inject("article")
@inject("lang")
@observer
export default class CatalogArticles extends Component {
  state = {
    loaded: false,
    catalogArticles: [],
    moreArticles: []
  };

  async componentDidMount() {
    const { article, lang, lng } = this.props;
    await article.getTop(`/catalog/${lng}`);
    const len = article.top.length;
    this.setState({
      loaded: true,
      catalogArticles: article.top.slice(0, Math.floor(len / 3)),
      moreArticles: article.top.slice(
        Math.floor(len / 3) + 1,
        Math.floor(len / 2) + 1
      )
    });
  }

  async componentDidUpdate({ lng }) {
    const { lng: nextLng } = this.props;
    if (lng !== nextLng) {
      const { article } = this.props;
      await article.getTop(`/catalog/${nextLng}`);
      const len = article.top.length;
      this.setState({
        loaded: true,
        catalogArticles: article.top.slice(0, Math.floor(len / 3)),
        moreArticles: article.top.slice(
          Math.floor(len / 3) + 1,
          Math.floor(len / 2) + 1
        )
      });
    }
  }

  render() {
    const {
      t,
      article,
      navigation: { navigate }
    } = this.props;
    const { catalogArticles = [], moreArticles = [] } = this.state;

    if (article.loading) return <Loading />;
    if (!catalogArticles.length && !moreArticles.length) return <View />;
    return (
      <View style={[styles.wrapper]}>
        <ScrollView>
          <Title>{t("Top stories")}</Title>

          <StyledText.Light>
            {t("Discover more than 200 breathtaking articles about Ukraine")}
          </StyledText.Light>
          <Carousel
            data={catalogArticles}
            renderItem={({ mainTitle, mainBg, id, region }, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => navigate("article", { id })}
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

                  <StyledText.Light
                    color="#fff"
                    fontSize={8}
                    containerProps={{ paddingBottom: 6 }}
                    lineHeight={10}
                    textTransform="uppercase"
                  >
                    {region}
                  </StyledText.Light>
                  <StyledText.Bold
                    color="#fff"
                    fontSize={18}
                    paddingBottom={10}
                    textTransform="capitalize"
                  >
                    {mainTitle}
                  </StyledText.Bold>
                </View>
              </TouchableOpacity>
            )}
          />
          <View style={[styles.flexControll, { paddingLeft: 20 }]}>
            <Line />
          </View>

          <View style={[styles.flexControll]}>
            <StyledText.Bold fontSize={18}>{t("More stories")}</StyledText.Bold>
            <TouchableOpacity
              onPress={() => {
                navigate("regions");
              }}
            >
              <StyledText.Medium fontSize={14}>
                {t("view all")}
              </StyledText.Medium>
            </TouchableOpacity>
          </View>
          <AllStoriesContainer
            list={moreArticles}
            onPress={id => {
              navigate("article", { id });
            }}
          />
        </ScrollView>
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  articleContainer: {
    margin: 10,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    height: 300,
    width: width - 60,
    flex: 1,
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
  flexControll: {
    paddingTop: 20,
    // paddingBottom: 0,
    // paddingBottom: 0,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
