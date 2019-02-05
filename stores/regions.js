import { observable, computed, action, toJS } from "mobx";
import api from "../services/api";
import { entitiesFromFB } from "./utils";

import BasicStore from "./BasicStore";

class RegionsStore extends BasicStore {
  @observable loading = false;
  @observable loaded = false;

  @observable entities = {};
  @observable regions = {};
  @observable filterArticles = "";

  @action regionArticles(filterArticles) {
    return Object.values(toJS(this.entities)).filter(
      ({ region }) => region === filterArticles
    );
  }

  @computed get listEntries() {
    return Object.values(toJS(this.entities));
  }

  @computed get listRegions() {
    return Object.entries(this.regions).map(([name, mainBg]) => ({
      name,
      mainBg
    }));
  }

  @action set(name, data) {
    this[name] = data;
  }

  @action
  async getArticle(refName) {
    this.set("loading", true);
    const data = await api.fetchAllByEntityName(refName);
    this.set("entities", data);
    this.set("loading", false);
  }

  @action
  async getRegions(value) {
    await this.getArticle(value);
    const listRegions = this.listEntries;
    let data = listRegions.reduce(
      (prev, { region, mainBg }) => ({ ...prev, [region]: mainBg }),
      {}
    );
    return this.set("regions", data);
  }
}

export default RegionsStore;
