import React, { Component } from "react";
import { observer, inject } from "mobx-react/native";
import { withNamespaces } from "react-i18next";
import { LinearGradient } from "expo";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  FlatList
} from "react-native";
import Link from "../components/Link";
import Line from "../components/Line";
import Foto from "../components/Foto";
import ProfileImage from "../components/ProfileImage";
import Title from "../components/Title";
import Fest from "../icons/Fest";
import Fujifilm from "../icons/Fujifilm";
import LandRover from "../icons/LandRover";
import Yedynka from "../icons/Yedynka";

@withNamespaces(["team"], { wait: true })
@inject("team")
@observer
export class TeamScreen extends Component {
  async componentDidMount() {
    const {
      team,
      navigation: { navigate },
      lng
    } = this.props;
    const data = await team.getRoles(`/role/${lng}`);
  }

  async componentDidUpdate({ lng }) {
    const { lng: nextLng } = this.props;
    if (lng !== nextLng) {
      const { team } = this.props;
      await team.getRoles(`/role/${nextLng}`);
    }
  }

  render() {
    const {
      t,
      navigation: { navigate },
      team: { listEntries = [] } = {}
    } = this.props;

    return (
      <ScrollView style={[styles.container]}>
        <Title>{t("Team")}</Title>

        <Link url="https://docs.google.com/forms/d/1TyjlSwVDZX1oIb_OWpl2naE6WuCNze7F9XZPn-gRGLQ/viewform?edit_requested=true">
          {t("Join the team")}
        </Link>
        <Link url="https://docs.google.com/forms/d/1BwKSKQrWuDXpv6rNm6GdkIIcRZy3MK6a5vKSR-OGB5I/viewform?edit_requested=true">
          {t("Share music")}
        </Link>
        <Link url="https://docs.google.com/forms/d/1-DrqiZ1nIzKxu3-MX6kkPIeGqier3JhNKmV72DMfijg/viewform?edit_requested=true">
          {t("Recommend location")}
        </Link>
        <Line />
        <View style={[styles.list]}>
          <TeamList
            list={listEntries}
            onPress={id => navigate("author", { id })}
          />
        </View>
      </ScrollView>
    );
  }
}

const TeamList = ({ list, onPress }) => (
  <FlatList
    data={list}
    numColumns={3}
    columnWrapperStyle={{
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around"
    }}
    keyExtractor={({ name }) => name}
    renderItem={({ item: { name, photo, trans } }) => (
      <TouchableOpacity onPress={() => onPress(trans)}>
        <View style={[styles.authorWrapper]}>
          <ProfileImage src={photo} />
          <Text style={[styles.authorName]}>{name}</Text>
        </View>
      </TouchableOpacity>
    )}
  />
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: {
    // paddingLeft: 20,
    // paddingRight: 30,
    paddingTop: 30
  },
  authorWrapper: {
    width: 100,
    alignItems: "center"
  },
  fotoCircleWrapper: {
    width: 87,
    height: 87,
    borderRadius: 87,
    borderColor: "#eee",
    borderWidth: 1,
    overflow: "hidden"
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

export default TeamScreen;
