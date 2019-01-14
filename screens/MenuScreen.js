import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { withNamespaces } from "react-i18next";
import Logo from "../icons/Logo";
import RightArrow from "../icons/RightArrow";

const menu = [
  { title: "About", routeName: "about" },
  { title: "Team", routeName: "team" },
  { title: "Video", routeName: "video" },
  { title: "Partners", routeName: "partners" },
  { title: "Contacts", routeName: "contacts" }
];

@withNamespaces(["menu"], { wait: true })
export class MenuScreen extends Component {
  render() {
    const {
      t,
      navigation: { navigate }
    } = this.props;
    return (
      <View style={[styles.container]}>
        <View style={[styles.logoWrapper]}>
          <View style={[styles.backNavigation]} />
          <Logo gradient />
          <TouchableOpacity
            style={[styles.backNavigation]}
            onPress={() => this.props.navigation.goBack()}
          >
            <RightArrow />
          </TouchableOpacity>
        </View>
        {menu.map(({ title, routeName }, key, array) => (
          <Link
            key={routeName}
            title={title}
            routeName={routeName}
            t={t}
            navigate={navigate}
            last={array.length - 1 === key}
          />
        ))}
      </View>
    );
  }
}

const Link = ({ navigate, title, t, routeName, last }) => (
  <TouchableOpacity
    style={[styles.linkWrapper]}
    onPress={() => navigate(routeName)}
  >
    <Text style={[styles.link]}>{t(title)}</Text>
    {!last && <View style={[styles.line]} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 46
  },
  logoWrapper: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    marginBottom: 47
  },
  backNavigation: {
    width: 40,
    alignItems: "center",
    justifyContent: "space-around"
  },
  linkWrapper: {
    paddingLeft: 24,
    marginTop: 24
  },
  link: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#757575",
    marginBottom: 24
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#75d396"
  }
});

export default MenuScreen;
