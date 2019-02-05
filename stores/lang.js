import { observable, computed, action, toJS } from "mobx";
import { AsyncStorage } from "react-native";
import { Localization } from "expo-localization";
import i18n from "../services/i18n";

import api from "../services/api";
import { entitiesFromFB } from "./utils";

import BasicStore from "./BasicStore";

class LangStore extends BasicStore {
  @observable loading = false;
  @observable loaded = false;
  @observable currentLang = "";
  @observable entities = {};
  @observable translateList = [];

  @computed get list() {
    return Object.values(this.entities);
  }

  @computed get articlesTranslateList() {
    return Object.values(this.entities).map(({ key, value }) => ({
      key,
      value,
      link: this.translateList[key]
    }));
  }

  @action set(name, data) {
    this[name] = data;
  }

  @action setArticlesTranslateList(list) {
    this.set(
      "translateList",
      list.reduce((prev, { lang, href }) => ({ ...prev, [lang]: href }), {})
    );
    return list;
  }

  @action async detectLang() {
    const { locale } = await Localization.getLocalizationAsync();
    const lang = locale.includes("-") ? locale.split("-")[0] : locale;
    return lang;
  }

  @action async getCurrentLangFromStorage() {
    const value = await AsyncStorage.getItem("@ukrainer:lang");
    return value && JSON.parse(value);
  }

  @action
  async setCurrentLangFromStorage() {
    const lang =
      (await this.getCurrentLangFromStorage()) || (await this.detectLang());
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem("@ukrainer:lang", JSON.stringify(lang));
    this.set("currentLang", lang);
    return;
  }

  @action
  async changeCurrentLang(lang, { changeLanguage = () => {} }) {
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem("@ukrainer:lang", JSON.stringify(lang));
    this.set("currentLang", lang);
    return;
  }

  @action
  async getCatalog(lang, link) {
    const data = await api.fetchAllByEntityName(`/catalog/${lang}`);
    const [{ id }] = Object.values(data).filter(({ href }) => href === link);
    return id;
  }

  @action
  async getLang(refName, name = "entities") {
    this.set("loading", true);
    const data = await api.fetchAllByEntityName(refName);
    this.set(name, data);
    return this.set("loading", false);
  }
}

export default LangStore;
