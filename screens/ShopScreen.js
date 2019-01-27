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
  FlatList
} from "react-native";
import Title from "../components/Title";
import Foto from "../components/Foto";
import StyledText from "../components/StyledText";
import Cart from "../icons/Cart";

@withNamespaces(["shop"], { wait: true })
@inject("shop")
@observer
export class ShopScreen extends Component {
  async componentDidMount() {
    const { shop } = this.props;
    await shop.getProducts("/catalogShopItems/uk");
  }
  render() {
    const {
      t,
      navigation: { navigate },
      shop: { list = [] } = {}
    } = this.props;
    return (
      <View style={[styles.container]}>
        <View style={[styles.wrapperTitle]}>
          <Title flexWrap="wrap">{t("Shop")}</Title>
          <View style={[styles.iconWrap]}>
            <Cart />
          </View>
        </View>
        <StyledText.Light>{t("Long Description")}</StyledText.Light>
        <ItemsList list={list} onPress={id => navigate("product", { id })} />
      </View>
    );
  }
}

const ItemsList = ({ list, onPress }) => (
  <FlatList
    data={list}
    numColumns={2}
    columnWrapperStyle={{
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around"
    }}
    keyExtractor={({ id }) => id}
    renderItem={({ item: { img, title, priceArr, id } }) => (
      <TouchableOpacity key={id} onPress={() => onPress(id)}>
        <View style={[styles.itemWrapper]}>
          <View style={[styles.imgWrapper]}>
            <Foto
              position="absolute"
              left={0}
              right={0}
              bottom={0}
              top={0}
              borderRadius={8}
              src={img}
            />
          </View>
          <StyledText.Bold
            fontSize={12}
            lineHeight={12}
            width={163}
            textAlign="center"
            containerProps={{
              paddingBottom: 0,
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 10
            }}
          >
            {title}
          </StyledText.Bold>
          <StyledText.Bold
            fontSize={12}
            width={163}
            color="#4a4a4a"
            textAlign="center"
            containerProps={{
              paddingBottom: 20,
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0
            }}
          >
            {priceArr.newPrice}
          </StyledText.Bold>
        </View>
      </TouchableOpacity>
    )}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapperTitle: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  iconWrap: {
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  imgWrapper: {
    width: 163,
    height: 163,
    borderRadius: 8,
    // borderColor: "#ddd",
    borderWidth: 0,
    shadowColor: "#4a4a4a",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  }
});

export default ShopScreen;
