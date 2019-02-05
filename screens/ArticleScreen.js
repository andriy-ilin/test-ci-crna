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
import { LinearGradient } from "expo";
import { withNamespaces } from "react-i18next";
import { slugify } from "transliteration";

import Foto from "../components/Foto";
import Title from "../components/Title";
import StyledText from "../components/StyledText";
import Blockquote from "../components/Blockquote";
import Switch from "../components/Switch";
import Swiper from "../components/Swiper";
import ProfileImage from "../components/ProfileImage";
import Loading from "../components/Loading";
import Video from "../components/Video";
import Button from "../components/Button";

import AddToFavorites from "../icons/AddToFavorites";

@withNamespaces(["home", "common"], { wait: true })
@inject("favorite")
@inject("article")
@inject("team")
@inject("lang")
@observer
export class ArticleScreen extends Component {
  state = { favorites: [] };
  async componentDidMount() {
    const {
      article,
      favorite,
      team,
      lang,
      navigation: {
        navigate,
        state: { routeName, params: { id } = {} } = {}
      } = {},
      lng
    } = this.props;

    await article.getArticle(`/articles/${id}`, `${routeName}Data`);
    const data = await team.getRoles(`/role/${lng}`);
    const favorites = await favorite.getStorage("@ukrainer:favorites");

    const {
      article: {
        [routeName]: { subLinks }
      }
    } = this.props;
    await lang.setArticlesTranslateList(subLinks);
    this.setState({ favorites: JSON.parse(favorites) || [] });
  }

  async componentDidUpdate({
    navigation: { state: { params: { id: prevId } = {} } = {} }
  }) {
    const {
      article,
      favorite,
      navigation: {
        state: { routeName, params: { id: nextId } = {} } = {}
      } = {}
    } = this.props;
    if (prevId !== nextId) {
      const favorites = await favorite.getStorage("@ukrainer:favorites");
      this.setState({ favorites: JSON.parse(favorites) || [] });
      this.scrollView && this.scrollView.scrollTo({ y: 0, animated: true });
      return await article.getArticle(
        `/articles/${nextId}`,
        `${routeName}Data`
      );
    }
  }

  render() {
    const {
      navigation: {
        navigate,
        state: { routeName }
      }
    } = this.props;
    const {
      t,
      team: { listEntries = [] } = {},
      team,
      article,
      favorite,
      article: {
        [routeName]: { id, mainTitle, mainBg, content = [], region },
        [routeName]: route
      } = {}
    } = this.props;
    const { favorites = [] } = this.state;
    if (team.loading) return <Loading />;
    if (article.loading) return <Loading />;
    return (
      <View style={[styles.container]}>
        <ScrollView
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
        >
          <Title paddingBottom={0}>{mainTitle}</Title>
          <View style={[styles.wrapperRerionFavorite]}>
            <View
              style={{
                position: "relative",
                borderRadius: 12,
                overflow: "hidden",
                marginTop: 10,
                marginBottom: 10,
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
                  paddingLeft: 7,
                  paddingRight: 7,
                  paddingBottom: 5,
                  alignSelf: "flex-start"
                }}
              >
                {region}
              </StyledText.Bold>
            </View>
            <TouchableOpacity
              style={[styles.addToFavorites]}
              onPress={async () => {
                if (!favorites.includes(id)) {
                  await favorite.saveToStorage(id);
                  return this.setState({ favorites: [...favorites, id] });
                } else {
                  const list = favorites.filter(item => item !== id);
                  this.setState({
                    favorites: list
                  });
                  return favorite.deleteFromStorage(id);
                }
              }}
            >
              <AddToFavorites active={favorites.includes(id)} />
            </TouchableOpacity>
          </View>

          <Foto width={"100%"} height={252} marginBottom={20} src={mainBg} />

          {content.map(({ tag, value = [], tagNumber }, key) => (
            <View key={`${tagNumber}${key}`}>
              <Switch
                value={tag}
                Text={<StyledText.Light>{value}</StyledText.Light>}
                Img={
                  <Foto
                    width={"100%"}
                    height={252}
                    src={value.src}
                    marginBottom={10}
                  />
                }
                Slider={
                  Array.isArray(value) && (
                    <Swiper styleWrapper={{ height: 270 }}>
                      {value.map(item => (
                        <Foto key={item} src={item} width="100%" height={252} />
                      ))}
                    </Swiper>
                  )
                }
                SubTitle={<StyledText.Bold>{value}</StyledText.Bold>}
                Blockquote={<Blockquote>{value}</Blockquote>}
                Fact={
                  <View>
                    <StyledText.Medium containerProps={{ marginBottom: 5 }}>
                      {value.title}
                    </StyledText.Medium>
                    <StyledText.Medium>{value.content}</StyledText.Medium>
                  </View>
                }
                Authors={
                  Array.isArray(value) && (
                    <View>
                      <StyledText.Bold>{t("Authors")}</StyledText.Bold>
                      <View style={[styles.authorWrapper]}>
                        {value.map(({ job = "", name = "", link }, key) => {
                          if (name.includes(",")) {
                            const nameArr = name.split(",");
                            return nameArr.map(item => {
                              const slug = slugify(item);
                              return (
                                <Author
                                  key={key}
                                  onPress={() =>
                                    navigate("author", { id: slug })
                                  }
                                  name={name.split(" ")}
                                  job={job}
                                />
                              );
                            });
                          }
                          const slug = slugify(name);

                          const findTeam = listEntries.find(
                            ({ trans }) => trans === slug
                          );
                          const { photo } = findTeam || {};
                          return (
                            <Author
                              key={key}
                              onPress={() => navigate("author", { id: slug })}
                              name={name.split(" ")}
                              job={job}
                              photo={photo}
                            />
                          );
                        })}
                      </View>
                    </View>
                  )
                }
                Video={<Video src={value} />}
                default={<View />}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const Author = ({ onPress, name = [], photo, job }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.authorBoxWrapper]}>
      <ProfileImage src={photo} />
      <StyledText.Medium
        fontSize={12}
        lineHeight={12}
        textAlign="center"
        containerProps={{
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 5,
          paddingTop: 10
        }}
      >
        {name.map((item, key, arr) => (!key ? `${item}\n` : item))}
      </StyledText.Medium>
      <StyledText.Light
        fontSize={12}
        lineHeight={12}
        containerProps={{ paddingLeft: 0, paddingRight: 0 }}
      >
        {job}
      </StyledText.Light>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapperRerionFavorite: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10
  },
  addToFavorites: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20
  },
  authorBoxWrapper: {
    width: 100,
    alignItems: "center"
  },
  authorWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingLeft: 20,
    paddingRight: 20
  },
  authorName: {
    fontWeight: "500",
    fontSize: 12,
    color: "#272727",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 30
  }
});

export default ArticleScreen;
