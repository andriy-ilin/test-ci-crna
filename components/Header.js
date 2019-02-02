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
import Cart from "../icons/Cart";
import MenuIcon from "../icons/Menu";
import LeftArrow from "../icons/LeftArrow";
import DownArrow from "../icons/DownArrow";
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 30 : 0;

const TITLE_OFFSET_CENTER_ALIGN = Platform.OS === "ios" ? 70 : 56;
const TITLE_OFFSET_LEFT_ALIGN = Platform.OS === "ios" ? 20 : 56;

const WHITE_LIST_ROUTE = ["home", "shop", "donate", "favorite", "regions"];
const WHITE_LIST_SHOP_ROUTE = ["shop", "cart", "product"];

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
            <RightBlock
              navigation={navigation}
              routeName={navigation.state.routeName}
            />
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
    const { lng, i18n, navigation, routeName } = this.props;
    return !WHITE_LIST_SHOP_ROUTE.includes(routeName) ? (
      <TouchableOpacity
        style={[styles.rightBlock]}
        onPress={() => i18n.changeLanguage(lng === "en" ? "de" : "en")}
      >
        <View style={[styles.rightBlockView]}>
          <DownArrow marginRight={5} />
          <Text>{lng.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    ) : (
      <CartComponent navigation={navigation} />
    );
  }
}

@inject("shop")
@observer
class CartComponent extends React.Component {
  render() {
    const { navigation, shop } = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.navigate("cart")}>
        <View style={[stylesCart.wrapper]}>
          <View style={[stylesCart.iconWrap]}>
            <Cart />
          </View>
          {shop.cartQuantity > 0 && (
            <View style={[stylesCart.quantityWrapper]}>
              <Text style={[stylesCart.quantity]}>{shop.cartQuantity}</Text>
            </View>
          )}
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

const stylesCart = StyleSheet.create({
  wrapper: {
    paddingLeft: 16,
    paddingRight: 4,
    paddingTop: 20,
    paddingBottom: 20
  },
  iconWrap: {},
  quantityWrapper: {
    position: "absolute",
    bottom: 17,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#77d9a0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  quantity: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#fff"
  }
});
