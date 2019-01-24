import React, { Component } from "react";
import { observer, inject } from "mobx-react/native";
import { withNamespaces } from "react-i18next";
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import Title from "../components/Title";
import StyledText from "../components/StyledText";
import Video from "../components/Video";
import Loading from "../components/Loading";
import Filter from "../icons/Filter";
import FindBlack from "../icons/FindBlack";

@withNamespaces(["video"], { wait: true })
@inject("video")
@observer
export class FavoriteScreen extends Component {
  async componentDidMount() {
    const { video } = this.props;
    await video.getVideo();
  }
  render() {
    const { t, video: { loading = true, list = [] } = {} } = this.props;
    if (loading) return <Loading />;
    return (
      <View style={[styles.container]}>
        <Title>{t("Video")}</Title>
        <ScrollView>
          <View style={[styles.filterIconWrapper]}>
            <TouchableOpacity
              onPress={() => this.setState({ filterTab: "filter" })}
            >
              <View style={{ paddingRight: 20 }}>
                <Filter />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ filterTab: "find" })}
            >
              <FindBlack />
            </TouchableOpacity>
          </View>
          <View style={[styles.listWrapper]}>
            <FlatList
              data={list.slice(0, 10)}
              keyExtractor={({ id }) => id}
              renderItem={({ item: { link } }) => <Video src={link} />}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listWrapper: {
    paddingLeft: 20,
    paddingRight: 20
  },
  filterIconWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 20
  }
});
export default FavoriteScreen;
