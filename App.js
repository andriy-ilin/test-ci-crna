import React from "react";
import { Platform, StatusBar, StyleSheet, View, Text } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import { Provider, observer } from "mobx-react/native";
import { configure } from "mobx";
import { I18nextProvider } from "react-i18next";
import i18n from "./services/i18n";

import AppNavigator from "./navigation/AppNavigator";
import stores from "./stores";

configure({
  enforceActions: "always"
});

@observer
class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <I18nextProvider i18n={i18n}>
          <Provider {...stores} style={styles.container}>
            <AppNavigator ref={stores.navigation.setNavRef} />
          </Provider>
        </I18nextProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/cart.png"),
        require("./assets/images/logoBlack.png"),
        require("./assets/images/logoGradient.png"),
        require("./assets/images/menuIcon.png"),
        require("./assets/images/downArrow.png"),
        require("./assets/images/rightArrow.png"),
        require("./assets/images/leftArrow.png"),
        require("./assets/images/favoriteFull.png"),
        require("./assets/images/favoriteEmpty.png"),
        require("./assets/images/markerMap.png"),
        require("./assets/images/close.png"),
        require("./assets/images/selected.png"),
        require("./assets/images/about/first.png"),
        require("./assets/images/about/second.png"),
        require("./assets/images/about/quote.png"),
        require("./assets/images/about/bogdan.png"),
        require("./assets/images/about/dmytro.png"),
        require("./assets/images/about/iryna.png"),
        require("./assets/images/about/maria.png"),
        require("./assets/images/about/marichka.png"),
        require("./assets/images/about/mykola.png"),
        require("./assets/images/about/natalka.png"),
        require("./assets/images/about/olha.png"),
        require("./assets/images/about/pavlo.png"),
        require("./assets/images/about/sergey.png"),
        require("./assets/images/about/taras.png"),
        require("./assets/images/about/traian.png"),
        require("./assets/images/contacts/facebook.png"),
        require("./assets/images/contacts/google.png"),
        require("./assets/images/contacts/instagram.png"),
        require("./assets/images/contacts/telegram.png"),
        require("./assets/images/contacts/twitter.png"),
        require("./assets/images/contacts/youtube.png"),
        require("./assets/images/partners/fest.png"),
        require("./assets/images/partners/fujifilm.png"),
        require("./assets/images/partners/landRover.png"),
        require("./assets/images/partners/yedynka.png"),
        require("./assets/images/tabBar/homeActive.png"),
        require("./assets/images/tabBar/homeInactive.png"),
        require("./assets/images/tabBar/donateActive.png"),
        require("./assets/images/tabBar/donateInactive.png"),
        require("./assets/images/tabBar/shopActive.png"),
        require("./assets/images/tabBar/shopInactive.png"),
        require("./assets/images/tabBar/favoriteActive.png"),
        require("./assets/images/tabBar/favoriteInactive.png"),
        require("./assets/images/tabBar/regionsActive.png"),
        require("./assets/images/tabBar/regionsInactive.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default App;
