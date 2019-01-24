import React, { Component } from "react";
import { Text, View, StyleSheet, WebView, Dimensions } from "react-native";
import { Constants } from "expo";
import Loading from "./Loading";
const { width } = Dimensions.get("window");

export default class Video extends Component {
  state = { loading: false };
  onNavigationStateChange = navState => {
    if (!navState.title) {
      this.setState({ loading: true });
    } else {
      this.setState({ loading: false });
    }
  };

  render() {
    const { src, ...props } = this.props;
    const { loading } = this.state;
    return (
      <View style={[styles.wrapper, { ...props }]}>
        {loading && (
          <Loading
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            zIndex={2}
          />
        )}
        <WebView
          onNavigationStateChange={this.onNavigationStateChange}
          style={[styles.webView]}
          javaScriptEnabled={true}
          source={{
            uri: src
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 20,
    height: width * 0.6,
    width
  },
  webView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  }
});
