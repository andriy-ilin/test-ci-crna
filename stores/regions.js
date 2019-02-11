import { observable, computed, action, toJS } from "mobx";
import api from "../services/api";
import { entitiesFromFB } from "./utils";

import BasicStore from "./BasicStore";

class RegionsStore extends BasicStore {
  @observable loading = false;
  @observable loaded = false;

  @observable entities = {};
  @observable regions = {};
  @observable entriesRegionsListName = {};
  @observable filterArticles = "";
  @observable selectedRegions = [];
  @observable findArticles = "";

  @action
  addToSelectedRegions(value) {
    if (this.selectedRegionsList.includes(value)) {
      return this.set(
        "selectedRegions",
        this.selectedRegionsList.filter(item => item !== value)
      );
    }
    return this.set("selectedRegions", [...this.selectedRegionsList, value]);
  }

  @action
  addFindArticles(value) {
    return this.set("findArticles", value);
  }

  @computed get selectedRegionsList() {
    return toJS(this.selectedRegions);
  }
  @computed get findArticlesList() {
    return toJS(this.findArticles);
  }

  @action clearSelectedRegionsList() {
    return this.set("selectedRegions", []);
  }
  @action clearFindArticlesList() {
    return this.set("findArticles", "");
  }

  @action regionArticles(filterArticles) {
    return Object.values(toJS(this.entities)).filter(
      ({ region }) => region === filterArticles
    );
  }
  @computed get regionsListName() {
    return [...toJS(this.entriesRegionsListName)];
  }

  @computed get listEntries() {
    return Object.values(toJS(this.entities));
  }

  @computed get listWithFilterAndFind() {
    return Object.values(toJS(this.entities)).filter(
      ({ region, mainTitle }) => {
        return this.selectedRegionsList.length > 0
          ? this.findArticlesList
            ? this.selectedRegionsList.includes(region) &&
              mainTitle.includes(this.findArticlesList)
            : this.selectedRegionsList.includes(region)
          : !!this.findArticlesList
          ? mainTitle.includes(this.findArticlesList)
          : true;
      }
    );
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
  @action
  async getRegionsName() {
    const data = await api.fetchAllByEntityName("/regions");
    this.set("entriesRegionsListName", data);
  }
}

export default RegionsStore;
