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
  Modal,
  TextInput
} from "react-native";
import { LinearGradient } from "expo";
import { TextInputMask } from "react-native-masked-text";

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
    successModal: false,
    phone: "",
    email: "",
    name: "",
    address: "",
    message: "",
    errorStatus: true,
    error: {},
    touched: false
  };

  validationForm = async () => {
    const { phone, email, name, error, touched, errorStatus } = this.state;
    if (this.state.phone === "") {
      await this.setState({
        error: { ...this.state.error, phone: "This is required field" }
      });
    } else {
      await this.setState({ error: { ...this.state.error, phone: undefined } });
    }

    if (this.state.email === "") {
      await this.setState({
        error: { ...this.state.error, email: "This is required field" }
      });
    } else {
      await this.setState({ error: { ...this.state.error, email: undefined } });
    }

    if (this.state.name === "") {
      await this.setState({
        error: { ...this.state.error, name: "This is required field" }
      });
    } else {
      {
        await this.setState({
          error: { ...this.state.error, name: undefined }
        });
      }
    }

    const regExpEmail = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(
      this.state.email
    );
    if (!regExpEmail)
      await this.setState({
        error: { ...this.state.error, email: "Email is not valid" }
      });

    const regExpPhone = /\+38 \(\d\d\d\) \d\d\d \d\d \d\d/.test(
      this.state.phone
    );
    if (!regExpPhone)
      await this.setState({
        error: { ...this.state.error, phone: "Phone is not valid" }
      });

    if (
      !this.state.error.phone &&
      !this.state.error.name &&
      !this.state.error.email
    ) {
      await this.setState({ errorStatus: false });
    }
  };

  componentDidMount() {
    this.props.shop.calcTotal();
  }
  render() {
    const {
      phone,
      email,
      name,
      address,
      message,
      touched,
      errorStatus,
      error
    } = this.state;
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
                  onPress={value => navigate("product", { id: value })}
                />
                <View style={{ paddingLeft: 20 }}>
                  <Line />
                </View>
              </View>
            )
          )}
          {shop.cartProduct.length > 0 ? (
            <View>
              <View style={[styles.totalWrapper]}>
                <StyledText.Bold>Total</StyledText.Bold>
                <StyledText.Bold>{shop.getTotal} ₴</StyledText.Bold>
              </View>
              <StyledText.Bold>Shipment details</StyledText.Bold>

              <TextInput
                style={[styles.input]}
                onChangeText={name =>
                  this.setState({ name }, () => this.validationForm())
                }
                defaultValue={name}
                value={name}
                underlineColorAndroid="transparent"
                placeholder="Input your name"
              />
              {touched && errorStatus && !!error.name && (
                <Text style={[styles.errorInput]}>{error.name}</Text>
              )}
              <TextInputMask
                style={[styles.input]}
                onChangeText={phone =>
                  this.setState({ phone }, () => this.validationForm())
                }
                defaultValue={phone}
                value={phone}
                underlineColorAndroid="transparent"
                placeholder="Input your phone"
                ref={"refCard"}
                type={"custom"}
                options={{
                  mask: "+38 (999) 999 99 99"
                }}
                keyboardType="phone-pad"
              />
              {touched && errorStatus && !!error.phone && (
                <Text style={[styles.errorInput]}>{error.phone}</Text>
              )}

              <TextInput
                keyboardType="email-address"
                style={[styles.input]}
                onChangeText={email =>
                  this.setState({ email }, () => this.validationForm())
                }
                defaultValue={email}
                value={email}
                underlineColorAndroid="transparent"
                placeholder="Input your email"
              />
              {touched && errorStatus && !!error.email && (
                <Text style={[styles.errorInput]}>{error.email}</Text>
              )}
              <TextInput
                keyboardType="email-address"
                style={[styles.input]}
                onChangeText={address => this.setState({ address })}
                defaultValue={address}
                value={address}
                underlineColorAndroid="transparent"
                placeholder="Input your address"
              />
              <TextInput
                style={[styles.input, styles.textarea]}
                multiline={true}
                numberOfLines={4}
                onChangeText={message => this.setState({ message })}
                defaultValue={message}
                value={message}
                underlineColorAndroid="transparent"
                placeholder="Write details"
              />

              <Button
                onPress={async () => {
                  await this.setState({ touched: true }, () =>
                    this.validationForm()
                  );
                  if (!errorStatus) {
                    await shop.sendOrder({
                      address,
                      phone,
                      email,
                      name,
                      address,
                      message
                    });
                    return this.setState({ successModal: true });
                  }
                }}
              >
                {t("Check out")}
              </Button>
            </View>
          ) : (
            <StyledText.Light>No items in cart yet</StyledText.Light>
          )}
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
  },
  input: {
    height: 40,
    borderColor: "#cdd3de",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10
  },
  textarea: {
    height: 160,
    marginBottom: 25
  },
  errorInput: {
    marginLeft: 25,
    color: "red",
    fontWeight: "300",
    marginBottom: 15
  }
});

export default CartScreen;
