import React, { Component } from "react";
import { observer, inject } from "mobx-react/native";
import { withNamespaces } from "react-i18next";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput
} from "react-native";

import Title from "../components/Title";
import Foto from "../components/Foto";
import Line from "../components/Line";
import Button from "../components/Button";
import StyledText from "../components/StyledText";
import Filter from "../icons/Filter";
import FindBlack from "../icons/FindBlack";
import MarkerMap from "../icons/MarkerMap";
import CloseIcon from "../icons/CloseIcon";
import SelectedIcon from "../icons/SelectedIcon";
import PlaceholderSearchIcon from "../icons/PlaceholderSearchIcon";
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
    await regions.getRegionsName();
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
      navigation: { navigate },
      lng
    } = this.props;
    const { openTab, filterTab } = this.state;

    return (
      <View style={[styles.wrapper]}>
        <View style={[styles.tabWrapper]}>
          <TouchableOpacity
            onPress={() =>
              this.setState({ openTab: "regions", filterTab: null })
            }
          >
            <Title color={openTab !== "regions" ? "#d8d8d8" : undefined}>
              {t("Regions")}
            </Title>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ openTab: "all", filterTab: null })}
          >
            <Title color={openTab !== "all" ? "#d8d8d8" : undefined}>
              {t("All stories")}
            </Title>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={[styles.filterModeHeader]}>
            <View style={[styles.filterIconWrapper]}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    filterTab: filterTab
                      ? filterTab !== "find"
                        ? null
                        : "filter"
                      : "filter"
                  })
                }
              >
                <View style={{ paddingRight: 20 }}>
                  <Filter />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    filterTab: filterTab
                      ? filterTab !== "filter"
                        ? null
                        : "find"
                      : "find"
                  })
                }
              >
                <FindBlack />
              </TouchableOpacity>
            </View>
            {(regions.selectedRegionsList.length > 0 ||
              !!regions.findArticlesList) && (
              <TouchableOpacity
                onPress={() => {
                  regions.clearSelectedRegionsList();
                  regions.clearFindArticlesList();
                  this.setState({ filterTab: null });
                }}
              >
                <View style={[styles.closeFilterModalWrapper]}>
                  <CloseIcon width={12} height={11} />
                  <StyledText.Medium
                    fontSize={12}
                    lineHeight={12}
                    containerProps={{ paddingBottom: 0, paddingLeft: 5 }}
                  >
                    clear filter
                  </StyledText.Medium>
                </View>
              </TouchableOpacity>
            )}
          </View>

          <View style={[filterTab && { display: "none" }]}>
            <View style={[openTab !== "regions" && { display: "none" }]}>
              <RegionsContainer
                list={regions.listRegions}
                onPress={region => navigate("regionArticles", { region })}
              />
            </View>

            <View style={[openTab === "regions" && { display: "none" }]}>
              <AllStoriesContainer
                list={regions.listWithFilterAndFind}
                onPress={id => {
                  navigate("regionArticleId", { id });
                }}
              />
            </View>
          </View>
          {filterTab === "filter" && (
            <FilterView
              regions={regions.listRegions || regions.regionsListName}
              lang={lng}
              onPress={name => regions.addToSelectedRegions(name)}
              selectedRegions={regions.selectedRegionsList}
              onFilter={() =>
                this.setState({ filterTab: null, openTab: "all" })
              }
            />
          )}
          {filterTab === "find" && (
            <FindView
              value={regions.findArticlesList}
              onFind={value => {
                regions.addFindArticles(value);
                return this.setState({ filterTab: null, openTab: "all" });
              }}
            />
          )}
        </ScrollView>
        {!filterTab && (
          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => this.props.navigation.navigate("map")}
          >
            <MarkerMap />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const FilterView = ({
  regions,
  lang,
  onPress = () => {},
  selectedRegions = [],
  onFilter = () => {}
}) => (
  <View style={[stylesFilterView.wrapper]}>
    <View style={{ paddingLeft: 20, paddingBottom: 20 }}>
      <Line />
    </View>
    <StyledText.Bold
      containerProps={{
        paddingBottom: 10,
        paddingLeft: 25
      }}
    >
      Regions
    </StyledText.Bold>
    {regions.map(({ name }) => (
      <TouchableOpacity key={name} onPress={() => onPress(name)}>
        <View key={name} style={[stylesFilterView.regionsFilterItem]}>
          <View style={[stylesFilterView.selectRow]}>
            <StyledText.Medium
              fontSize={14}
              textTransform="capitalize"
              containerProps={{
                paddingBottom: 10,
                paddingTop: 10,
                paddingLeft: 25
              }}
            >
              {name}
            </StyledText.Medium>

            {selectedRegions.includes(name) && <SelectedIcon />}
          </View>
          <Line backgroundColor="#eee" />
        </View>
      </TouchableOpacity>
    ))}
    <View style={{ paddingTop: 20, paddingBottom: 20 }}>
      <Button onPress={() => onFilter()}>Apply filter</Button>
    </View>
  </View>
);

const stylesFilterView = StyleSheet.create({
  wrapper: {},
  regionsFilterItem: {},
  selectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20
  }
});

class FindView extends Component {
  state = {};

  render() {
    const { value, onFind } = this.props;
    return (
      <View style={[stylesFilterView.wrapper]}>
        <View style={{ paddingLeft: 20, paddingBottom: 20 }}>
          <Line />
        </View>
        <StyledText.Bold
          containerProps={{
            paddingBottom: 10,
            paddingLeft: 25
          }}
        >
          Search
        </StyledText.Bold>
        <View>
          <View
            style={{
              position: "absolute",
              left: 42,
              top: 13
            }}
          >
            <PlaceholderSearchIcon />
          </View>
          <TextInput
            style={[stylesFindView.input]}
            onChangeText={find => this.setState({ find })}
            defaultValue={value}
            value={this.state.find}
            underlineColorAndroid="transparent"
            placeholder={"Start typing ..."}
          />
        </View>
        <View style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Button onPress={() => onFind(this.state.find)}>Find articles</Button>
        </View>
      </View>
    );
  }
}

const stylesFindView = StyleSheet.create({
  wrapper: {},
  input: {
    height: 40,
    borderColor: "#cdd3de",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 38,
    marginLeft: 25,
    marginRight: 25
  }
});

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
  },
  mapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(119, 217, 160, .9)",
    position: "absolute",
    bottom: 50,
    right: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  filterModeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  filterIconWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 20
  },
  closeFilterModalWrapper: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default RegionsScreen;
