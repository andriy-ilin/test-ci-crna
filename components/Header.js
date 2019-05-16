import React from "react";
import {
  View,
  Text,
  Platform,
  I18nManager,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { inject, observer } from "mobx-react/native";
import { withNamespaces } from "react-i18next";
const { width, height } = Dimensions.get("window");

import Line from "./Line";
import Title from "./Title";
import Button from "./Button";
import StyledText from "./StyledText";
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
const WHITE_LIST_HIDE_RIGHT_BLOCK = ["author", "regionArticles"];
const WHITE_LIST_ARTICLES_ROUTE = [
  "article",
  "favoriteArticleId",
  "regionArticleId"
];

export default class Header extends React.Component {
  static get HEIGHT() {
    return APPBAR_HEIGHT + STATUSBAR_HEIGHT;
  }

  render() {
    const {
      leftBlock: LeftBlock = DefaultLeftBlock,
      RightBlock: RightBlock = DefaultRightBlock,
      centerBlock: CenterBlock = DefaultCenterBlock,
      navigation: {
        state: { routeName }
      },
      navigation
    } = this.props;
    const mainRoute = WHITE_LIST_ROUTE.includes(routeName);
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
            {!WHITE_LIST_HIDE_RIGHT_BLOCK.includes(routeName) && (
              <RightBlock navigation={navigation} routeName={routeName} />
            )}
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

@withNamespaces(["common"], { wait: true })
@inject("lang")
@observer
class DefaultRightBlock extends React.Component {
  state = {
    fromTop: null,
    openModal: false
  };
  async componentDidMount() {
    const { lang } = this.props;
    await lang.getLang("/lang/");
  }
  measureLngView = event => {
    const { x, y, width, height } = event.nativeEvent.layout;
    this.setState({ fromTop: y + height });
  };
  render() {
    const {
      lng,
      i18n,
      navigation: { navigate },
      navigation,
      routeName,
      lang: { list = [], articlesTranslateList = [] } = {},
      lang,
      t
    } = this.props;
    const { fromTop, openModal } = this.state;
    return !WHITE_LIST_SHOP_ROUTE.includes(routeName) ? (
      <View>
        <TouchableOpacity
          style={[styles.rightBlock]}
          onPress={() => this.setState({ openModal: !openModal })}
        >
          <View
            style={[styles.rightBlockView]}
            onLayout={event => this.measureLngView(event)}
          >
            <DownArrow marginRight={5} />
            <Text>{lng.toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
        {openModal && (
          <View style={[stylesLng.wrapper, { top: fromTop + 10 }]}>
            <TouchableOpacity
              style={[stylesLng.closeModalSpace]}
              onPress={() => this.setState({ openModal: false })}
            />

            <View style={[stylesLng.container]}>
              <Title>{t("Languages")}</Title>
              <View style={{ paddingLeft: 20 }}>
                <Line />
              </View>

              {WHITE_LIST_ARTICLES_ROUTE.includes(routeName)
                ? articlesTranslateList.map(({ key, value, link }) => (
                    <TouchableOpacity
                      key={key}
                      onPress={async () => {
                        if (link) {
                          this.setState({ openModal: false });
                          const id = await lang.getCatalog(key, link);
                          navigate(routeName, { id });
                          await lang.changeCurrentLang(key, i18n);
                        }
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <StyledText.Light
                          color={!link ? "#a3a3a3" : "#272727"}
                          containerProps={{
                            paddingBottom: 10,
                            paddingTop: 10,
                            paddingLeft: 25
                          }}
                        >
                          {key.toUpperCase()} {value}{" "}
                        </StyledText.Light>
                        <View
                          style={{
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "flex-start"
                          }}
                        >
                          <StyledText.Light
                            fontSize={10}
                            color="#a3a3a3"
                            containerProps={{
                              paddingBottom: 10,
                              paddingTop: 10,
                              paddingLeft: 10
                            }}
                          >
                            {!link && t("translation is not available")}
                          </StyledText.Light>
                        </View>
                      </View>
                      <Line backgroundColor="#eee" />
                    </TouchableOpacity>
                  ))
                : list.map(({ key, value, link }) => (
                    <TouchableOpacity
                      key={key}
                      onPress={() => {
                        lang.changeCurrentLang(key, i18n);
                        this.setState({ openModal: false });
                      }}
                    >
                      <StyledText.Light
                        containerProps={{
                          paddingBottom: 10,
                          paddingTop: 10,
                          paddingLeft: 25
                        }}
                      >
                        {key.toUpperCase()} {value}
                      </StyledText.Light>
                      <Line backgroundColor="#eee" />
                    </TouchableOpacity>
                  ))}
            </View>
          </View>
        )}
      </View>
    ) : (
      <CartComponent navigation={navigation} />
    );
  }
}
const stylesLng = StyleSheet.create({
  wrapper: {
    position: "absolute",
    right: -20,
    width,
    height: height
  },
  container: {
    backgroundColor: "#fff"
  },
  closeModalSpace: {
    position: "absolute",
    backgroundColor: "rgba(51,51,51,.6)",
    right: 0,
    top: 0,
    left: 0,
    right: 0,
    width,
    height
  }
});

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
