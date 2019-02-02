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
  Dimensions,
  Picker,
  Modal
} from "react-native";
import { LinearGradient } from "expo";

import Title from "../components/Title";
import Button from "../components/Button";
import Foto from "../components/Foto";
import Carousel from "../components/Carousel";
import Loading from "../components/Loading";
import StyledText from "../components/StyledText";
import FormPicker from "../components/FormPicker";
import Line from "../components/Line";
import Cart from "../icons/Cart";

const { width } = Dimensions.get("window");

@withNamespaces(["shop"], { wait: true })
@inject("shop")
@observer
export class CartScreen extends Component {
  state = {
    successModal: false
  };
  componentDidMount() {
    this.props.shop.calcTotal();
  }
  render() {
    const {
      t,
      navigation: { navigate, state: { routeName, params: { id } = {} } = {} },
      shop
    } = this.props;
    if (this.state.successModal)
      return (
        <Modal>
          <View style={[styles.modalSuccess]}>
            <View style={[styles.modalSuccessWrapper]}>
              <Title textAlign="center" paddingBottom={40} paddingRight={20}>
                Success
              </Title>
              <Button
                onPress={() => {
                  console.log("shop.cartProduct", shop.cartProduct);
                  shop.clear();
                  this.setState({ successModal: false });

                  navigate("shop");
                }}
              >
                {t("Close")}
              </Button>
            </View>
          </View>
        </Modal>
      );
    return (
      <View style={[styles.container]}>
        <ScrollView>
          <View style={[styles.wrapperTitle]}>
            <Title flexWrap="wrap">{t("Cart")}</Title>
          </View>
          {shop.cartProduct.map(
            (
              {
                id,
                img,
                quantity,
                priceArr: { newPrice = "" } = {},
                rest,
                title
              },
              key
            ) => (
              <View key={id}>
                <Item
                  price={+newPrice.replace(" ₴", "").replace(",", "")}
                  title={title}
                  rest={rest}
                  img={img}
                  id={id}
                  quantity={quantity}
                  changeQuantity={(id, sign) => shop.changeQuantity(id, sign)}
                  onPress={value => {
                    console.log("onPress value", value);
                    navigate("product", { id: value });
                  }}
                />
                <View style={{ paddingLeft: 20 }}>
                  <Line />
                </View>
              </View>
            )
          )}
          <View style={[styles.totalWrapper]}>
            <StyledText.Bold>Total</StyledText.Bold>
            <StyledText.Bold>{shop.getTotal} ₴</StyledText.Bold>
          </View>
          <Button
            onPress={() => {
              console.log("shop.cartProduct", shop.cartProduct);
              this.setState({ successModal: true });
            }}
          >
            {t("Check out")}
          </Button>
        </ScrollView>
      </View>
    );
  }
}

const Item = ({
  id,
  price,
  img,
  quantity,
  rest,
  title,
  onPress,
  changeQuantity
}) => (
  <View style={[styles.wrapperItem]}>
    <TouchableOpacity onPress={() => onPress(id)} style={{ paddingLeft: 20 }}>
      <Foto src={img} width={120} height={120} borderRadius={8} />
    </TouchableOpacity>
    <View>
      <View>
        <StyledText.Bold
          fontSize={14}
          lineHeight={15}
          flexWrap="wrap"
          containerProps={{
            paddingBottom: 5,
            paddingLeft: 20,
            paddingRight: 120,
            paddingTop: 0
          }}
        >
          {title}
        </StyledText.Bold>
        <StyledText.Medium
          fontSize={14}
          lineHeight={14}
          flexWrap="wrap"
          containerProps={{
            paddingBottom: 10,
            paddingTop: 0
          }}
        >
          {price * quantity} ₴
        </StyledText.Medium>
        {rest &&
          Object.entries(rest).map(([key, value], keyArr) => (
            <StyledText.Light
              key={keyArr}
              fontSize={12}
              lineHeight={12}
              flexWrap="wrap"
              containerProps={{
                paddingBottom: 0,
                paddingLeft: 20,
                paddingRight: 120,
                paddingTop: 0
              }}
            >
              {key} : {value || "необрано"}
            </StyledText.Light>
          ))}
      </View>
      <ProductQuantity
        changeQuantity={changeQuantity}
        id={id}
        quantity={quantity}
      />
    </View>
  </View>
);

const ProductQuantity = ({ changeQuantity, id, quantity }) => (
  <View style={[styles.sizesBoxWrapper]}>
    <View style={[styles.blockQuantity]}>
      <TouchableOpacity
        style={styles.buttonBlock}
        onPress={() => {
          changeQuantity(id, "-");
        }}
      >
        <Text style={styles.textButton}>-</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{quantity}</Text>
      <TouchableOpacity
        style={styles.buttonBlock}
        onPress={() => {
          changeQuantity(id, "+");
        }}
      >
        <Text style={styles.textButton}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapperTitle: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  wrapperItem: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20
  },
  totalWrapper: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  sizesBoxWrapper: {
    width: 150,
    height: 40,
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#77d9a0"
  },
  blockQuantity: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  text: {},
  textButton: {
    padding: 10
  },
  modalSuccess: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  modalSuccessWrapper: {
    width: "100%"
  }
});

export default CartScreen;
