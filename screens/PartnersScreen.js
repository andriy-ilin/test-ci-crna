import React, { Component } from "react";
import { observer } from "mobx-react/native";
import { withNamespaces } from "react-i18next";
import { LinearGradient } from "expo";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking
} from "react-native";
import Button from "../components/Button";
import Title from "../components/Title";
import Fest from "../icons/Fest";
import Fujifilm from "../icons/Fujifilm";
import LandRover from "../icons/LandRover";
import Yedynka from "../icons/Yedynka";

@withNamespaces(["partners"], { wait: true })
@observer
export class PartnersScreen extends Component {
  render() {
    const { t } = this.props;
    return (
      <View style={[styles.container]}>
        <Title>{t("Partners")}</Title>

        <View style={[styles.wrapper]}>
          <View style={[styles.flexContainer]}>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.fest.lviv.ua")}
            >
              <Fest />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://yedynkadigital.com")}
            >
              <Yedynka />
            </TouchableOpacity>
          </View>
          <View style={[styles.flexContainer]}>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.fujifilm.eu/ua")}
            >
              <Fujifilm />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.landrover.ua")}
            >
              <LandRover />
            </TouchableOpacity>
          </View>
        </View>

        <Button
          onPress={() =>
            Linking.openURL(
              "https://docs.google.com/forms/d/e/1FAIpQLSdlJ3is__dlTJ6Lr8zYgGWVhCnWmrAsp4iPQyWG8ffDucvh7Q/viewform"
            )
          }
        >
          {t("Become a partner")}
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  wrapper: {
    paddingTop: 30,
    flex: 1
  },
  flexContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row"
  }
});

export default PartnersScreen;
