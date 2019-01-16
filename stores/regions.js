import { observable, computed, action } from "mobx";
import api from "../services/api";
import { entitiesFromFB } from "./utils";

import BasicStore from "./BasicStore";

class RegionsStore extends BasicStore {
  @observable loading = false;
  @observable loaded = false;

  @observable entities = {};
  @observable regions = {};

  @computed get listEntries() {
    return Object.values(this.entities);
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
    const data = await api.fetchAllByEntityName(refName);
    this.set("entities", data);
  }

  @action
  async getRegions() {
    await this.getArticle("/catalog/en");
    const listRegions = this.listEntries;
    let data = listRegions.reduce(
      (prev, { region, mainBg }) => ({ ...prev, [region]: mainBg }),
      {}
    );
    return this.set("regions", data);
  }
}

export default RegionsStore;
