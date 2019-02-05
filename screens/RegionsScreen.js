import React, { Component } from "react";
import { observer, inject } from "mobx-react/native";
import { withNamespaces } from "react-i18next";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";

import Title from "../components/Title";
import Foto from "../components/Foto";
import StyledText from "../components/StyledText";
import Filter from "../icons/Filter";
import FindBlack from "../icons/FindBlack";
import Loading from "../components/Loading";

@withNamespaces(["regions"], { wait: true })
@inject("regions")
@observer
export class RegionsScreen extends Component {
  state = {
    openTab: "regions",
    filterTab: null
  };

  async componentDidMount() {
    const { regions, lng } = this.props;
    await regions.getRegions(`/catalog/${lng}`);
  }

  async componentDidUpdate({ lng }) {
    const { lng: nextLng } = this.props;
    if (lng !== nextLng) {
      const { regions } = this.props;
      await regions.getRegions(`/catalog/${nextLng}`);
    }
  }

  render() {
    const {
      t,
      regions,
      navigation: { navigate }
    } = this.props;
    const { openTab } = this.state;

    return (
      <View style={[styles.wrapper]}>
        <View style={[styles.tabWrapper]}>
          <TouchableOpacity
            onPress={() => this.setState({ openTab: "regions" })}
          >
            <Title color={openTab !== "regions" ? "#d8d8d8" : undefined}>
              {t("Regions")}
            </Title>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ openTab: "all" })}>
            <Title color={openTab !== "all" ? "#d8d8d8" : undefined}>
              {t("All stories")}
            </Title>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={[styles.filterIconWrapper]}>
            <TouchableOpacity
              onPress={() => this.setState({ filterTab: "filter" })}
            >
              <View style={{ paddingRight: 20 }}>
                <Filter />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ filterTab: "find" })}
            >
              <FindBlack />
            </TouchableOpacity>
          </View>

          <View style={[openTab !== "regions" && { display: "none" }]}>
            <RegionsContainer
              list={regions.listRegions}
              onPress={region => navigate("regionArticles", { region })}
            />
          </View>

          <View style={[openTab === "regions" && { display: "none" }]}>
            <AllStoriesContainer
              list={regions.listEntries}
              onPress={id => {
                navigate("regionArticleId", { id });
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const RegionsContainer = ({ list = [], onPress = () => {} }) => (
  <FlatList
    data={list}
    keyExtractor={({ name }) => name}
    renderItem={({ item: { name, mainBg } }) => (
      <TouchableOpacity key={name} onPress={() => onPress(name)}>
        <View key={name} style={[styles.cardRegions]}>
          <Foto
            top={0}
            left={0}
            right={0}
            bottom={0}
            position="absolute"
            borderRadius={6}
            src={mainBg}
          />
          <StyledText.Bold
            color="#fff"
            fontSize={20}
            textTransform="capitalize"
          >
            {name}
          </StyledText.Bold>
        </View>
      </TouchableOpacity>
    )}
  />
);

export const AllStoriesContainer = ({ list = [], onPress = () => {} }) => (
  <FlatList
    data={list}
    keyExtractor={({ id }) => id}
    renderItem={({ item: { mainTitle, mainBg, id } }) => (
      <TouchableOpacity key={mainTitle} onPress={() => onPress(id)}>
        <View style={[styles.cardAllStories]}>
          <Foto
            top={0}
            left={0}
            right={0}
            bottom={0}
            position="absolute"
            borderRadius={6}
            src={mainBg}
          />
          <StyledText.Bold
            color="#fff"
            fontSize={20}
            textTransform="capitalize"
          >
            {mainTitle}
          </StyledText.Bold>
        </View>
      </TouchableOpacity>
    )}
  />
);

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  tabWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 20
  },
  filterIconWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 20
  },
  cardRegions: {
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    height: 200,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 6,
    borderColor: "#ddd",
    borderWidth: 0,
    shadowColor: "#4a4a4a",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  cardAllStories: {
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    height: 160,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 6,
    borderColor: "#ddd",
    borderWidth: 0,
    shadowColor: "#4a4a4a",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  }
});

export default RegionsScreen;
