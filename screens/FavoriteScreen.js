import React, { Component } from "react";
import { observer, inject } from "mobx-react/native";
import { withNamespaces } from "react-i18next";
import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo";

import Title from "../components/Title";
import Foto from "../components/Foto";
import Loading from "../components/Loading";
import Button from "../components/Button";
import StyledText from "../components/StyledText";

const { width } = Dimensions.get("window");

@withNamespaces(["favorite"], { wait: true })
@inject("favorite")
@observer
export class FavoriteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteMode: null
    };
  }

  async componentDidMount() {
    const { favorite } = this.props;
    await favorite.getFavoritesArticles();
  }

  render() {
    const {
      t,
      favorite,
      navigation: { navigate }
    } = this.props;
    const { deleteMode } = this.state;

    if (favorite.loading) return <Loading />;

    return (
      <View style={[styles.wrapper]}>
        <ScrollView>
          <Title>{t("Favorite")}</Title>
          <View style={[styles.centerList]}>
            <View style={[styles.wrapperList]}>
              <StyledText.Light
                containerProps={{
                  paddingLeft: 0,
                  paddingRight: 0,
                  height: (width / 2 - 30) * 1.35,
                  width: width / 2 - 40,
                  marginLeft: 3,
                  marginTop: 3,
                  marginRight: 25,
                  marginBottom: 20
                }}
              >
                {t("Your saved stories are available offline.")}
              </StyledText.Light>
              {favorite.listFavorites.map(
                ({ mainTitle, mainBg, id }, index, arr) => (
                  <View
                    key={mainTitle}
                    style={[
                      styles.cardFavoriteStories,
                      index % 2 === 1 && styles.odd
                    ]}
                  >
                    <TouchableOpacity
                      style={[styles.clickWrapper]}
                      onPress={() => navigate("favoriteArticleId", { id })}
                      onLongPress={() => this.setState({ deleteMode: id })}
                    >
                      <Foto
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        position="absolute"
                        borderRadius={6}
                        src={mainBg}
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
                          borderRadius: 6
                        }}
                      />

                      <StyledText.Bold
                        color="#fff"
                        fontSize={20}
                        textTransform="capitalize"
                      >
                        {mainTitle}
                      </StyledText.Bold>
                    </TouchableOpacity>
                    {deleteMode === id && (
                      <View
                        style={[
                          {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            top: 0,
                            left: 0,
                            borderRadius: 6,
                            backgroundColor: "rgba(117,211,150,.95)",
                            alignItems: "center",
                            justifyContent: "center",

                            flex: 1
                          }
                        ]}
                      >
                        <StyledText.Bold
                          textAlign="center"
                          color="#fff"
                          fontSize={12}
                          containerProps={{
                            paddingLeft: 0,
                            paddingRight: 0
                          }}
                        >
                          Delete from favorites?
                        </StyledText.Bold>
                        <View style={[styles.answearWrapper]}>
                          <TouchableOpacity
                            onPress={() => favorite.deleteFromStorage(id)}
                          >
                            <StyledText.Medium
                              color="#fff"
                              fontSize={14}
                              paddingBottom={0}
                              containerProps={{
                                paddingRight: 20,
                                paddingBottom: 0
                              }}
                            >
                              Yes
                            </StyledText.Medium>
                          </TouchableOpacity>
                          <StyledText.Medium
                            color="#fff"
                            fontSize={14}
                            containerProps={{
                              paddingRight: 0,
                              paddingLeft: 0,
                              paddingBottom: 0
                            }}
                          >
                            |
                          </StyledText.Medium>
                          <TouchableOpacity
                            onPress={() => this.setState({ deleteMode: null })}
                          >
                            <StyledText.Medium
                              color="#fff"
                              fontSize={14}
                              containerProps={{
                                paddingLeft: 20,
                                paddingBottom: 0
                              }}
                            >
                              No
                            </StyledText.Medium>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                )
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  centerList: { justifyContent: "center" },
  wrapperList: {
    flexWrap: "wrap",
    flexDirection: "row",
    paddingLeft: 20
  },
  cardFavoriteStories: {
    backgroundColor: "#fff",
    height: (width / 2 - 30) * 1.35,
    width: width / 2 - 40,
    marginLeft: 3,
    marginTop: 3,
    marginRight: 25,
    marginBottom: 20,
    borderRadius: 6,
    borderColor: "#ddd",
    borderWidth: 0,
    shadowColor: "#4a4a4a",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  clickWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end"
  },
  answearWrapper: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  odd: {
    marginTop: -(width / 2 - 30) * 1.35 + 65
  },
  last: {
    alignSelf: "flex-end",
    borderWidth: 3,
    borderColor: "red",
    marginLeft: -(width / 2 - 30) * 1.35 + 65
  }
});

export default FavoriteScreen;
