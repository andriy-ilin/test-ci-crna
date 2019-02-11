import React, { Component } from "react";
import { observer, inject } from "mobx-react/native";
import { withNamespaces } from "react-i18next";
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions
} from "react-native";

import Title from "../components/Title";
import StyledText from "../components/StyledText";
import Video from "../components/Video";
import Loading from "../components/Loading";
import Button from "../components/Button";
import Line from "../components/Line";
import Filter from "../icons/Filter";
import FindBlack from "../icons/FindBlack";
import SelectedIcon from "../icons/SelectedIcon";
import CloseIcon from "../icons/CloseIcon";
import PlaceholderSearchIcon from "../icons/PlaceholderSearchIcon";

const { width } = Dimensions.get("window");

@withNamespaces(["video"], { wait: true })
@inject("video")
@observer
export class VideoScreen extends Component {
  state = {
    countVideo: 5,
    stepVideo: 5,
    countVlog: 5,
    stepVlog: 5,
    openTab: "video",
    filterTab: null
  };

  async componentDidMount() {
    const { video, lng } = this.props;
    await video.getVideoRegions(`/video/${lng}`);
  }

  async componentDidUpdate({ lng }) {
    const { lng: nextLng } = this.props;
    if (lng !== nextLng) {
      const { video } = this.props;
      await video.getVideoRegions(`/video/${nextLng}`);
    }
  }

  render() {
    const {
      t,
      video: { loading = true, list = [] } = {},
      video,
      lng
    } = this.props;
    const {
      openTab,
      filterTab,
      countVideo,
      stepVideo,
      countVlog,
      stepVlog
    } = this.state;
    if (loading) return <Loading />;
    return (
      <View style={[styles.container]}>
        <View style={[styles.tabWrapper]}>
          <TouchableOpacity
            onPress={() => this.setState({ openTab: "video", filterTab: null })}
          >
            <Title color={openTab !== "video" ? "#d8d8d8" : undefined}>
              {t("Video")}
            </Title>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ openTab: "vlog", filterTab: null })}
          >
            <Title color={openTab !== "vlog" ? "#d8d8d8" : undefined}>
              {t("Vlog")}
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
            {(video.selectedRegionsList.length > 0 ||
              !!video.findArticlesList) && (
              <TouchableOpacity
                onPress={() => {
                  video.clearSelectedRegionsList();
                  video.clearFindArticlesList();
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
          {!filterTab && openTab === "video" && (
            <View style={[openTab !== "video" && { display: "none" }]}>
              <View style={[styles.listWrapper]}>
                <FlatList
                  data={video.listWithFilterAndFind.slice(0, countVideo)}
                  keyExtractor={({ id }) => id}
                  renderItem={({ item: { videoSrc } }) => (
                    <Video src={videoSrc} width={width - 40} />
                  )}
                />
              </View>
              {countVideo < video.listWithFilterAndFind.length && (
                <Button
                  onPress={() =>
                    this.setState({
                      countVideo: countVideo + stepVideo
                    })
                  }
                >
                  Load more
                </Button>
              )}
            </View>
          )}
          {!filterTab && openTab === "vlog" && (
            <View style={[openTab === "video" && { display: "none" }]}>
              <View style={[styles.listWrapper]}>
                <FlatList
                  data={video.listWithFilterAndFind.slice(0, countVlog)}
                  keyExtractor={({ id }) => id}
                  renderItem={({ item: { vlogSrc } }) =>
                    vlogSrc && <Video src={vlogSrc} width={width - 40} />
                  }
                />
              </View>
              {countVlog < video.listWithFilterAndFind.length && (
                <Button
                  onPress={() =>
                    this.setState({
                      countVlog: countVlog + stepVlog
                    })
                  }
                >
                  Load more
                </Button>
              )}
            </View>
          )}

          {filterTab === "filter" && (
            <FilterView
              regions={video.listRegions || video.regionsListName}
              lang={lng}
              onPress={name => video.addToSelectedRegions(name)}
              selectedRegions={video.selectedRegionsList}
              onFilter={() => this.setState({ filterTab: null })}
            />
          )}
          {filterTab === "find" && (
            <FindView
              value={video.findArticlesList}
              onFind={value => {
                video.addFindArticles(value);
                return this.setState({ filterTab: null });
              }}
            />
          )}
        </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 20
  },
  listWrapper: {
    paddingLeft: 20,
    paddingRight: 20
  },
  filterIconWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 20
  },
  filterModeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  closeFilterModalWrapper: {
    flexDirection: "row",
    alignItems: "center"
  }
});
export default VideoScreen;
