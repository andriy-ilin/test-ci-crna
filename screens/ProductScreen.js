import React, { Component } from "react";
import { observer, inject } from "mobx-react/native";
import { withNamespaces } from "react-i18next";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Title from "../components/Title";
import Button from "../components/Button";
import Foto from "../components/Foto";
import Carousel from "../components/Carousel";
import Loading from "../components/Loading";
import StyledText from "../components/StyledText";
import FormPicker from "../components/FormPicker";
import Line from "../components/Line";
import Cart from "../icons/Cart";

import WHITE_LIST_ADDITIONAL_INFO from "../constants/AdditionalInfoShop";

const { width } = Dimensions.get("window");

@withNamespaces(["shop"], { wait: true })
@inject("shop")
@observer
export class ProductScreen extends Component {
  state = { sizesBox: {}, loading: false };
  async componentDidMount() {
    const {
      shop,
      navigation: {
        navigate,
        state: { routeName, params: { id } = {} } = {}
      } = {}
    } = this.props;
    this.setState({ loading: true });
    await shop.getProducts(`/shopItems/${id}`, "product");
    return this.setState({ loading: false });
  }

  async componentDidUpdate({
    navigation: { state: { params: { id: prevId } = {} } = {} } = {}
  }) {
    const {
      shop,
      navigation: { navigate, state: { params: { id: nextId } = {} } = {} } = {}
    } = this.props;

    if (prevId !== nextId) {
      this.setState({ loading: true });
      this.scrollView.scrollTo({ y: 0, animated: true });
      await shop.getProducts(`/shopItems/${nextId}`, "product");
      return this.setState({ loading: false });
    }
  }

  render() {
    const {
      t,
      navigation: { navigate, state: { routeName, params: { id } = {} } = {} },
      shop,
      shop: {
        getProduct: {
          shortDescription = "",
          img,
          title,
          priceArr: { newPrice } = {},
          slider = [],
          tab = []
        } = {}
      } = {}
    } = this.props;

    if (shop.loading) return <Loading />;
    // Todo: check loading
    const renderItem = data =>
      data.map((el = "") => ({
        uri: el
      }));
    return (
      <View style={[styles.container]}>
        <ScrollView
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
        >
          <View style={[styles.wrapperTitle]}>
            <Title flexWrap="wrap">{title}</Title>
          </View>
          <StyledText.Bold>{newPrice}</StyledText.Bold>

          <Carousel
            data={renderItem(slider)}
            renderItem={({ uri }, key) => (
              <View key={key} style={[styles.articleContainer]}>
                <Foto
                  src={uri}
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  borderRadius={5}
                  position="absolute"
                />
              </View>
            )}
          />

          <StyledText.Light
            containerProps={{
              paddingBottom: 10,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 0
            }}
          >
            {shortDescription.replace(/\s+/g, " ").trim()}
          </StyledText.Light>

          <View style={{ marginBottom: 10 }}>
            {tab.map(
              (
                { title, headingArr = [], description = [], table = [] },
                key,
                arr
              ) => (
                <View key={key}>
                  <View
                    style={{
                      paddingLeft: 20,
                      paddingBottom: 20,
                      paddingTop: 20
                    }}
                  >
                    <Line />
                  </View>
                  <StyledText.Bold>{title}</StyledText.Bold>
                  {description.map((el = "", key) => (
                    <View key={key} style={{ marginTop: 0 }}>
                      {headingArr[key] && (
                        <StyledText.Medium
                          containerProps={{
                            paddingBottom: 0,
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingTop: 10
                          }}
                        >
                          {headingArr[key]}
                        </StyledText.Medium>
                      )}
                      <StyledText.Light
                        containerProps={{
                          paddingBottom: 5,
                          paddingLeft: 20,
                          paddingRight: 20,
                          paddingTop: 0
                        }}
                      >
                        {el}
                      </StyledText.Light>
                    </View>
                  ))}
                  {table.length !== 0 && (
                    <View style={{ marginTop: 10 }}>
                      <Table data={table} />
                    </View>
                  )}
                </View>
              )
            )}
          </View>
          <View
            style={{
              paddingLeft: 20,
              paddingBottom: 20,
              paddingTop: 20
            }}
          >
            <Line />
          </View>
          <View style={[styles.chooseWrapper]}>
            <SizesBox
              tab={tab}
              // chooseData = {this.state.sizesBox}
              onPress={data => this.setState({ sizesBox: data })}
              t={t}
            />
            <ProductQuantity />
          </View>
          <Button
            onPress={() => {
              this.props.shop.addItem({
                id,
                quantity: this.props.shop.quantity,
                ...this.state.sizesBox
              });
              navigate("shop");
            }}
          >
            {t("Add to cart")}
          </Button>
        </ScrollView>
      </View>
    );
  }
}

const WHITE_ADDITIONAL_INFO = ["Додаткова інформація"];

@withNamespaces(["shop"], { wait: true })
@inject("shop")
@observer
class ProductQuantity extends Component {
  componentDidMount() {
    this.props.shop.set("quantity", 1);
  }

  render() {
    const {
      shop: { quantity },
      t
    } = this.props;
    return (
      <View>
        <StyledText.Bold
          containerProps={{
            paddingBottom: 10,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 15
          }}
        >
          {t("Quantity")}
        </StyledText.Bold>
        <View style={[styles.sizesBoxWrapper]}>
          <View style={[styles.blockQuantity]}>
            <TouchableOpacity
              style={styles.buttonBlock}
              onPress={() => {
                this.changeQuantity("-");
              }}
            >
              <Text style={styles.textButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{quantity}</Text>
            <TouchableOpacity
              style={styles.buttonBlock}
              onPress={() => {
                this.changeQuantity("+");
              }}
            >
              <Text style={styles.textButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  changeQuantity = sign => {
    this.props.shop.changePropsQuantity(sign);
  };
}

class SizesBox extends Component {
  state = {};
  async componentWillMount() {
    const { tab = [], onPress } = this.props;
    const sizesTable = tab.find(({ title }) =>
      WHITE_ADDITIONAL_INFO.includes(title)
    );
    if (!sizesTable) return;
    const { table } = sizesTable;

    const toState = table.reduce((prev, item, key) => {
      const options = item[1].split(",").map(el => el.trim());
      return options.length > 1 ? { ...prev, [item[0]]: null } : prev;
    }, {});

    await this.setState({ ...toState }, () => onPress(this.state));
  }

  render() {
    const { tab = [], onPress, t } = this.props;
    const sizesTable = tab.find(({ title }) =>
      WHITE_ADDITIONAL_INFO.includes(title)
    );
    if (!sizesTable) return <View />;

    const { table } = sizesTable;
    return table.map((item, key) => {
      const options = item[1]
        .split(",")
        .map(el => el.trim())
        .map(el => ({ label: el, value: el }));

      return (
        options.length > 1 && (
          <View key={key}>
            <StyledText.Bold
              containerProps={{
                paddingBottom: 10,
                paddingLeft: 0,
                paddingRight: 0,
                paddingTop: 15
              }}
            >
              {t(WHITE_LIST_ADDITIONAL_INFO[item[0]] || item[0])}
            </StyledText.Bold>
            <View style={[styles.sizesBoxWrapper]}>
              <FormPicker
                items={options}
                value={this.state[item[0]]}
                placeholder={`${t("Choose")} ${t(
                  WHITE_LIST_ADDITIONAL_INFO[item[0]] || item[0]
                )}`}
                onValueChange={async text => {
                  await this.setState({ [item[0]]: text });
                  onPress(this.state);
                }}
                buttonText={t("Choose")}
              />
            </View>
          </View>
        )
      );
    });
  }
}

const Table = ({ data = [] }) =>
  data.map((el = [], key) => (
    <View
      key={key}
      style={{
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5,
        flexDirection: "row",
        alignSelf: "stretch"
      }}
    >
      {el.map((item, elKey) => (
        <View key={elKey} style={{ flex: 1, alignSelf: "stretch" }}>
          {elKey === 0 || key === 0 ? (
            <StyledText.Medium
              fontSize={12}
              lineHeight={12}
              containerProps={{
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingTop: 0
              }}
            >
              {item}
            </StyledText.Medium>
          ) : (
            <StyledText.Light
              fontSize={14}
              lineHeight={14}
              containerProps={{
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingTop: 0
              }}
            >
              {item}
            </StyledText.Light>
          )}
        </View>
      ))}
    </View>
  ));

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapperTitle: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  articleContainer: {
    margin: 10,
    marginBottom: 20,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    width: width - 60,
    // flex: 1,
    height: width - 60,
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 0,
    shadowColor: "#4a4a4a",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  chooseWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  sizesBoxWrapper: {
    width: 150,
    height: 40,

    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#77d9a0"
  },
  blockQuantity: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  text: { fontWeight: "bold" },
  textButton: {
    padding: 10,
    fontWeight: "bold"
  }
});

export default ProductScreen;
