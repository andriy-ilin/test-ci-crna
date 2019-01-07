import { autorun } from "mobx";
import { NavigationActions, StackActions } from "react-navigation";

import BasicStore from "./BasicStore";

class NavigationStore extends BasicStore {
  ref = null;

  initStore() {
    let firstRun = true;

    setTimeout(() => {
      autorun(() => {
        const user = null;
        const screen = user ? "home" : "article";

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
