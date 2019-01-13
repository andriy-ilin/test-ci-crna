import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export class MenuScreen extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        <Text>MenuScreen</Text>
        <Text>Main</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("about")}
        >
          <Text>about</Text>
        </TouchableOpacity>
        <Text>MenuScreen</Text>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default MenuScreen;
