import React from "react";
import {
  View,
  Text,
  Platform,
  I18nManager,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import HomeTabBar from "../icons/HomeTabBar";
import ShopTabBar from "../icons/ShopTabBar";
import FavoriteTabBar from "../icons/FavoriteTabBar";
import DonateTabBar from "../icons/DonateTabBar";
import RegionsTabBar from "../icons/RegionsTabBar";

const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const links = [
  { name: "home", title: "home", icon: props => <HomeTabBar {...props} /> },
  {
    name: "donate",
    title: "donate",
    icon: props => <DonateTabBar {...props} />
  },
  { name: "shop", title: "shop", icon: props => <ShopTabBar {...props} /> },
  {
    name: "favorite",
    title: "favorite",
    icon: props => <FavoriteTabBar {...props} />
  },
  {
    name: "regions",
    title: "regions",
    icon: props => <RegionsTabBar {...props} />
  }
];

export default class TabBar extends React.Component {
  render() {
    const {
      linkBlock: LinkBlock = DefaultLinkBlock,
      navigation: {
        navigate,
        state: { routeName }
      }
    } = this.props;
    return (
      <View style={[styles.container]}>
        {links.map(item => (
          <LinkBlock
            key={item.name}
            {...item}
            navigate={navigate}
            routeName={routeName}
          />
        ))}
      </View>
    );
  }
}

const DefaultLinkBlock = ({ name, title, navigate, routeName, icon: Icon }) => (
  <TouchableOpacity onPress={() => navigate(name)} style={[styles.linkBlock]}>
    <View style={[styles.iconWrapper]}>
      <Icon active={name === routeName} />
    </View>
    <View style={[styles.titleWrapper]}>
      <Text style={[styles.title, name === routeName && { color: "#75d396" }]}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#fff",
    borderColor: "#eee",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  linkBlock: {
    alignItems: "center",
    height: "100%"
  },
  iconWrapper: {
    height: 35,
    alignItems: "center",
    justifyContent: "center"
  },
  titleWrapper: {},
  title: {
    fontSize: 12,
    textTransform: "capitalize",
    color: "#a7a7a7"
  }
});
