import { observable, computed, action } from "mobx";
import i18n from "../services/i18n";

import BasicStore from "./BasicStore";

class LocalizationStore extends BasicStore {
  @observable loading = false;
  @observable loaded = false;
  @observable lang = null;

  @action getLocale() {
    return i18n.language;
  }

  @action
  async setLocale(name) {
    await i18n.changeLanguage(name);
    return this.set("lang", name);
  }

  @action set(name, data) {
    return (this[name] = data);
  }
  @action get(name) {
    return this[name];
  }
}

export default LocalizationStore;
