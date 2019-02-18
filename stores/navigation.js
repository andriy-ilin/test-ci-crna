import { autorun } from "mobx";
import { AsyncStorage } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import { registerForPushNotificationsAsync } from "../helpers/pushNotification";

import BasicStore from "./BasicStore";

class NavigationStore extends BasicStore {
  ref = null;

  initStore() {
    let firstRun = true;

    setTimeout(() => {
      autorun(async () => {
        const user = null;
        const screen = user ? "home" : "article";
        await registerForPushNotificationsAsync();
        await this.allStores.lang.setCurrentLangFromStorage();
        if (!firstRun) {
          this.goTo(screen);
        }

        firstRun = false;
      });
    });
  }

  setNavRef = ref => {
    this.ref = ref;
    this.initStore();
  };

  goTo = (routeName, params) =>
    this.ref.dispatch(
      NavigationActions.navigate({
        routeName,
        params
      })
    );

  goBack = () => this.ref.dispatch(NavigationActions.back());

  reset = routeName =>
    this.ref.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName })]
      })
    );
}

export default NavigationStore;
