import React, { Component } from "react";
import { View, Text, StyleSheet, Image as ImageDefault } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Loading from "./Loading";

class Foto extends Component {
  state = {
    loading: false
  };
  render() {
    const {
      resizeMode = "cover",
      preview = { uri },
      src,
      ...props
    } = this.props;
    const { loading } = this.state;
    return src ? (
      <BlurView tint="light" intensity={50} style={[{ ...props }]}>
        {loading && (
          <Loading position="absolute" top={0} bottom={0} left={0} right={0} />
        )}

        <ImageDefault
          style={{
            ...props
          }}
          onLoadStart={() => this.setState({ loading: true })}
          onLoadEnd={() => this.setState({ loading: false })}
          source={{
            uri: src,
            cache: "force-cache"
          }}
          resizeMode={resizeMode}
        />
      </BlurView>
    ) : (
      <LinearGradient
        colors={["#7db242", "#77d9a0"]}
        start={[0, 1]}
        end={[1, 1]}
        style={{
          opacity: 0.9,
          ...props
        }}
      />
    );
  }
}

export default Foto;

const uri =
  "data:image/png;base64,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";
