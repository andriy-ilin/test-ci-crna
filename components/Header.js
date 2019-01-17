import React from "react";
import {
  View,
  Text,
  Platform,
  I18nManager,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { inject, observer } from "mobx-react/native";
import { withNamespaces } from "react-i18next";

import Logo from "../icons/Logo";
import MenuIcon from "../icons/Menu";
import LeftArrow from "../icons/LeftArrow";
import DownArrow from "../icons/DownArrow";
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 30 : 0;

const TITLE_OFFSET_CENTER_ALIGN = Platform.OS === "ios" ? 70 : 56;
const TITLE_OFFSET_LEFT_ALIGN = Platform.OS === "ios" ? 20 : 56;

const WHITE_LIST_ROUTE = ["home", "shop", "donate", "favorite", "regions"];

export default class Header extends React.Component {
  static get HEIGHT() {
    return APPBAR_HEIGHT + STATUSBAR_HEIGHT;
  }

  render() {
    const {
      leftBlock: LeftBlock = DefaultLeftBlock,
      RightBlock: RightBlock = DefaultRightBlock,
      centerBlock: CenterBlock = DefaultCenterBlock,
      navigation
    } = this.props;
    const mainRoute = WHITE_LIST_ROUTE.includes(navigation.state.routeName);
    return (
      <View style={[styles.container]}>
        <View style={[styles.statusBar]} />
        <View style={[styles.appBar]}>
          <LeftBlockWrapper>
            <LeftBlock navigation={navigation} mainRoute={mainRoute} />
          </LeftBlockWrapper>

          <CenterBlockWrapper>
            <CenterBlock />
          </CenterBlockWrapper>

          <RightBlockWrapper>
            <RightBlock />
          </RightBlockWrapper>
        </View>
      </View>
    );
  }
}

const DefaultLeftBlock = ({ navigation, mainRoute }) => (
  <TouchableOpacity
    onPress={() =>
      mainRoute ? navigation.navigate("menu") : navigation.goBack()
    }
  >
    <View style={[styles.leftBlock]}>
      {mainRoute ? <MenuIcon /> : <LeftArrow />}
    </View>
  </TouchableOpacity>
);

@withNamespaces(["home", "common"], { wait: true })
@observer
class DefaultRightBlock extends React.Component {
  render() {
    const { lng, i18n } = this.props;
    return (
      <TouchableOpacity
        style={[styles.rightBlock]}
        onPress={() => i18n.changeLanguage(lng === "en" ? "de" : "en")}
      >
        <View style={[styles.rightBlockView]}>
          <DownArrow marginRight={5} />
          <Text>{lng.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const DefaultCenterBlock = () => (
  <View style={[styles.centerBlock]}>
    <Logo />
  </View>
);

const LeftBlockWrapper = ({ children }) => (
  <View style={[styles.leftBlockWrapper]}>{children}</View>
);
const RightBlockWrapper = ({ children }) => (
  <View style={[styles.rightBlockWrapper]}>{children}</View>
);
const CenterBlockWrapper = ({ children }) => (
  <View style={[styles.centerBlockWrapper]}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  statusBar: {
    height: STATUSBAR_HEIGHT
  },
  appBar: {
    height: APPBAR_HEIGHT,
    // justifyAlign: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftBlockWrapper: {
    minWidth: 70,
    paddingLeft: 20,
    alignItems: "flex-start"
  },
  rightBlockWrapper: {
    minWidth: 70,
    paddingRight: 20,
    display: "flex",
    alignItems: "flex-end"
  },
  centerBlockWrapper: {},
  leftBlock: {
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  rightBlock: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  rightBlockView: {
    flexDirection: "row",
    alignItems: "center"
  },
  centerBlock: {}
});
