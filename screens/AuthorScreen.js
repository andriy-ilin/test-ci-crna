import React, { Component } from "react";
import { observer, inject } from "mobx-react/native";
import { withNamespaces } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  SectionList
} from "react-native";
import Link from "../components/Link";
import Line from "../components/Line";
import Foto from "../components/Foto";
import ProfileImage from "../components/ProfileImage";
import Title from "../components/Title";
import StyledText from "../components/StyledText";
import Fest from "../icons/Fest";
import Fujifilm from "../icons/Fujifilm";
import LandRover from "../icons/LandRover";
import Yedynka from "../icons/Yedynka";
import Loading from "../components/Loading";

@withNamespaces(["team"], { wait: true })
@inject("team")
@observer
export class AuthorScreen extends Component {
  state = {
    data: {}
  };
  async componentDidMount() {
    const {
      team,
      navigation: { state: { routeName, params: { id } = {} } = {} } = {}
    } = this.props;
    const data = await team.author(id);
    this.setState({ data });
  }

  async componentDidUpdate({
    navigation: { state: { params: { id: prevId } = {} } = {} }
  }) {
    const {
      team,
      navigation: {
        state: { routeName, params: { id: nextId } = {} } = {}
      } = {}
    } = this.props;
    if (prevId !== nextId) {
      this.scrollView.scrollTo({ y: 0, animated: true });
      const data = await team.author(nextId);
      return this.setState({ data });
    }
  }

  renderJob(articles) {
    const arrJob = articles.map(({ job }) => job);
    return arrJob.filter((item, pos) => arrJob.indexOf(item) == pos).join(", ");
  }

  render() {
    const {
      t,
      team,
      team: { listEntries = [], authorArticleMoreData, authorArticleData } = {},
      navigation: { navigate }
    } = this.props;
    const {
      data: { articles = [], name, photo }
    } = this.state;
    if (team.loading) return <Loading />;

    return (
      <ScrollView
        ref={scrollView => {
          this.scrollView = scrollView;
        }}
        style={[styles.container]}
      >
        <View style={[styles.aboutWrapper]}>
          <ProfileImage src={photo} paddingRight={30} />
          <View style={[{ flex: 1 }]}>
            <StyledText.Bold
              containerProps={{
                paddingBottom: 5
              }}
            >
              {name}
            </StyledText.Bold>
            <StyledText.Light
              containerProps={{
                paddingBottom: 0
              }}
              flexWrap="wrap"
              fontSize={14}
            >
              {authorArticleMoreData.map(({ title }) => title).join(", ")}
            </StyledText.Light>
          </View>
        </View>
        <View style={[styles.articleWrapperList]}>
          <Line />
          {authorArticleMoreData && (
            <ArticleList list={authorArticleMoreData} navigate={navigate} />
          )}
        </View>
      </ScrollView>
    );
  }
}

const ArticleList = ({ list = [], navigate }) => (
  <SectionList
    renderItem={({ item: { id, region, mainBg, mainTitle } = {} }) => (
      <TouchableOpacity key={id} onPress={() => navigate("article", { id })}>
        <View style={[styles.articleContainer]}>
          <View style={[styles.articleContent]}>
            <StyledText.Medium
              fontSize={13}
              flexWrap="wrap"
              containerProps={{
                paddingTop: 10,
                paddingLeft: 16,
                paddingBottom: 5,
                alignSelf: "flex-start"
              }}
              numberOfLines={2}
            >
              {mainTitle}
            </StyledText.Medium>
            <View
              style={{
                position: "relative",
                borderRadius: 10,
                overflow: "hidden",
                margin: 10,
                marginTop: 0,
                alignSelf: "flex-start"
              }}
            >
              <LinearGradient
                colors={["#7db242", "#77d9a0"]}
                start={[0, 1]}
                end={[1, 1]}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
                }}
              />
              <StyledText.Bold
                color="#fff"
                fontSize={13}
                lineHeight={13}
                flexWrap="wrap"
                textTransform="capitalize"
                containerProps={{
                  paddingTop: 5,
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingBottom: 5,
                  alignSelf: "flex-start"
                  // width: "auto"
                }}
              >
                {region}
              </StyledText.Bold>
            </View>
          </View>
          <View style={[styles.articleImage]}>
            <Foto
              src={mainBg}
              borderRadius={8}
              // borderTopRadius={8}
              // borderBottomLeftRadius={8}
              marginRight={-1}
              marginTop={-1}
              width={127}
              height={96}
            />
          </View>
        </View>
      </TouchableOpacity>
    )}
    renderSectionHeader={({ section: { title } }) => (
      <StyledText.Bold
        fontSize={18}
        containerProps={{
          paddingTop: 20,
          paddingLeft: 0,
          paddingBottom: 10
        }}
      >
        {title}
      </StyledText.Bold>
    )}
    keyExtractor={(id, index) => id + index}
    sections={list}
  />
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  aboutWrapper: {
    paddingTop: 18,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  articleWrapperList: {
    paddingTop: 18,
    paddingLeft: 20
  },
  articleWrapper: {},
  articleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    borderRadius: 8,
    borderColor: "#d8d8d8",
    borderWidth: 1,
    height: 96,
    marginRight: 20,
    marginBottom: 13
    // overflow: "hidden"
  },
  articleContent: {
    width: 200,
    alignSelf: "flex-start"
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingLeft: 20,
    paddingRight: 30,
    paddingTop: 30
  },
  authorWrapper: {
    alignItems: "center"
  }
});

export default AuthorScreen;
