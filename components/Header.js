import React from "react";
import {
  View,
  Text,
  Platform,
  I18nManager,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Logo from "../icons/Logo";
import MenuIcon from "../icons/Menu";
import DownArrow from "../icons/DownArrow";
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 30 : 0;

const TITLE_OFFSET_CENTER_ALIGN = Platform.OS === "ios" ? 70 : 56;
const TITLE_OFFSET_LEFT_ALIGN = Platform.OS === "ios" ? 20 : 56;

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

    return (
      <View style={[styles.container]}>
        <View style={[styles.statusBar]} />
        <View style={[styles.appBar]}>
          <LeftBlockWrapper>
            <LeftBlock navigation={navigation} />
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

const DefaultLeftBlock = ({ navigation }) => (
  <View style={[styles.leftBlock]}>
    <TouchableOpacity onPress={() => navigation.navigate("menu")}>
      <MenuIcon />
    </TouchableOpacity>
  </View>
);
const DefaultRightBlock = () => (
  <View style={[styles.rightBlock]}>
    <TouchableOpacity style={[styles.rightBlockView]}>
      <DownArrow marginRight={5} />
      <Text>UK</Text>
    </TouchableOpacity>
  </View>
);
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
  leftBlock: {},
  rightBlock: {},
  rightBlockView: {
    flexDirection: "row",
    alignItems: "center"
  },
  centerBlock: {}
});
